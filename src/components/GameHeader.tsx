import type { Difficulty } from "../contexts/Difficulty";
import GameDifficulty from "./GameDifficulty";
import GameHealth from "./GameHealth";
import "./GameHeader.css";

type GameHeaderProps = {
  score: number;
  timeLeft: number;
  difficulty: Difficulty;
  health: number;
  maxHealth: number;
};

const GameHeader = ({
  score,
  timeLeft,
  difficulty,
  health,
  maxHealth,
}: GameHeaderProps) => {
  const displayTime = !isFinite(timeLeft) || timeLeft >= 999 ? "∞" : `${timeLeft}秒`;

  return (
    <header className="game-header">
      <div className="game-header-left">
        {/* スコアと残り時間を統合したカプセル */}
        <div className="game-hud-badge score-time-badge">
          <div className="hud-badge-section">
            <span className="badge-label">スコア :</span>
            <span className="badge-value">{score}</span>
          </div>
          <div className="hud-badge-divider" />
          <div className="hud-badge-section">
            <span className="badge-label">残り時間 :</span>
            <span className="badge-value">{displayTime}</span>
          </div>
        </div>
      </div>

      <div className="game-header-center">
        <GameDifficulty difficulty={difficulty} />
      </div>

      <div className="game-header-right">
        <GameHealth health={health} maxHealth={maxHealth} />
      </div>
    </header>
  );
};

export default GameHeader;

