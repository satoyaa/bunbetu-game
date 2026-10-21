import type { GameLevelParameter, GameDifficulty } from '../types/game';


// 難易度について
/*
やさしい: 制限時間60秒、ライフ5。レベル0～3で、ごみの種類は wasteLevel 1～2。
ふつう: 制限時間60秒、ライフ5。レベル3～6で、ごみの種類は wasteLevel 2～3。
むずかしい: ライフ3。レベル6～10で、ごみの種類は wasteLevel 3。
  timeLimit は Infinity だが、現在のゲーム処理では999秒に置き換えてカウントダウンする。
レベルはプレイ中、やさしい・ふつうでは10秒ごと、むずかしいでは30秒ごとに上がる。得点では変化しない。
*/

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
    wasteLevel: 2,
    burstSpawnRate: 0.1,
  },
  {
    level: 3,
    wasteSpeed: 1.3,
    itemInterval: 2.5,
    wasteLevel: 2,
    burstSpawnRate: 0.1,
  },
  {
    level: 4,
    wasteSpeed: 1.4,
    itemInterval: 2.3,
    wasteLevel: 3,
    burstSpawnRate: 0.2,
  },
  {
    level: 5,
    wasteSpeed: 1.5,
    itemInterval: 2.2,
    wasteLevel: 3,
    burstSpawnRate: 0.2,
  },
  {
    level: 6,
    wasteSpeed: 1.8,
    itemInterval: 1.8,
    wasteLevel: 3,
    burstSpawnRate: 0.3,
  },
  {
    level: 7,
    wasteSpeed: 1.8,
    itemInterval: 1.6,
    wasteLevel: 3,
    burstSpawnRate: 0.3,
  },
  {
    level: 8,
    wasteSpeed: 2.0,
    itemInterval: 1.6,
    wasteLevel: 3,
    burstSpawnRate: 0.4,
  },
  {
    level: 9,
    wasteSpeed: 2.5,
    itemInterval: 1.0,
    wasteLevel: 3,
    burstSpawnRate: 0.4,
  },
  {
    level: 10,
    wasteSpeed: 3.0,
    itemInterval: 0.8,
    wasteLevel: 3,
    burstSpawnRate: 0.4,
  },
];


export const GAME_DIFFICULTY_DATA: GameDifficulty[] = [
  {
    name: 'やさしい',
    difficulty: 'easy',
    timeLimit: 60,
    lifeLimit: 5,
    binCount: 8,
    levels: [0, 1, 2, 3],
    levelUpIntervalMs: 10000,
  },
  {
    name: 'ふつう',
    difficulty: 'normal',
    timeLimit: 60,
    lifeLimit: 5,
    binCount: 8,
    levels: [3, 4, 5, 6],
    levelUpIntervalMs: 10000,
  },
  {
    name: 'むずかしい',
    difficulty: 'hard',
    timeLimit: Infinity,
    lifeLimit: 3,
    binCount: 8,
    levels: [6, 7, 8, 9, 10],
    levelUpIntervalMs: 30000,
  },
]
