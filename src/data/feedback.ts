import type { FeedBackId } from '../types/game';

export interface SpecialFeedbackMessage {
  feedBackId: FeedBackId;
  message: string;
}

export interface FeedTitle {
  feedTitleScoreThreshold: number;
  feedTitle: string;
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

export const FEEDBACK_TITLES: FeedTitle[] = [
  { feedTitleScoreThreshold: 0, feedTitle: '初心者' },
  { feedTitleScoreThreshold: 100, feedTitle: '分別の達人' },
  { feedTitleScoreThreshold: 200, feedTitle: '分別マスター' },
  { feedTitleScoreThreshold: 300, feedTitle: 'エコイスト' },
  { feedTitleScoreThreshold: 400, feedTitle: '環境保護の英雄' },
  { feedTitleScoreThreshold: 500, feedTitle: '分別の王' },
  { feedTitleScoreThreshold: 1000, feedTitle: '分別星人' },
  { feedTitleScoreThreshold: 5000, feedTitle: '分別神' },
];
