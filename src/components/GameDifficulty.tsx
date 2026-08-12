import {type Difficulty } from "../contexts/Difficulty";

type GameDifficultyProps = {
  difficulty: Difficulty;
};

const GameDifficulty = ({ difficulty }: GameDifficultyProps) => {

  return (
    <div className="game-hud-badge">
      {difficulty}
    </div>
  );
};

export default GameDifficulty;

