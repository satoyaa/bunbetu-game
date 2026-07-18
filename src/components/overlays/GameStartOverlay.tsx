

import "./GameStartOverlay.css";

type GameStartOverlayProps = {
  onStart?: () => void;
};

const GameStartOverlay = ({ onStart }: GameStartOverlayProps) => {
  return (
    <div className="gameStartOverlay">
      <div className="gameStartOverlayCard">
        <div className="gameStartOverlayHeader">
          <h1 className="gameStartOverlayTitle">ごみをすてよう！</h1>
        </div>

        <div className="gameStartOverlayBody">
          <div className="gameStartOverlayItem">🧴</div>

          <p className="gameStartOverlayText">
            横から飛んでくるごみをタップして，
            <br />
            正しいごみ箱に分別しよう！
          </p>
        </div>

        <div className="gameStartOverlayFooter">
          <button className="gameStartOverlayLearnButton" type="button">
            リサイクルについて学ぶ
          </button>

          <button
            className="gameStartOverlayNextButton"
            type="button"
            onClick={onStart}
          >
            スタート
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameStartOverlay;