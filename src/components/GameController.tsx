import { useState, useEffect } from "react";
import { useDifficulty } from "../contexts/Difficulty";
import type { FeedBack } from "../types/game";
import { GAME_DIFFICULTY_DATA } from "../data/difficulty";


//各コンポーネント呼び出し
import GameHealth from "./GameHealth"; //体力表示
import GameScore from "./GameScore"; //スコア表示
import GameDifficulty from "./GameDifficulty"; //難易度表示
import GameTime from "./GameTime"; //残り時間表示
import GameBackground from "./GameBackground"; //背景表示
import GamePlay from "./GamePlay"; //ゲーム画面表示
import GameStartOverlay from "./overlays/GameStartOverlay" //開始オーバーレイ表示
import GameEndOverlay from "./overlays/GameEndOverlay"; //終了オーバーレイ表示


const GameController = () => {
    const { difficulty } = useDifficulty(); //選択中のゲーム難易度

    // 難易度設定の検索
    const currentDifficulty = GAME_DIFFICULTY_DATA.find((d) => d.difficulty === difficulty) ?? GAME_DIFFICULTY_DATA[1];
    const defaultHealth = isFinite(currentDifficulty.lifeLimit) ? currentDifficulty.lifeLimit : 5;
    const defaultTime = isFinite(currentDifficulty.timeLimit) ? currentDifficulty.timeLimit : 999;
    const defaultGameLevel = currentDifficulty.levels[0];

    const [score, setScore] = useState(0); //スコア計算用
    const [maxHealth, setMaxHealth] = useState(defaultHealth);
    const [health, setHealth] = useState(defaultHealth); //ヘルス表示用
    const [feedBack, setFeedBack] = useState<FeedBack>(); //feedBack 
    const [gameProgress, setGameProgress] = useState("start"); //タップしてゲーム開始
    const [controlBackground, setControlBackground] = useState("pollution"); //背景を得点に応じてコントロール
    const [timeLeft, setTimeLeft] = useState(defaultTime); //残り時間表示用
    const [gameLevel, setGameLevel] = useState(defaultGameLevel); //ゲームレベル管理用

    useEffect(() => {
        if (score >= 50) {
            setControlBackground("nature");
        } else if (score >= 30) {
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

    const handle_game_progress = () => {
        if (gameProgress === "start") {
            setGameProgress("playing");
        } else if (gameProgress === "playing") {
            setGameProgress("end");
        } else if (gameProgress === "end") {
            setGameProgress("start");
        }
    }
    return (
        <>
        <GameBackground controlBackground={controlBackground} />
        <button onClick={() =>handle_game_progress()}>ゲーム進行状況変更</button>
        <GameDifficulty difficulty={difficulty}></GameDifficulty>
        <GameHealth health={health} maxHealth={maxHealth}></GameHealth>
        <GameScore score={score}></GameScore>
        <GameTime timeLeft={timeLeft}></GameTime>
        <GamePlay 
            gameProgress={gameProgress}
            setFeedBackItem={setFeedBack} 
            setGameProgress={setGameProgress} 
            setControlBackground={setControlBackground}
            setHealth={setHealth}
            setScore={setScore}
            gameLevel={gameLevel}
        ></GamePlay>
        {gameProgress=="start" ? <GameStartOverlay></GameStartOverlay> : <></>}
        {gameProgress=="end" ? <GameEndOverlay feedBack={feedBack} controlBackground={controlBackground}></GameEndOverlay> : <></>}
        </>
    )
}

export default GameController;