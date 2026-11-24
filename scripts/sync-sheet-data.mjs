import { createSign } from 'node:crypto';
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const checkOnly = process.argv.includes('--check');
const serviceAccountText = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

if (!serviceAccountText || !spreadsheetId) {
  throw new Error('Set GOOGLE_SERVICE_ACCOUNT_JSON and GOOGLE_SHEETS_SPREADSHEET_ID before syncing.');
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountText);
} catch {
  throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.');
}

if (!serviceAccount.client_email || !serviceAccount.private_key) {
  throw new Error('The service account JSON must contain client_email and private_key.');
}

const BIN_IDS = new Set(['kanen', 'pet', 'recycle_plastic', 'other_plastic', 'hunen', 'sigen', 'yugai', 'oogata', 'yet']);
const FEEDBACK_IDS = new Set(['simple_mistake', 'forget_separate', 'burning', 'missed_Waste', 'must_wash', 'must_flush']);
const DIFFICULTIES = new Set(['easy', 'normal', 'hard']);

function base64url(value) {
  return Buffer.from(value).toString('base64url');
}

async function getAccessToken() {
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: issuedAt,
    exp: issuedAt + 3600,
  }));
  const unsignedToken = `${header}.${claims}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  const assertion = `${unsignedToken}.${signer.sign(serviceAccount.private_key, 'base64url')}`;
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) {
    throw new Error(`Google OAuth failed (${response.status}): ${payload.error_description ?? payload.error ?? 'unknown error'}`);
  }
  return payload.access_token;
}

async function getRows(accessToken, range, expectedHeaders) {
  const url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}`);
  url.searchParams.set('majorDimension', 'ROWS');
  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`Could not read ${range} (${response.status}): ${payload.error?.message ?? 'unknown error'}`);
  }

  const [headerRow = [], ...dataRows] = payload.values ?? [];
  const headers = headerRow.map((value) => String(value).trim());
  if (new Set(headers).size !== headers.length) {
    throw new Error(`${range}: duplicate column names are not allowed.`);
  }
  const missingHeaders = expectedHeaders.filter((header) => !headers.includes(header));
  const unexpectedHeaders = headers.filter((header) => !expectedHeaders.includes(header));
  if (missingHeaders.length || unexpectedHeaders.length) {
    throw new Error(`${range}: expected columns [${expectedHeaders.join(', ')}]; missing [${missingHeaders.join(', ')}]; unexpected [${unexpectedHeaders.join(', ')}].`);
  }

  return dataRows.flatMap((row, index) => {
    if (!row.some((value) => String(value).trim() !== '')) return [];
    return [{
      rowNumber: index + 2,
      cells: Object.fromEntries(headers.map((header, column) => [header, String(row[column] ?? '').trim()])),
    }];
  });
}

function fail(sheet, rowNumber, message) {
  throw new Error(`${sheet} row ${rowNumber}: ${message}`);
}

function requiredString(row, key, sheet) {
  const value = row.cells[key];
  if (!value) fail(sheet, row.rowNumber, `${key} is required.`);
  return value;
}

function optionalString(row, key) {
  return row.cells[key] || undefined;
}

function numberValue(row, key, sheet, { integer = false, min = -Infinity } = {}) {
  const raw = requiredString(row, key, sheet);
  const value = Number(raw);
  if (!Number.isFinite(value) || (integer && !Number.isInteger(value)) || value < min) {
    fail(sheet, row.rowNumber, `${key} must be ${integer ? 'an integer' : 'a number'} greater than or equal to ${min}.`);
  }
  return value;
}

function booleanValue(row, key, sheet) {
  const value = requiredString(row, key, sheet).toLowerCase();
  if (value === 'true') return true;
  if (value === 'false') return false;
  fail(sheet, row.rowNumber, `${key} must be TRUE or FALSE.`);
}

function splitList(value) {
  if (!value) return [];
  return value.split(',').map((entry) => entry.trim()).filter(Boolean);
}

async function validateWaste(rows) {
  const keys = new Set();
  const result = await Promise.all(rows.map(async (row) => {
    const item = {
      key: requiredString(row, 'key', 'waste'),
      label: requiredString(row, 'label', 'waste'),
      img: requiredString(row, 'img', 'waste'),
      score: numberValue(row, 'score', 'waste', { min: 0 }),
      isSimple: booleanValue(row, 'isSimple', 'waste'),
      isWash: booleanValue(row, 'isWash', 'waste'),
      isBurn: booleanValue(row, 'isBurn', 'waste'),
      isTrash: booleanValue(row, 'isTrash', 'waste'),
      bin: requiredString(row, 'bin', 'waste'),
      parts: splitList(row.cells.parts),
      wasteLevel: numberValue(row, 'wasteLevel', 'waste', { integer: true, min: 1 }),
    };
    const shortLabel = optionalString(row, 'shortLabel');
    const feedBackId = optionalString(row, 'feedBackId');
    const washTargetKey = optionalString(row, 'washTargetKey');
    if (shortLabel) item.shortLabel = shortLabel;
    if (feedBackId) item.feedBackId = feedBackId;
    if (washTargetKey) item.washTargetKey = washTargetKey;

    if (!/^[a-z0-9_]+$/.test(item.key)) fail('waste', row.rowNumber, 'key must use lowercase letters, numbers, and underscores.');
    if (keys.has(item.key)) fail('waste', row.rowNumber, `duplicate key '${item.key}'.`);
    keys.add(item.key);
    if (!BIN_IDS.has(item.bin)) fail('waste', row.rowNumber, `bin '${item.bin}' is not a supported bin ID.`);
    if (feedBackId && !FEEDBACK_IDS.has(feedBackId)) fail('waste', row.rowNumber, `feedBackId '${feedBackId}' is not supported.`);
    if (washTargetKey && !item.isWash) fail('waste', row.rowNumber, 'washTargetKey requires isWash=TRUE.');
    if (!/^images\/waste\/[^/\\]+\.(webp|png|jpe?g)$/i.test(item.img)) {
      fail('waste', row.rowNumber, 'img must point to an existing image under images/waste/.');
    }
    try {
      await access(path.join(projectRoot, 'src/assets', item.img));
    } catch {
      fail('waste', row.rowNumber, `image '${item.img}' does not exist in src/assets.`);
    }
    return item;
  }));

  if (!result.length) throw new Error('waste: at least one item is required.');
  for (const [index, item] of result.entries()) {
    const row = rows[index];
    for (const part of item.parts) {
      if (!keys.has(part) && !rows.some((candidate) => candidate.cells.key === part)) {
        fail('waste', row.rowNumber, `parts references missing waste key '${part}'.`);
      }
    }
    if (item.washTargetKey && !keys.has(item.washTargetKey) && !rows.some((candidate) => candidate.cells.key === item.washTargetKey)) {
      fail('waste', row.rowNumber, `washTargetKey references missing waste key '${item.washTargetKey}'.`);
    }
  }
  return result;
}

function validateFeedback(rows) {
  const specialFeedbackMessages = [];
  const feedbackTitles = [];
  const messageIds = new Set();
  const thresholds = new Set();

  for (const row of rows) {
    const type = requiredString(row, 'type', 'feedback');
    if (type === 'message') {
      const feedBackId = requiredString(row, 'feedBackId', 'feedback');
      if (!FEEDBACK_IDS.has(feedBackId) || feedBackId === 'simple_mistake') {
        fail('feedback', row.rowNumber, `feedBackId '${feedBackId}' cannot be used for a special message.`);
      }
      if (messageIds.has(feedBackId)) fail('feedback', row.rowNumber, `duplicate message for '${feedBackId}'.`);
      messageIds.add(feedBackId);
      specialFeedbackMessages.push({ feedBackId, message: requiredString(row, 'message', 'feedback') });
    } else if (type === 'title') {
      const feedTitleScoreThreshold = numberValue(row, 'feedTitleScoreThreshold', 'feedback', { min: 0 });
      if (thresholds.has(feedTitleScoreThreshold)) fail('feedback', row.rowNumber, `duplicate score threshold '${feedTitleScoreThreshold}'.`);
      thresholds.add(feedTitleScoreThreshold);
      feedbackTitles.push({ feedTitleScoreThreshold, feedTitle: requiredString(row, 'feedTitle', 'feedback') });
    } else {
      fail('feedback', row.rowNumber, `type '${type}' must be message or title.`);
    }
  }

  if (!specialFeedbackMessages.length) throw new Error('feedback: add at least one message row.');
  if (!feedbackTitles.length || !thresholds.has(0)) throw new Error('feedback: add title rows, including a threshold of 0.');
  feedbackTitles.sort((left, right) => left.feedTitleScoreThreshold - right.feedTitleScoreThreshold);
  return { specialFeedbackMessages, feedbackTitles };
}

function validateDifficulty(rows) {
  const gameLevelParameters = [];
  const gameDifficulties = [];
  const levelIds = new Set();
  const difficultyIds = new Set();

  for (const row of rows) {
    const type = requiredString(row, 'type', 'difficulty');
    if (type === 'level') {
      const item = {
        level: numberValue(row, 'level', 'difficulty', { integer: true, min: 0 }),
        wasteSpeed: numberValue(row, 'wasteSpeed', 'difficulty', { min: 0.01 }),
        itemInterval: numberValue(row, 'itemInterval', 'difficulty', { min: 0.01 }),
        wasteLevel: numberValue(row, 'wasteLevel', 'difficulty', { integer: true, min: 1 }),
        burstSpawnRate: numberValue(row, 'burstSpawnRate', 'difficulty', { min: 0 }),
      };
      if (levelIds.has(item.level)) fail('difficulty', row.rowNumber, `duplicate level '${item.level}'.`);
      if (item.burstSpawnRate > 1) fail('difficulty', row.rowNumber, 'burstSpawnRate must not exceed 1.');
      levelIds.add(item.level);
      gameLevelParameters.push(item);
    } else if (type === 'mode') {
      const difficulty = requiredString(row, 'difficulty', 'difficulty');
      if (!DIFFICULTIES.has(difficulty)) fail('difficulty', row.rowNumber, `difficulty '${difficulty}' must be easy, normal, or hard.`);
      if (difficultyIds.has(difficulty)) fail('difficulty', row.rowNumber, `duplicate mode '${difficulty}'.`);
      difficultyIds.add(difficulty);
      const timeLimitText = requiredString(row, 'timeLimit', 'difficulty');
      const timeLimit = timeLimitText.toLowerCase() === 'infinity' ? 'Infinity' : Number(timeLimitText);
      if (timeLimit !== 'Infinity' && (!Number.isFinite(timeLimit) || timeLimit <= 0)) {
        fail('difficulty', row.rowNumber, 'timeLimit must be a positive number or Infinity.');
      }
      const levels = splitList(requiredString(row, 'levels', 'difficulty')).map(Number);
      if (!levels.length || levels.some((level) => !Number.isInteger(level) || level < 0)) {
        fail('difficulty', row.rowNumber, 'levels must be a comma-separated list of non-negative integers.');
      }
      gameDifficulties.push({
        name: requiredString(row, 'name', 'difficulty'),
        difficulty,
        timeLimit,
        lifeLimit: numberValue(row, 'lifeLimit', 'difficulty', { integer: true, min: 1 }),
        binCount: numberValue(row, 'binCount', 'difficulty', { integer: true, min: 1 }),
        levels,
        levelUpIntervalMs: numberValue(row, 'levelUpIntervalMs', 'difficulty', { integer: true, min: 1 }),
      });
    } else {
      fail('difficulty', row.rowNumber, `type '${type}' must be level or mode.`);
    }
  }

  if (!gameLevelParameters.length) throw new Error('difficulty: add at least one level row.');
  if (difficultyIds.size !== DIFFICULTIES.size || [...DIFFICULTIES].some((id) => !difficultyIds.has(id))) {
    throw new Error('difficulty: add exactly one mode row for easy, normal, and hard.');
  }
  gameLevelParameters.sort((left, right) => left.level - right.level);
  for (const mode of gameDifficulties) {
    const missingLevel = mode.levels.find((level) => !levelIds.has(level));
    if (missingLevel !== undefined) throw new Error(`difficulty mode '${mode.difficulty}' references missing level '${missingLevel}'.`);
  }
  return { gameLevelParameters, gameDifficulties };
}

const wasteHeaders = ['key', 'label', 'shortLabel', 'img', 'score', 'isSimple', 'isWash', 'isBurn', 'isTrash', 'bin', 'parts', 'feedBackId', 'wasteLevel', 'washTargetKey'];
const feedbackHeaders = ['type', 'feedBackId', 'message', 'feedTitleScoreThreshold', 'feedTitle'];
const difficultyHeaders = ['type', 'level', 'wasteSpeed', 'itemInterval', 'wasteLevel', 'burstSpawnRate', 'name', 'difficulty', 'timeLimit', 'lifeLimit', 'binCount', 'levels', 'levelUpIntervalMs'];

const token = await getAccessToken();
const [wasteRows, feedbackRows, difficultyRows] = await Promise.all([
  getRows(token, 'waste!A:Z', wasteHeaders),
  getRows(token, 'feedback!A:Z', feedbackHeaders),
  getRows(token, 'difficulty!A:Z', difficultyHeaders),
]);

const [waste, feedback, difficulty] = await Promise.all([
  validateWaste(wasteRows),
  Promise.resolve(validateFeedback(feedbackRows)),
  Promise.resolve(validateDifficulty(difficultyRows)),
]);

if (!checkOnly) {
  const outputDirectory = path.join(projectRoot, 'src/data/sheets');
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    writeFile(path.join(outputDirectory, 'waste.json'), `${JSON.stringify(waste, null, 2)}\n`),
    writeFile(path.join(outputDirectory, 'feedback.json'), `${JSON.stringify(feedback, null, 2)}\n`),
    writeFile(path.join(outputDirectory, 'difficulty.json'), `${JSON.stringify(difficulty, null, 2)}\n`),
  ]);
}
console.log(`${checkOnly ? 'Connection and validation succeeded' : 'Validated and synchronized'}: ${waste.length} waste items, ${feedback.specialFeedbackMessages.length} feedback messages, ${feedback.feedbackTitles.length} titles, ${difficulty.gameLevelParameters.length} levels, and ${difficulty.gameDifficulties.length} modes.`);
