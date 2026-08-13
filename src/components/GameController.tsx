import { useState, useEffect } from "react";
import { useDifficulty } from "../contexts/Difficulty";
import type { BackgroundType, FeedBack, GameStatus } from "../types/game";
import { GAME_DIFFICULTY_DATA } from "../data/difficulty";

// 各コンポーネント呼び出し
import GameHeader from "./GameHeader";
import GamePlay from "./GamePlay";
import GameStartOverlay from "./overlays/GameStartOverlay";
import GameEndOverlay from "./overlays/GameEndOverlay";
import GameBackground from "./GameBackground";
import "./GameController.css";

const GameController = () => {
  const { difficulty } = useDifficulty(); // 選択中のゲーム難易度

  // 難易度設定の検索
  const currentDifficulty = GAME_DIFFICULTY_DATA.find((d) => d.difficulty === difficulty) ?? GAME_DIFFICULTY_DATA[1];
  const defaultHealth = isFinite(currentDifficulty.lifeLimit) ? currentDifficulty.lifeLimit : 5;
  const defaultTime = isFinite(currentDifficulty.timeLimit) ? currentDifficulty.timeLimit : 999;
  const defaultGameLevel = currentDifficulty.levels[0];

  const [score, setScore] = useState(0); // スコア計算用
  const [maxHealth, setMaxHealth] = useState(defaultHealth);
  const [health, setHealth] = useState(defaultHealth); // ヘルス表示用
  const [feedBack, setFeedBack] = useState<FeedBack>(); // feedBack 
  const [gameProgress, setGameProgress] = useState<GameStatus>("start"); // タップしてゲーム開始
  const [controlBackground, setControlBackground] = useState<BackgroundType>("pollution"); // 背景を得点に応じてコントロール
  const [timeLeft, setTimeLeft] = useState(defaultTime); // 残り時間表示用
  const [gameLevel, setGameLevel] = useState<number>(defaultGameLevel); // ゲームレベル管理用

  useEffect(() => {
    if (score >= 100) {
      setControlBackground("beautiful");
    } else if (score >= 60) {
      setControlBackground("reconstruction");
    }else if (score >= 30) {
      setControlBackground("normal");
    } else {
      setControlBackground("pollution");
    }
  }, [score]);

  useEffect(() => {
    const diffSetting = GAME_DIFFICULTY_DATA.find((d) => d.difficulty === difficulty) ?? GAME_DIFFICULTY_DATA[1];
    const initialLife = isFinite(diffSetting.lifeLimit) ? diffSetting.lifeLimit : 5;
    const initialTime = isFinite(diffSetting.timeLimit) ? diffSetting.timeLimit : 999;
    const initialLevel = diffSetting.levels[0];

    if (gameProgress === "start") {
      setTimeLeft(initialTime);
      setHealth(initialLife);
      setMaxHealth(initialLife);
      setGameLevel(initialLevel);
      setScore(0);
      return;
    }

    if (gameProgress !== "playing") {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameProgress("end");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameProgress, difficulty]);

  useEffect(() => {
    if (health <= 0 && gameProgress === "playing") {
      setGameProgress("end");
    }
  }, [health, gameProgress]);

  // 10秒ごとに gameLevel を1上げるタイマー（difficulty に合わせた最大レベル上限あり）
  useEffect(() => {
    if (gameProgress !== "playing") {
      return;
    }

    const diffSetting = GAME_DIFFICULTY_DATA.find((d) => d.difficulty === difficulty) ?? GAME_DIFFICULTY_DATA[1];
    const maxLevel = Math.max(...diffSetting.levels);

    const levelInterval = setInterval(() => {
      setGameLevel((prev) => Math.min(prev + 1, maxLevel));
    }, 10000);

    return () => clearInterval(levelInterval);
  }, [gameProgress, difficulty]);

  return (
    <div className="game-controller-container">
      {/* ゲーム内コンテンツ */}
      <div className="game-content-layer">
        <GameHeader
          score={score}
          timeLeft={timeLeft}
          difficulty={difficulty}
          health={health}
          maxHealth={maxHealth}
        />

        <GamePlay
          gameProgress={gameProgress}
          setFeedBackItem={setFeedBack}
          setGameProgress={setGameProgress}
          setControlBackground={setControlBackground}
          setHealth={setHealth}
          setScore={setScore}
          gameLevel={gameLevel}
        />
      </div>
      {/* 背景 */}
      <GameBackground controlBackground={controlBackground} />

      {gameProgress === "start" && (
        <GameStartOverlay onStart={() => setGameProgress("playing")} />
      )}
      {gameProgress === "end" && (
        <GameEndOverlay feedBack={feedBack} score={score}/>
      )}
    </div>
  );
};

export default GameController;
