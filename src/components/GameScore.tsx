

type GameScoreProps = {
  score: number;
};

const GameScore = ({ score }: GameScoreProps) => {
  return (
    <div className="game-hud-badge score-badge">
      <span className="badge-label">スコア :</span>
      <span className="badge-value">{score}</span>
    </div>
  );
};

export default GameScore;
