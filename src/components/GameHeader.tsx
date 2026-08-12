import type { Difficulty } from "../contexts/Difficulty";
import GameScore from "./GameScore";
import GameTime from "./GameTime";
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
  return (
    <header className="game-header">
      <div className="game-header-left">
        <GameScore score={score} />
        <GameTime timeLeft={timeLeft} />
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
