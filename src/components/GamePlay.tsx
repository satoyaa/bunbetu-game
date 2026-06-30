import { useState } from "react";
import GamePlayBin from "./GamePlayBin";
import { DndContext, rectIntersection, type DragOverEvent, type DragEndEvent, type UniqueIdentifier } from "@dnd-kit/core";
import { BINS } from "../data/bins";
import GamePlayConveyor from "./GamePlayConveyor";

import './GamePlay.css'

type GamePlayProps = {
  setFeedBackItem: React.Dispatch<React.SetStateAction<string | undefined>>
  setGameProgress: React.Dispatch<React.SetStateAction<string>>
  setControlBackground: React.Dispatch<React.SetStateAction<string>>
  setScore: React.Dispatch<React.SetStateAction<number>>
  setHealth: React.Dispatch<React.SetStateAction<number>>
}

const GamePlay = (props: GamePlayProps) => {
    const { setFeedBackItem } = props;
    const [activeOver, setActiveOver] = useState<UniqueIdentifier | null>(null); // 現在ドラッグ中で重なっている領域をハイライトするために管理

    // ドラッグ中のリアルタイム判定（ハイライト用）
    const handleDragOver = (event: DragOverEvent) => {
        const { over } = event;
        setActiveOver(over ? over.id : null);
    };

    // ドラッグ終了時の処理（確定処理）
    const handleDragEnd = (_event: DragEndEvent) => {
        // ハイライト状態をリセット
        setActiveOver(null);
    };

    return(
        <>
        これはゲームプレイ画面です．
        {/*<Test></Test>*/}
        <DndContext
            collisionDetection={rectIntersection} 
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <GamePlayConveyor></GamePlayConveyor>
            <div className='bins'>
                {BINS.map((bin) =>{
                    return(<GamePlayBin 
                        key={bin.id}
                        id={bin.id} 
                        img={bin.img} 
                        label={bin.label} 
                        activeOver={activeOver}></GamePlayBin>)
                })}
            </div>
        </DndContext>
        {setFeedBackItem}
        </>
    )
}

export default GamePlay;