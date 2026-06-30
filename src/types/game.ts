// ゴミ箱の種類を表すID。ここに増減させると分別先の選択肢が変わる。
export type BinId =
  | 'kanen' // 可燃ごみ
  | 'pet' // ペットボトル
  | 'recycle_plastic' // リサイクルプラ
  | 'other_plastic' // その他プラ
  | 'hunen' //不燃ごみ
  | 'sigen' // 資源ごみ
  | 'yugai' // 有害ごみ
  | 'oogata'; // 大型ごみ

export type FeedBackId = 
  | 'simple_mistake' //単純な入れ間違え
  | 'forget_separate' //分解忘れ
  | 'burning' //炎上
  | 'missed_trash' //分別が間に合わなかった
  | 'must_wash' //洗う必要あり
  | 'must_flush'; //流す必要あり


export interface FeedBack{
    id: FeedBackId;
    who: string; //何のごみを
    where: string; //本来入れるべき場所
    special_message: string; //単純な入れ間違え以外のメッセージ
}

export interface BinDef {
  id: BinId;
  img: string;
  label: string;
}

// ゴミを構成するパーツ1つ分の定義（どのゴミ箱が正解か）。
export interface PartDef {
  img: string;
  bin: BinId;
  tag: string;
}

// 流れてくるゴミの定義。simple=true は分解なしの1パーツ。
export interface TrashDef {
  key: string;
  img: string;
  simple: boolean;
  parts: PartDef[];
}

export type GameStatus = 'start' | 'playing' | 'end';

// ベルト上を流れているゴミ1つ分の実体。
export interface BeltItem {
  id: number;
  def: TrashDef;
  fromX: number; // 出現位置(px)
  toX: number; // ミスライン位置(px)
  travelMs: number; // 流れ切るまでの時間
}

// 作業エリアに置かれた、ドラッグ対象のパーツ。
export interface WorkPart extends PartDef {
  id: number;
  homeLeft: number; // 初期位置(%)
  homeTop: number; // 初期位置(%)
}

// 作業エリアの状態。
export interface WorkState {
  def: TrashDef;
  decomposed: boolean; // 分解済みか
  parts: WorkPart[]; // 未分別のパーツ（正解したら取り除かれる）
}

// ＋点やミスを表示する浮き上がりテキスト。
export interface FloatText {
  id: number;
  text: string;
  x: number; // ゲーム領域内のpx
  y: number;
  kind: 'good' | 'bad';
}

export type DropResult = 'consumed' | 'return';