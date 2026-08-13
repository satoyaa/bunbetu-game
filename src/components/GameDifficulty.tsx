import { type Difficulty } from "../contexts/Difficulty";
import { GAME_DIFFICULTY_DATA } from "../data/difficulty";

type GameDifficultyProps = {
  difficulty: Difficulty;
};

const GameDifficulty = ({ difficulty }: GameDifficultyProps) => {
  const diffInfo = GAME_DIFFICULTY_DATA.find((d) => d.difficulty === difficulty);
  const displayName = diffInfo ? diffInfo.name : difficulty;

  return (
    <div className="game-hud-badge difficulty-badge">
      <span className="badge-label">難易度:</span>
      <span className="badge-value">{displayName}</span>
    </div>
  );
};

export default GameDifficulty;

