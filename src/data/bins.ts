import type { BinDef } from '../types/game';

// ゴミ箱の一覧（左から並ぶ順）。ここを編集すると分別先が変わる。
export const BINS: BinDef[] = [
  { id: 'kanen', img: 'ここに入力', label: '可燃ごみ' },
  { id: 'pet', img: 'ここに入力', label: 'ペットボトル' },
  { id: 'recycle_plastic', img: 'ここに入力', label: 'リサイクルプラ' },
  { id: 'other_plastic', img: 'ここに入力', label: 'その他プラ' },
  { id: 'hunen', img: 'ここに入力', label: '不燃ごみ' },
  { id: 'sigen', img: 'ここに入力', label: '資源ごみ' },
  { id: 'yugai', img: 'ここに入力', label: '有害ごみ' },
  { id: 'oogata', img: 'ここに入力', label: '大型ごみ' },
];