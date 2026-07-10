

import "./GameEndOverlay.css";
import { FEEDBACK_DATA } from "../../data/feedback";
import { usePageTransition } from "../../hooks/PageTransition";

type GameEndOverlayProps = {
  onEnd?: () => void;
  feedBackItem?: string;
  controlBackground?: string;
};

const GameEndOverlay = ({ onEnd, feedBackItem }: GameEndOverlayProps) => {
  const { goToStart } = usePageTransition();

  const feedback = FEEDBACK_DATA.find((item) => item.id === feedBackItem) ?? FEEDBACK_DATA[0];
  const feedbackMessage = feedback ? `${feedback.who}は${feedback.where}です。` : "ごみの分別をしよう。";
  const detailMessage = feedback?.special_message || "正しいごみ箱に分別しよう！";

  const handleEnd = () => {
    onEnd?.();
    goToStart();
  };

  return (
    <div className="gameEndOverlay">
      <div className="gameEndOverlayCard">
        {true ? (
          <>
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
          </>
        ) : (
          <></>
        )}


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