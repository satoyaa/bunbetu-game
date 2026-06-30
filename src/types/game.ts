// ゴミ箱の種類を表すID。ここに増減させると分別先の選択肢が変わる。
export type BinId =
  | 'kanen' // 可燃ごみ
  | 'pet' // ペットボトル
  | 'recycle_plastic' // リサイクルプラ
  | 'other_plastic' // その他プラ
  | 'hunen' //不燃ごみ
  | 'sigen' // 資源ごみ
  | 'yugai' // 有害ごみ
  | 'oogata' // 大型ごみ
  | 'yet'; //分解の余地あり

export type FeedBackId = 
  | 'simple_mistake' //単純な入れ間違え
  | 'forget_separate' //分解忘れ
  | 'burning' //炎上
  | 'missed_Waste' //分別が間に合わなかった
  | 'must_wash' //洗う必要あり
  | 'must_flush'; //流す必要あり


//フィードバック用の型
export interface FeedBack{
    id: FeedBackId;
    who: string; //何のごみを
    where: string; //本来入れるべき場所
    special_message: string; //単純な入れ間違え以外のメッセージ
}

// ごみ箱のデータ
export interface BinDef {
  id: BinId;
  img: string;
  label: string;
}



// 流れてくるゴミの定義．
export interface WasteDef {
  key: string; // key
  label: string; //ごみ名
  img: string; //画像
  isSimple: boolean; //分解可能か
  isWash: boolean; //洗える・流せるか
  isBurn: boolean; //発火の危険性があるか
  bin : BinId; //ごみ箱・分解可能ならそちらを優先して処理
  parts: string[]; //分解後のパーツ
}

export type GameStatus = 'start' | 'playing' | 'end';

// ベルト上を流れているゴミ1つ分の実体。
export interface ConveyItem {
  id: number;
  def: WasteDef;
  fromX: number; // 出現位置(px)
  fromY: number; // 出現位置(px)
  toX: number; // ミスライン位置(px)
  travelMs: number; // 流れ切るまでの時間
}
