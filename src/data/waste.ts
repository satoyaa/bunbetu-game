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
    wasteLevel: 3,
  },
  { //飲み残しあり，キャップ付きペットボトル
    key: 'pet_cap_drink', //key
    label: 'ペットボトル', //ごみ名
    img: 'ごみデータ/ペットボトル_ラベル無.png', //アイコン画像
    score: 40, //獲得点数
    isSimple: false, //分解できるか
    isWash: true, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    bin: "yet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: ['pet', 'cap'],
    feedBackId: 'forget_separate',
    wasteLevel: 3,
  },
  { //飲み残しあり，ラベル付きペットボトル
    key: 'pet_label_drink', //key
    label: 'ペットボトル', //ごみ名
    img: 'ごみデータ/ペットボトル_キャップ無.png', //アイコン画像
    score: 30, //獲得点数
    isSimple: false, //分解できるか
    isWash: true, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    bin: "yet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: ['pet', 'label'],
    feedBackId: 'forget_separate',
    wasteLevel: 2,
  },
  { //飲み残しあり，ペットボトル
    key: 'pet_drink', //key
    label: 'ペットボトル', //ごみ名
    img: 'ごみデータ/ペットボトル_キャップ無_ラベル無.png', //アイコン画像
    score: 20, //獲得点数
    isSimple: false, //分解できるか
    isWash: true, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    bin: "yet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: ["pet"],
    feedBackId: 'must_flush',
    wasteLevel: 2,
  },
  { //ペットボトル
    key: 'pet', //key
    label: 'ボトル', //ごみ名
    img: 'ごみデータ/ペットボトル_ラベル無_キャップ無_飲み残し無.png', //アイコン画像
    score: 10, //獲得点数
    isSimple: true, //分解できるか
    isWash: true, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    bin: "pet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
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
    wasteLevel: 1,
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
    wasteLevel: 1,
  },
  {
    key: 'can_juice',
    img: 'ここに挿入',
    score: 20,
    isSimple: true,
    parts: [],
    label: '空き缶',
    isWash: false,
    isBurn: false,
    bin: 'sigen',
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // ぬいぐるみ（電子機器なし・30cm未満はその他プラ）
    key: 'nuigurumi',
    label: 'ぬいぐるみ',
    img: 'ごみデータ/ぬいぐるみ.png',
    score: 20,
    isSimple: true,
    isWash: false,
    isBurn: false,
    bin: 'other_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // ボールペン（プラスチック製文房具はその他プラ）
    key: 'ballpoint_pen',
    label: 'ボールペン',
    img: 'ごみデータ/ボールペン.png',
    score: 10,
    isSimple: true,
    isWash: false,
    isBurn: false,
    bin: 'other_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // モバイル充電器（リチウムイオン電池内蔵のため有害ごみ、発火の危険あり）
    key: 'mobile_battery',
    label: 'モバイル充電器',
    img: 'ごみデータ/モバイル充電器.png',
    score: 30,
    isSimple: true,
    isWash: false,
    isBurn: true,
    bin: 'yugai',
    parts: [],
    feedBackId: 'burning',
    wasteLevel: 3,
  },
  { // 卵のパック（パルプモールド・紙製容器は可燃ごみ）
    key: 'egg_carton_pulp',
    label: '卵のパック（パルプモールド）',
    img: 'ごみデータ/卵のパック（パルプモールド）.png',
    score: 20,
    isSimple: true,
    isWash: false,
    isBurn: false,
    bin: 'kanen',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // 歯ブラシ（手動のプラスチック製歯ブラシはその他プラ）
    key: 'toothbrush',
    label: '歯ブラシ',
    img: 'ごみデータ/歯ブラシ.png',
    score: 10,
    isSimple: true,
    isWash: false,
    isBurn: false,
    bin: 'other_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // 発泡スチロール（商品保護・緩衝材・容器包装はリサイクルプラ）
    key: 'styrofoam',
    label: '発泡スチロール',
    img: 'ごみデータ/発泡スチロール.png',
    score: 20,
    isSimple: true,
    isWash: false,
    isBurn: false,
    bin: 'recycle_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // 輪ゴム（ゴム製品はその他プラ）
    key: 'rubber_band',
    label: '輪ゴム',
    img: 'ごみデータ/輪ゴム.png',
    score: 10,
    isSimple: true,
    isWash: false,
    isBurn: false,
    bin: 'other_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // 靴（スニーカー・革靴などはその他プラ）
    key: 'shoes',
    label: '靴',
    img: 'ごみデータ/靴.png',
    score: 20,
    isSimple: true,
    isWash: false,
    isBurn: false,
    bin: 'other_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
];