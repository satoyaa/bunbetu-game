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
  score: number; //獲得点数
  isSimple: boolean; //分解可能か
  isWash: boolean; //洗える・流せるか
  isBurn: boolean; //発火の危険性があるか
  bin : BinId; //ごみ箱・分解可能ならそちらを優先して処理
  parts: string[]; //分解後のパーツ
  feedBackId?: FeedBackId; //フィードバックID
}

export type GameStatus = 'start' | 'playing' | 'end';

// ベルト上を流れているゴミ1つ分の実体。
export interface ConveyItem {
  id: number;
  def: WasteDef;
  coordinateX: number; // 出現位置(px)
  coordinateY: number; // 出現位置(px)
  toX: number; // ミスライン位置(px)
  travelMs: number; // 流れ切るまでの時間
  startedAt: number; // 移動開始時刻
}

export interface GameLevelParameter {
  level: number; // ゲームのレベル
  wasteSpeed: number; //ごみの流れるスピード 得点に応じて高速化
  itemInterval: number; //ごみの出現間隔 得点及び難易度に応じて頻繁に
  wasteLevel: number; //ごみの種類別にレベル割り当て，簡単な難易度では出現するごみを絞る
  burstSpawnRate: number; //ごみの一斉出現率 得点に応じて増加
}

// 難易度別に管理するゲームのパラメータ
export interface GameDifficulty {
  name: string; // 難易度名
  timeLimit: number; //制限時間 やさしい=>60秒,ふつう=>60秒,むずかしい=>時間無制限
  lifeLimit: number; //ライフ制限 やさしい=>無制限,ふつう=>3,むずかしい=>3(仮，使わない可能性あり)
  binCount: number; //ごみ箱の数 難易度に応じて増減
  levels: GameLevelParameter[]; //レベルごとのパラメータ
}