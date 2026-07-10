

import "./GameHowToPlay.css";

type GameHowToPlayProps = {
  onStart?: () => void;
};

const GameHowToPlay = ({ onStart }: GameHowToPlayProps) => {
  return (
<div className="gameHowToPlay">
      <div className="gameHowToPlayCard">
        <div className="gameHowToPlayHeader">
          <h1 className="gameHowToPlayTitle">ごみをすてよう！</h1>
        </div>

        <div className="gameHowToPlayBody">
          <div className="gameHowToPlayItem">🧴</div>

          <p className="gameHowToPlayText">
            横から飛んでくるごみをタップして，
            <br />
            正しいごみ箱に分別しよう！
          </p>
        </div>

        <div className="gameHowToPlayFooter">
          <button className="gameHowToPlayLearnButton" type="button">
            リサイクルについて学ぶ
          </button>

          <button
            className="gameHowToPlayNextButton"
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

export default GameHowToPlay;