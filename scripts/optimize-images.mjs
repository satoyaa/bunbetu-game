import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inputRoot = path.join(projectRoot, 'raw_assets');
const outputRoot = path.join(projectRoot, 'src', 'assets');
const sourceExtensions = new Set(['.png', '.jpg', '.jpeg']);

async function collectImages(directory, relativeDirectory = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const images = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const relativePath = path.join(relativeDirectory, entry.name);

    // ごみ箱の JPEG は変換対象外。
    if (relativePath === path.join('images', 'bins') ||
        relativePath.startsWith(path.join('images', 'bins') + path.sep)) {
      continue;
    }

    if (entry.isDirectory()) {
      images.push(...await collectImages(path.join(directory, entry.name), relativePath));
    } else if (entry.isFile() && sourceExtensions.has(path.extname(entry.name).toLowerCase())) {
      images.push(relativePath);
    }
  }

  return images;
}

const images = await collectImages(inputRoot);
const outputNames = new Map();

// すべての名前を確認してから書き込み、PNG/JPEG の同名衝突を防ぐ。
for (const image of images) {
  const output = image.slice(0, -path.extname(image).length) + '.webp';
  const key = output.toLowerCase();
  if (outputNames.has(key)) {
    throw new Error(`WebP 出力名が衝突します: ${outputNames.get(key)} / ${image}`);
  }
  outputNames.set(key, image);
}

for (const image of images) {
  const output = image.slice(0, -path.extname(image).length) + '.webp';
  const outputPath = path.join(outputRoot, output);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(path.join(inputRoot, image)).webp({ quality: 80 }).toFile(outputPath);
  console.log(`${image} -> ${output}`);
}

console.log(`${images.length} 枚の WebP を生成しました。`);
