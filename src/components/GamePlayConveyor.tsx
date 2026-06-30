import GamePlayWaste from "./GamePlayWaste";

import { Waste } from "../data/waste";
import type { ConveyItem } from "../types/game";
import { useState, useEffect } from "react";

// 指定した範囲 of ランダムな整数を生成する関数
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const GamePlayConveyor = () => {
    const [conveyItems, setConveyItems] = useState<ConveyItem[]>([]);

    useEffect(() => {
        const timeoutIds: ReturnType<typeof setTimeout>[] = [];

        const intervalId = setInterval(() => {
            const randomNumber = getRandomNumber(0, Waste.length - 1);
            const itemId = Date.now() + Math.random();
            const itemY = getRandomNumber(0, 250);
            console.log(itemY)
            const newItem: ConveyItem = {
                id: itemId, // 重複を避けるために一意のIDを生成
                def: Waste[randomNumber],
                fromX: 0,
                fromY: itemY,
                toX: 800,
                travelMs: 10000,
            };

            setConveyItems((prevItems) => [...prevItems, newItem]);

            // travelMsミリ秒経過後にアイテムを削除する
            const timeoutId = setTimeout(() => {
                setConveyItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
            }, newItem.travelMs);

            timeoutIds.push(timeoutId);
        }, 3000);

        return () => {
            clearInterval(intervalId);
            timeoutIds.forEach((id) => clearTimeout(id));
        };
    }, []);

    return (
        <div className="conveyor">
            {conveyItems.map((conveyItem) => {
                return (
                    <div key={conveyItem.id} className="conveyed"  style={ {top: `${conveyItem.fromY}px`}}>
                        <GamePlayWaste 
                        id={conveyItem.id} 
                        label={conveyItem.def.label}
                        ></GamePlayWaste>
                    </div>
                );
            })}
        </div>
    );
};

export default GamePlayConveyor;