import "./GameStartOverlay.css";

type GameStartOverlayProps = {
  onStart?: () => void;
};

const GameStartOverlay = ({ onStart }: GameStartOverlayProps) => {
  return (
    <div className="game-start-overlay" onClick={onStart}>
      <div className="start-prompt-card">
        <h1 className="start-title">画面をタップしてゲームスタート！</h1>
      </div>
    </div>
  );
};

export default GameStartOverlay;