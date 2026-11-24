import type { FeedBackId, WasteDef } from '../types/game';
import sheetFeedback from './sheets/feedback.json';

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
export const SPECIAL_FEEDBACK_MESSAGES: SpecialFeedbackMessage[] =
  sheetFeedback.specialFeedbackMessages as unknown as SpecialFeedbackMessage[];

export const FEEDBACK_TITLES: FeedTitle[] =
  sheetFeedback.feedbackTitles as unknown as FeedTitle[];
