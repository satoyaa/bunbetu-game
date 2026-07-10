import { useState } from "react";
import { useDifficulty } from "../contexts/Difficulty";


//各コンポーネント呼び出し
import GameHealth from "./GameHealth"; //体力表示
import GameScore from "./GameScore"; //スコア表示
import GamePlay from "./GamePlay"; //ゲーム画面表示
import GameStartOverlay from "./overlays/GameStartOverlay" //開始オーバーレイ表示
import GameEndOverlay from "./overlays/GameEndOverlay"; //終了オーバーレイ表示


const GameController = () => {
    const { difficulty } = useDifficulty(); //選択中のゲーム難易度
    const [score, setScore] = useState(0); //スコア計算用
    const [health, setHealth] = useState(5); //ヘルス表示用
    const [feedBackItem, setFeedBackItem] = useState<string>(); //feedBackで呼び出すitemのid 
    const [gameProgress, setGameProgress] = useState("start"); //タップしてゲーム開始
    const startGame = () => {setGameProgress("playing");};
    const [controlBackground, setControlBackground] = useState("pollution"); //背景を得点に応じてコントロール
    return (
        <>
        これはゲームページです．
        <p>選択中の難易度: {difficulty}</p>
        <GameHealth health={health}></GameHealth>
        <GameScore score={score}></GameScore>
        <GamePlay 
        setFeedBackItem={setFeedBackItem} 
        setGameProgress={setGameProgress} 
        setControlBackground={setControlBackground}
        setHealth={setHealth}
        setScore={setScore}
        ></GamePlay>
        {gameProgress === "start" ? (<GameStartOverlay onStart={startGame} />) : (<></>)}
        {gameProgress=="end" ? <GameEndOverlay feedBackItem={feedBackItem} controlBackground={controlBackground}></GameEndOverlay> : <></>}
        </>
    )
}

export default GameController;