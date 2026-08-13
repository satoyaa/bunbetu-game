import "./GameEndOverlay.css";
import { SPECIAL_FEEDBACK_MESSAGES, FEEDBACK_TITLES, type SpecialFeedbackMessage, type FeedTitle } from "../../data/feedback";
import type { FeedBack } from "../../types/game";
import { usePageTransition } from "../../hooks/PageTransition";

type GameEndOverlayProps = {
  onEnd?: () => void;
  feedBack?: FeedBack;
  score?: number;
};

const GameEndOverlay = ({ onEnd, feedBack, score = 0 }: GameEndOverlayProps) => {
  const { goToStart, goToLearn } = usePageTransition();

  // スコアに応じた称号の取得
  const earnedTitle = [...FEEDBACK_TITLES]
    .sort((a, b) => b.feedTitleScoreThreshold - a.feedTitleScoreThreshold)
    .find((item: FeedTitle) => score >= item.feedTitleScoreThreshold)
    ?.feedTitle ?? FEEDBACK_TITLES[0].feedTitle;

  const feedbackMessage = feedBack
    ? `${feedBack.who}は${feedBack.where}です。`
    : "上手に分別できました！";

  let detailMessage = "正しいごみ箱に分別しよう！";

  if (feedBack) {
    if (feedBack.id === "simple_mistake") {
      detailMessage = "正しいごみ箱に分別しよう！";
    } else {
      const special = SPECIAL_FEEDBACK_MESSAGES.find(
        (item: SpecialFeedbackMessage) => item.feedBackId === feedBack.id
      );
      detailMessage = special
        ? special.message
        : feedBack.special_message || "正しいごみ箱に分別しよう！";
    }
  }

  const handleEnd = () => {
    onEnd?.();
    goToStart();
  };

  const handleLearn = () => {
    onEnd?.();
    goToLearn();
  };

  return (
    <div className="gameEndOverlay">
      <div className="gameEndOverlayCard">
        <div className="gameEndTitleBadge">
              <span className="gameEndTitleName">{earnedTitle}</span>
        </div>
          {/* スコア＆称号表示セクション */}
          <div className="gameEndScoreSection">
            <div className="gameEndScoreDisplay">
              <span className="gameEndScoreLabel">最終スコア</span>
              <span className="gameEndScoreValue">{score}</span>
              <span className="gameEndScoreUnit">点</span>
            </div>
          {/* フィードバックメッセージ */}
          {feedBack && (
            <div className="gameEndFeedbackBox">
              <p className="gameEndOverlayText">
                {feedbackMessage}
              </p>
              <p className="gameEndDetailText">
                {detailMessage}
              </p>
            </div>
          )}
        </div>

        <div className="gameEndOverlayFooter">
          <button
            className="gameEndOverlayLearnButton"
            type="button"
            onClick={handleLearn}
          >
            リサイクルについて学ぶ
          </button>

          <button
            className="gameEndOverlayNextButton"
            type="button"
            onClick={handleEnd}
          >
            おわり
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameEndOverlay;
