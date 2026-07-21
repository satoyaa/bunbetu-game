import type { WasteDef } from '../types/game';

// 流れてくるゴミの一覧と分解ルール。
// isSimple=false のものはタップで複数パーツに分解してから分別する。
// 行を追加・編集するだけでゴミの種類を増やせる。
export const Waste: WasteDef[] = [
  { //飲み残しあり，キャップ，ラベル付きペットボトル
    key: 'pet_label_cap_drink', //key
    label: 'ペットボトル', //ごみ名
    img: 'ここに挿入', //アイコン画像
    score: 50, //獲得点数
    isSimple: false, //分解できるか
    isWash: true, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    bin: "yet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: ['pet', 'label', 'cap'],
    feedBackId: 'forget_separate',
  },
  { //飲み残しあり，キャップ付きペットボトル
    key: 'pet_cap_drink', //key
    label: 'ペットボトル', //ごみ名
    img: 'ここに挿入', //アイコン画像
    score: 40, //獲得点数
    isSimple: false, //分解できるか
    isWash: true, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    bin: "yet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: ['pet', 'cap'],
    feedBackId: 'forget_separate',
  },
  { //飲み残しあり，ラベル付きペットボトル
    key: 'pet_label_drink', //key
    label: 'ペットボトル', //ごみ名
    img: 'ここに挿入', //アイコン画像
    score: 30, //獲得点数
    isSimple: false, //分解できるか
    isWash: true, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    bin: "yet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: ['pet', 'label'],
    feedBackId: 'forget_separate',
  },
  { //飲み残しあり，ペットボトル
    key: 'pet_drink', //key
    label: 'ペットボトル', //ごみ名
    img: 'ここに挿入', //アイコン画像
    score: 20, //獲得点数
    isSimple: false, //分解できるか
    isWash: true, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    bin: "yet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: ["pet"],
    feedBackId: 'must_flush',
  },
  { //ペットボトル
    key: 'pet', //key
    label: 'ボトル', //ごみ名
    img: 'ここに挿入', //アイコン画像
    score: 10, //獲得点数
    isSimple: true, //分解できるか
    isWash: true, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    bin: "pet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: [],
    feedBackId: 'simple_mistake',
  },
  { //キャップ
    key: 'cap', //key
    label: 'キャップ', //ごみ名
    img: 'ここに挿入', //アイコン画像
    score: 10, //獲得点数
    isSimple: true, //分解できるか
    isWash: false, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    bin: "recycle_plastic", //ごみ箱・分解可能ならそちらを優先して処理
    parts: [],
    feedBackId: 'simple_mistake',
  },
  { //ラベル
    key: 'label', //key
    label: 'ラベル', //ごみ名
    img: 'ここに挿入', //アイコン画像
    score: 10, //獲得点数
    isSimple: true, //分解できるか
    isWash: false, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    bin: "recycle_plastic", //ごみ箱・分解可能ならそちらを優先して処理
    parts: [],
    feedBackId: 'simple_mistake',
  },
  {
    key: 'can_juice',
    img: '🥫',
    score: 20,
    isSimple: true,
    parts: [],
    label: '空き缶',
    isWash: false,
    isBurn: false,
    bin: 'hunen',
    feedBackId: 'simple_mistake',
  },
];