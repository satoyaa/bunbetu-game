type GameTimeProps = {
  timeLeft: number;
};

const GameTime = ({ timeLeft }: GameTimeProps) => {
  const displayTime = !isFinite(timeLeft) || timeLeft >= 999 ? "∞" : `${timeLeft}秒`;

  return (
    <div className="game-hud-badge time-badge">
      <span className="badge-label">残り時間 :</span>
      <span className="badge-value">{displayTime}</span>
    </div>
  );
};

export default GameTime;

