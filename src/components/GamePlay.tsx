import { useState, useEffect } from "react";
import GamePlayBin from "./GamePlayBin";
import { DndContext, rectIntersection, type DragOverEvent, type DragEndEvent, type UniqueIdentifier } from "@dnd-kit/core";
import { BINS } from "../data/bins";
import GamePlayConveyor from "./GamePlayConveyor";
import { useConveyItems, ConveyItemsProvider } from "../contexts/conveyItems";

import { Waste } from "../data/waste";

import './GamePlay.css'

type GamePlayProps = {
  setFeedBackItem: React.Dispatch<React.SetStateAction<string | undefined>>
  setGameProgress: React.Dispatch<React.SetStateAction<string>>
  setControlBackground: React.Dispatch<React.SetStateAction<string>>
  setScore: React.Dispatch<React.SetStateAction<number>>
  setHealth: React.Dispatch<React.SetStateAction<number>>
}

// 指定した範囲 of ランダムな整数を生成する関数
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const GamePlayContent = (props: GamePlayProps) => {
    const { setFeedBackItem, setHealth } = props;
    const { conveyItems, setConveyItems } = useConveyItems();
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
        const { active, over } = _event;
        if (!active || !over) {
            return;
        }

        const activeItem = conveyItems.find((item) => item.id === active.id);
        if (!activeItem) {
            return;
        }

        // item の bin とドロップ先の id が一致すれば正解とみなし、アイテムを削除
        if (activeItem.def.bin === over.id) {
            setConveyItems((prevItems) => prevItems.filter((item) => item.id !== active.id));
        } else {
            setHealth((prevHealth) => Math.max(0, prevHealth - 1));
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const itemId = Date.now() + Math.random();
            const itemY = getRandomNumber(0, 250);
            const index = getRandomNumber(0, 6);
            const newItem = {
                id: itemId, // 重複を避けるために一意のIDを生成
                def: Waste[index],
                coordinateX: 1200,
                coordinateY: itemY,
                toX: -200,
                travelMs: 10000,
                startedAt: Date.now(),
            };

            setConveyItems((prevItems) => [...prevItems, newItem]);
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return(
        <>
        これはゲームプレイ画面です．
        <DndContext
            collisionDetection={rectIntersection} 
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <GamePlayConveyor setHealth={setHealth} />
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

const GamePlay = (props: GamePlayProps) => {
    return (
        <ConveyItemsProvider>
            <GamePlayContent {...props} />
        </ConveyItemsProvider>
    );
};

export default GamePlay;