import sheetDifficulty from './sheets/difficulty.json';
import type { GameDifficulty, GameLevelParameter } from '../types/game';

export const GAME_LEVEL_PARAMETER_DATA: GameLevelParameter[] =
  sheetDifficulty.gameLevelParameters as unknown as GameLevelParameter[];

export const GAME_DIFFICULTY_DATA: GameDifficulty[] = sheetDifficulty.gameDifficulties.map((item) => ({
  ...item,
  timeLimit: item.timeLimit === 'Infinity' ? Number.POSITIVE_INFINITY : item.timeLimit,
})) as GameDifficulty[];
