import type { FeedBackId } from '../types/game';

export interface SpecialFeedbackMessage {
  feedBackId: FeedBackId;
  message: string;
}

// simple_mistake 以外の特別フィードバックメッセージ定義
export const SPECIAL_FEEDBACK_MESSAGES: SpecialFeedbackMessage[] = [
  {
    feedBackId: 'forget_separate',
    message: 'パーツを分解してから分別してください！',
  },
  {
    feedBackId: 'burning',
    message: '発火の危険があるゴミです！正しく処理してください！',
  },
  {
    feedBackId: 'missed_Waste',
    message: '分別が間に合いませんでした！',
  },
  {
    feedBackId: 'must_wash',
    message: '水で洗ってから分別してください！',
  },
  {
    feedBackId: 'must_flush',
    message: '中身を流してから分別してください！',
  },
];
