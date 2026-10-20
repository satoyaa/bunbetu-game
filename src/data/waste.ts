import wasteImage0 from '../assets/images/waste/ペットボトル.webp';
import wasteImage1 from '../assets/images/waste/ペットボトル_ラベル無_キャップ無.webp';
import wasteImage2 from '../assets/images/waste/ペットボトル_ラベル無_キャップ無_飲み残し無.webp';
import wasteImage3 from '../assets/images/waste/キャップ.webp';
import wasteImage4 from '../assets/images/waste/ラベル.webp';
import wasteImage5 from '../assets/images/waste/ぬいぐるみ.webp';
import wasteImage6 from '../assets/images/waste/ボールペン.webp';
import wasteImage7 from '../assets/images/waste/モバイル充電器.webp';
import wasteImage8 from '../assets/images/waste/スマートフォン.webp';
import wasteImage9 from '../assets/images/waste/卵のパック（パルプモールド）.webp';
import wasteImage10 from '../assets/images/waste/歯ブラシ.webp';
import wasteImage11 from '../assets/images/waste/発泡スチロール.webp';
import wasteImage12 from '../assets/images/waste/輪ゴム.webp';
import wasteImage13 from '../assets/images/waste/靴.webp';
import wasteImage14 from '../assets/images/waste/えんぴつ.webp';
import wasteImage15 from '../assets/images/waste/割りばし.webp';
import wasteImage16 from '../assets/images/waste/草.webp';
import wasteImage17 from '../assets/images/waste/ヨーグルト（汚れあり）.webp';
import wasteImage18 from '../assets/images/waste/はがき.webp';
import wasteImage19 from '../assets/images/waste/ビール瓶(※)不適と思ったらラムネ瓶を採用してね.webp';
import wasteImage20 from '../assets/images/waste/ラムネ瓶(※).webp';
import wasteImage21 from '../assets/images/waste/しょうゆ.webp';
import wasteImage22 from '../assets/images/waste/みりん.webp';
import wasteImage23 from '../assets/images/waste/料理酒.webp';
import wasteImage24 from '../assets/images/waste/しょうゆ（汚れあり）.webp';
import wasteImage25 from '../assets/images/waste/みりん（汚れあり）.webp';
import wasteImage26 from '../assets/images/waste/料理酒（汚れあり）.webp';
import wasteImage27 from '../assets/images/waste/コンビニ弁当.webp';
import wasteImage28 from '../assets/images/waste/ヨーグルト.webp';
import wasteImage29 from '../assets/images/waste/ふとん.webp';
import wasteImage30 from '../assets/images/waste/学習机.webp';
import wasteImage31 from '../assets/images/waste/オーブンレンジ.webp';
import wasteImage32 from '../assets/images/waste/アイロン台リアル.webp';
import type { WasteDef } from '../types/game';

// 流れてくるゴミの一覧と分解ルール。
// isSimple=false のものはタップで複数パーツに分解してから分別する。
// 行を追加・編集するだけでゴミの種類を増やせる。
export const Waste: WasteDef[] = [
  { //飲み残しあり，キャップ，ラベル付きペットボトル
    key: 'pet_label_cap_drink', //key
    label: 'ペットボトル', //ごみ名
    img: wasteImage0, //アイコン画像
    score: 50, //獲得点数
    isSimple: false, //分解できるか
    isWash: false, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    isTrash: true,
    bin: "yet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: ['pet_drink', 'label', 'cap'],
    feedBackId: 'forget_separate',
    wasteLevel: 1,
  },
  { //飲み残しあり，ペットボトル
    key: 'pet_drink', //key
    label: 'ペットボトル', //ごみ名
    img: wasteImage1, //アイコン画像
    score: 20, //獲得点数
    isSimple: true, //分解できるか
    isWash: true, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    isTrash: true,
    bin: "yet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: ["pet"],
    feedBackId: 'must_flush',
    wasteLevel: 1,
    washTargetKey: 'pet',
  },
  { //ペットボトル
    key: 'pet', //key
    label: 'ボトル', //ごみ名
    img: wasteImage2, //アイコン画像
    score: 10, //獲得点数
    isSimple: true, //分解できるか
    isWash: false, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    isTrash: true,
    bin: "pet", //ごみ箱・分解可能ならそちらを優先して処理
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { //キャップ
    key: 'cap', //key
    label: 'キャップ', //ごみ名
    img: wasteImage3, //アイコン画像
    score: 10, //獲得点数
    isSimple: true, //分解できるか
    isWash: false, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    isTrash: true,
    bin: "recycle_plastic", //ごみ箱・分解可能ならそちらを優先して処理
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { //ラベル
    key: 'label', //key
    label: 'ラベル', //ごみ名
    img: wasteImage4, //アイコン画像
    score: 10, //獲得点数
    isSimple: true, //分解できるか
    isWash: false, //洗える・流せるか
    isBurn: false, //発火の危険性があるか
    isTrash: true,
    bin: "recycle_plastic", //ごみ箱・分解可能ならそちらを優先して処理
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // ぬいぐるみ（電子機器なし・30cm未満はその他プラ）
    key: 'nuigurumi',
    label: 'ぬいぐるみ(電子機器無し)',
    img: wasteImage5,
    score: 20,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'other_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // ボールペン（プラスチック製文房具はその他プラ）
    key: 'ballpoint_pen',
    label: 'ボールペン',
    img: wasteImage6,
    score: 10,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'other_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // モバイル充電器（リチウムイオン電池内蔵のため購入店へ持参、発火の危険あり）
    key: 'mobile_battery',
    label: 'モバイル充電器',
    img: wasteImage7,
    score: 30,
    isSimple: true,
    isWash: false,
    isBurn: true,
    isTrash: false,
    bin: 'yet',
    parts: [],
    feedBackId: 'burning',
    wasteLevel: 3,
  },
  { // スマートフォン（リチウムイオン電池内蔵のため購入店へ持参、発火の危険あり）
    key: 'smartphone',
    label: 'スマートフォン',
    img: wasteImage8,
    score: 30,
    isSimple: true,
    isWash: false,
    isBurn: true,
    isTrash: false,
    bin: 'yet',
    parts: [],
    feedBackId: 'burning',
    wasteLevel: 1,
  },
  { // 卵のパック（パルプモールド・紙製容器は可燃ごみ）
    key: 'egg_carton_pulp',
    label: '卵のパック（パルプモールド）',
    img: wasteImage9,
    score: 20,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'kanen',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 2,
  },
  { // 歯ブラシ（手動のプラスチック製歯ブラシはその他プラ）
    key: 'toothbrush',
    label: '歯ブラシ',
    img: wasteImage10,
    score: 10,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'other_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // 発泡スチロール（商品保護・緩衝材・容器包装はリサイクルプラ）
    key: 'styrofoam',
    label: '発泡スチロール',
    img: wasteImage11,
    score: 20,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'recycle_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // 輪ゴム（ゴム製品はその他プラ）
    key: 'rubber_band',
    label: '輪ゴム',
    img: wasteImage12,
    score: 10,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'other_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 2,
  },
  { // 靴（スニーカー・革靴などはその他プラ）
    key: 'shoes',
    label: '靴（運動靴・革靴・スリッパ・サンダル等）',
    img: wasteImage13,
    score: 20,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'other_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 2,
  },
  // ─── 可燃ごみ（燃やすごみ） ──────────────────────────────────
  { // えんぴつ（木製・文房具は可燃ごみ）
    key: 'pencil',
    label: '鉛筆',
    img: wasteImage14,
    score: 10,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'kanen',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // 割りばし（木製品は可燃ごみ）
    key: 'disposable_chopsticks',
    label: '割り箸',
    img: wasteImage15,
    score: 10,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'kanen',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // 草（植物・刈り草は可燃ごみ）
    key: 'grass',
    label: '草(花殻)',
    img: wasteImage16,
    score: 10,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'kanen',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 2,
  },
  { // ヨーグルト容器（汚れあり・水洗いでリサイクルプラへ）
    key: 'yogurt_dirty',
    label: 'ヨーグルトのカップ プラスチック製（汚れあり）',
    img: wasteImage17,
    score: 15,
    isSimple: true,
    isWash: true,
    isBurn: false,
    isTrash: true,
    bin: 'yet',
    parts: [],
    feedBackId: 'must_wash',
    wasteLevel: 2,
    washTargetKey: 'yogurt_clean',
  },
  // ─── 資源ごみ（紙類・空きびん） ──────────────────────────────
  { // はがき（紙類・雑がみは資源ごみ）
    key: 'postcard',
    label: 'はがき',
    img: wasteImage18,
    score: 10,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'sigen',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // ビール瓶（飲料用ガラス瓶は資源ごみ）
    key: 'beer_bottle',
    label: 'ビールびん',
    img: wasteImage19,
    score: 15,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'sigen',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 2,
  },
  { // ラムネ瓶（飲料用ガラス瓶は資源ごみ）
    key: 'ramune_bottle',
    label: 'びん(ガラス) 薬・飲料・食料品等用',
    img: wasteImage20,
    score: 15,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'sigen',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // しょうゆの容器（調味料ガラス瓶・洗浄済は資源ごみ）
    key: 'soy_sauce_bottle',
    label: 'しょうゆの容器 ペットボトル（洗浄済）',
    img: wasteImage21,
    score: 15,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'pet',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // みりん瓶（調味料ガラス瓶・洗浄済は資源ごみ）
    key: 'mirin_bottle',
    label: 'みりんの容器 ペットボトル（洗浄済）',
    img: wasteImage22,
    score: 15,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'pet',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 2,
  },
  { // 料理酒瓶（調味料ガラス瓶・洗浄済は資源ごみ）
    key: 'cooking_sake_bottle',
    label: '酒の容器 ペットボトル（洗浄済）',
    img: wasteImage23,
    score: 15,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'pet',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 2,
  },
  // ─── 汚れのあるびん（水洗いで資源ごみへ） ──────────────────────
  { // しょうゆ瓶（水洗いで資源ごみへ）
    key: 'soy_sauce_dirty',
    label: 'しょうゆの容器 ペットボトル（汚れあり）',
    img: wasteImage24,
    score: 20,
    isSimple: true,
    isWash: true,
    isBurn: false,
    isTrash: true,
    bin: 'yet',
    parts: [],
    feedBackId: 'must_wash',
    wasteLevel: 1,
    washTargetKey: 'soy_sauce_bottle',
  },
  { // みりん瓶（水洗いで資源ごみへ）
    key: 'mirin_dirty',
    label: 'みりんの容器 ペットボトル（汚れあり）',
    img: wasteImage25,
    score: 20,
    isSimple: true,
    isWash: true,
    isBurn: false,
    isTrash: true,
    bin: 'yet',
    parts: [],
    feedBackId: 'must_wash',
    wasteLevel: 2,
    washTargetKey: 'mirin_bottle',
  },
  { // 料理酒瓶（水洗いで資源ごみへ）
    key: 'cooking_sake_dirty',
    label: '酒の容器 ペットボトル（汚れあり）',
    img: wasteImage26,
    score: 20,
    isSimple: true,
    isWash: true,
    isBurn: false,
    isTrash: true,
    bin: 'yet',
    parts: [],
    feedBackId: 'must_wash',
    wasteLevel: 2,
    washTargetKey: 'cooking_sake_bottle',
  },
  // ─── リサイクルプラ（プラスチック製容器包装） ────────────────
  { // コンビニ弁当容器（プラマーク・容器包装はリサイクルプラ）
    key: 'bento_box',
    label: '弁当ガラ(プラスチック製容器)',
    img: wasteImage27,
    score: 15,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'recycle_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // ヨーグルトカップ（洗浄済・容器包装はリサイクルプラ）
    key: 'yogurt_clean',
    label: 'ヨーグルトのカップ プラスチック製（洗浄済）',
    img: wasteImage28,
    score: 15,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'recycle_plastic',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  // ─── 大型ごみ（最長辺30cm以上） ─────────────────────────────
  { // 布団（最長辺30cm以上の寝具は大型ごみ）
    key: 'futon',
    label: 'ふとん',
    img: wasteImage29,
    score: 20,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'oogata',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // 学習机（最長辺30cm以上の家具は大型ごみ）
    key: 'study_desk',
    label: '学習机',
    img: wasteImage30,
    score: 25,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'oogata',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 2,
  },
  { // オーブンレンジ（最長辺30cm以上の家電は大型ごみ）
    key: 'microwave_oven',
    label: 'オーブンレンジ',
    img: wasteImage31,
    score: 25,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'oogata',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 1,
  },
  { // アイロン台（最長辺30cm以上の生活用品は大型ごみ）
    key: 'ironing_board',
    label: 'アイロン台',
    img: wasteImage32,
    score: 20,
    isSimple: true,
    isWash: false,
    isBurn: false,
    isTrash: true,
    bin: 'oogata',
    parts: [],
    feedBackId: 'simple_mistake',
    wasteLevel: 2,
  },
];
