import type { BinDef } from '../types/game';

// ゴミ箱の一覧（左から並ぶ順）。ここを編集すると分別先が変わる。
export const BINS: BinDef[] = [
  { id: 'kanen', img: '可燃ごみ.jpg', label: '可燃ごみ' },
  { id: 'pet', img: 'ペットボトル.jpg', label: 'ペットボトル' },
  { id: 'recycle_plastic', img: 'リサイクルプラ.jpg', label: 'リサイクルプラ' },
  { id: 'other_plastic', img: 'その他プラ.jpg', label: 'その他プラ' },
  { id: 'hunen', img: '不燃ごみ.jpg', label: '不燃ごみ' },
  { id: 'sigen', img: '資源ごみ.jpg', label: '資源ごみ' },
  { id: 'yugai', img: '有害ごみ.jpg', label: '有害ごみ' },
  { id: 'oogata', img: '大型ごみ.jpg', label: '大型ごみ' },
];