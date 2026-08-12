

type GameHealthProps = {
  health: number;
  maxHealth: number;
};

const GameHealth = ({ health, maxHealth }: GameHealthProps) => {
  const isInfinite = !isFinite(maxHealth) || maxHealth >= 999;
  const total = isInfinite ? 5 : maxHealth;
  const current = isInfinite ? 5 : Math.max(0, health);

  return (
    <div className="game-hud-badge health-badge" title={`ライフ: ${isInfinite ? '無制限' : `${health}/${maxHealth}`}`}>
      <div className="hearts-container">
        {Array.from({ length: total }).map((_, index) => {
          const isAlive = index < current;
          return (
            <svg
              key={index}
              className={`heart-icon ${isAlive ? 'heart-alive' : 'heart-dead'}`}
              viewBox="0 0 24 24"
              fill={isAlive ? '#38A169' : '#CBD5E1'}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export default GameHealth;