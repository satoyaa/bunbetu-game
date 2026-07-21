

import "./GameEndOverlay.css";
import { SPECIAL_FEEDBACK_MESSAGES } from "../../data/feedback";
import type { FeedBack } from "../../types/game";
import { usePageTransition } from "../../hooks/PageTransition";

type GameEndOverlayProps = {
  onEnd?: () => void;
  feedBack?: FeedBack;
  controlBackground?: string;
};

const GameEndOverlay = ({ onEnd, feedBack }: GameEndOverlayProps) => {
  const { goToStart } = usePageTransition();

  const feedbackMessage = feedBack
    ? `${feedBack.who}は${feedBack.where}です。`
    : "ごみの分別をしよう。";

  let detailMessage = "正しいごみ箱に分別しよう！";

  if (feedBack) {
    if (feedBack.id === "simple_mistake") {
      detailMessage = "正しいごみ箱に分別しよう！";
    } else {
      const special = SPECIAL_FEEDBACK_MESSAGES.find(
        (item) => item.feedBackId === feedBack.id
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

  return (
    <div className="gameEndOverlay">
      <div className="gameEndOverlayCard">
        <div className="gameEndOverlayHeader">
          <h1 className="gameEndOverlayTitle">ちゃんと分別しよう！</h1>
        </div>

        <div className="gameEndOverlayBody">
          <div className="gameEndOverlayItem">🧴</div>

          <p className="gameEndOverlayText">
            {feedbackMessage}
            <br />
            {detailMessage}
          </p>
        </div>

        <div className="gameEndOverlayFooter">
          <button className="gameEndOverlayLearnButton" type="button">
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