import type { GameLevelParameter, GameDifficulty } from '../types/game';


// image.png および GameParameter のパラメータに基づいた難易度データ一覧
export const GAME_LEVEL_PARAMETER_DATA: GameLevelParameter[] = [
  {
    level: 0,
    wasteSpeed: 1.0,
    itemInterval: 3.0,
    wasteLevel: 1,
    burstSpawnRate: 0.0,
  },
  {
    level: 1,
    wasteSpeed: 1.1,
    itemInterval: 3.0,
    wasteLevel: 1,
    burstSpawnRate: 0.1,
  },
  {
    level: 2,
    wasteSpeed: 1.2,
    itemInterval: 2.7,
    wasteLevel: 1,
    burstSpawnRate: 0.1,
  },
  {
    level: 3,
    wasteSpeed: 1.3,
    itemInterval: 2.5,
    wasteLevel: 1,
    burstSpawnRate: 0.1,
  },
  {
    level: 4,
    wasteSpeed: 1.4,
    itemInterval: 2.5,
    wasteLevel: 2,
    burstSpawnRate: 0.2,
  },
  {
    level: 5,
    wasteSpeed: 1.5,
    itemInterval: 2.2,
    wasteLevel: 2,
    burstSpawnRate: 0.2,
  },
  {
    level: 6,
    wasteSpeed: 1.6,
    itemInterval: 2.0,
    wasteLevel: 2,
    burstSpawnRate: 0.3,
  },
  {
    level: 7,
    wasteSpeed: 1.9,
    itemInterval: 2.0,
    wasteLevel: 3,
    burstSpawnRate: 0.3,
  },
  {
    level: 8,
    wasteSpeed: 2.0,
    itemInterval: 1.7,
    wasteLevel: 3,
    burstSpawnRate: 0.4,
  },
  {
    level: 9,
    wasteSpeed: 2.2,
    itemInterval: 1.5,
    wasteLevel: 3,
    burstSpawnRate: 0.4,
  },
];


export const GAME_DIFFICULTY_DATA: GameDifficulty[] = [
  {
    name: 'やさしい',
    difficulty: 'easy',
    timeLimit: 60,
    lifeLimit: Infinity,
    binCount: 4,
    levels: [0, 1, 2, 3],
  },
  {
    name: 'ふつう',
    difficulty: 'normal',
    timeLimit: 60,
    lifeLimit: 3,
    binCount: 6,
    levels: [3, 4, 5, 6],
  },
  {
    name: 'むずかしい',
    difficulty: 'hard',
    timeLimit: Infinity,
    lifeLimit: 3,
    binCount: 8,
    levels: [6, 7, 8, 9, 10],
  },
]