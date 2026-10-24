import type { FeedBackId, WasteDef } from '../types/game';

// プレイ中は短い注意だけを表示し、詳しい説明は終了画面に残す。
export const getImmediateHint = (waste: WasteDef): string | undefined => {
  switch (waste.feedBackId) {
    case 'forget_separate':
      return 'キャップとラベル、まだついてるよ！';
    case 'must_wash':
      return '汚れたままはダメだよ！';
    case 'must_flush':
      return '中身が残っているよ！';
    case 'burning':
      if (waste.key === 'smartphone') return 'スマホはごみ箱に入れちゃダメ！';
      if (waste.key === 'mobile_battery') return 'モバイルバッテリーはごみ箱に入れちゃダメ！';
      return undefined;
    default:
      return undefined;
  }
};

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
    message: '発火の危険があります。ごみ箱には入れず、購入店へ持参してください。',
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
  { feedTitleScoreThreshold: 300, feedTitle: '分別の達人' },
  { feedTitleScoreThreshold: 500, feedTitle: '分別マスター' },
  { feedTitleScoreThreshold: 700, feedTitle: 'エコイスト' },
  { feedTitleScoreThreshold: 1000, feedTitle: '環境保護の英雄' },
  { feedTitleScoreThreshold: 1500, feedTitle: '分別の王' },
  { feedTitleScoreThreshold: 2500, feedTitle: '分別星人' },
  { feedTitleScoreThreshold: 5000, feedTitle: '分別神' },
];
