import { useState, useEffect } from "react";
import GamePlayBin from "./GamePlayBin";
import { DndContext, rectIntersection, useSensor, useSensors, PointerSensor, type DragOverEvent, type DragEndEvent, type UniqueIdentifier } from "@dnd-kit/core";
import { BINS } from "../data/bins";
import GamePlayConveyor from "./GamePlayConveyor";
import { useConveyItems, ConveyItemsProvider } from "../contexts/ConveyItems";

import { Waste } from "../data/waste";
import type { FeedBack } from "../types/game";

import { SPECIAL_FEEDBACK_MESSAGES } from "../data/feedback";

import './GamePlay.css'

type GamePlayProps = {
  gameProgress: string
  setFeedBackItem: React.Dispatch<React.SetStateAction<FeedBack | undefined>>
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
    const { gameProgress, setFeedBackItem, setHealth, setScore } = props;
    const { conveyItems, setConveyItems } = useConveyItems();
    const [activeOver, setActiveOver] = useState<UniqueIdentifier | null>(null); // 現在ドラッグ中で重なっている領域をハイライトするために管理

    // ゲーム終了時またはスタート画面への遷移時に conveyItems をリセット
    useEffect(() => {
        if (gameProgress === "end" || gameProgress === "start") {
            setConveyItems([]);
        }
    }, [gameProgress, setConveyItems]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

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
            setScore((prevScore) => prevScore + activeItem.def.score);
            setConveyItems((prevItems) => prevItems.filter((item) => item.id !== active.id));
        } else {
            setHealth((prevHealth) => Math.max(0, prevHealth - 1));

            const feedBackId = activeItem.def.feedBackId ?? 'simple_mistake';
            const binInfo = BINS.find((b) => b.id === activeItem.def.bin);
            const whereText = binInfo ? binInfo.label : activeItem.def.bin;

            let specialMessage = "";
            if (feedBackId !== 'simple_mistake') {
                const matchedMsg = SPECIAL_FEEDBACK_MESSAGES.find(
                    (msg) => msg.feedBackId === feedBackId
                );
                if (matchedMsg) {
                    specialMessage = matchedMsg.message;
                }
            }
            setFeedBackItem({
                id: feedBackId,
                who: activeItem.def.label,
                where: whereText,
                special_message: specialMessage,
            });
            console.log(`Feedback: ${feedBackId}, Who: ${activeItem.def.label}, Where: ${whereText}, Special Message: ${specialMessage}`);
        }
    };

    useEffect(() => {
        if (gameProgress !== "playing") {
            return;
        }

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
    }, [gameProgress, setConveyItems]);

    return(
        <>
        これはゲームプレイ画面です．
        <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection} 
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <GamePlayConveyor setHealth={setHealth} setScore={setScore} />
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