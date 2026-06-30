import { useState } from "react";

type GamePlayProps = {
  setFeedBackItem: React.Dispatch<React.SetStateAction<string | undefined>>
  setGameProgress: React.Dispatch<React.SetStateAction<string>>
  setControlBackground: React.Dispatch<React.SetStateAction<string>>
  setScore: React.Dispatch<React.SetStateAction<number>>
  setHealth: React.Dispatch<React.SetStateAction<number>>
}

const GamePlay = ({setFeedBackItem, setGameProgress, setControlBackground, setScore, setHealth}:GamePlayProps) =>{
    const [gomiList, setGomiList] = useState<string[]>([]); //難易度別に呼び出すアイテムのidのリスト．

    return(
        <>
        これはゲームプレイ画面です．
        {setFeedBackItem}
        </>
    )
}

export default GamePlay;