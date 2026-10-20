import binImage0 from '../assets/images/bins/可燃ごみ.jpg';
import binImage1 from '../assets/images/bins/ペットボトル.jpg';
import binImage2 from '../assets/images/bins/リサイクルプラ.jpg';
import binImage3 from '../assets/images/bins/その他プラ.jpg';
import binImage4 from '../assets/images/bins/不燃ごみ.jpg';
import binImage5 from '../assets/images/bins/資源ごみ.jpg';
import binImage6 from '../assets/images/bins/有害ごみ.jpg';
import binImage7 from '../assets/images/bins/大型ごみ.jpg';
import type { BinDef } from '../types/game';

// ゴミ箱の一覧（左から並ぶ順）。ここを編集すると分別先が変わる。
export const BINS: BinDef[] = [
  {
    id: 'kanen',
    img: binImage0,
    label: '可燃ごみ',
  },
  {
    id: 'pet',
    img: binImage1,
    label: 'ペットボトル',
  },
  {
    id: 'recycle_plastic',
    img: binImage2,
    label: 'リサイクルプラ',
  },
  {
    id: 'other_plastic',
    img: binImage3,
    label: 'その他プラ',
  },
  {
    id: 'hunen',
    img: binImage4,
    label: '不燃ごみ',
  },
  {
    id: 'sigen',
    img: binImage5,
    label: '資源ごみ',
  },
  {
    id: 'yugai',
    img: binImage6,
    label: '有害ごみ',
  },
  {
    id: 'oogata',
    img: binImage7,
    label: '大型ごみ (有料)',
  },
];