import { useEffect, useState } from "react";
import GamePlayWaste from "./GamePlayWaste";
import { useConveyItems } from "../contexts/ConveyItems";
import type { ConveyItem } from "../types/game";
import "./GamePlayConveyor.css";

type GamePlayConveyorProps = {
  setHealth: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

const GamePlayConveyor = ({ setHealth, setScore }: GamePlayConveyorProps) => {
  const { conveyItems, setConveyItems } = useConveyItems();
  const [, setTick] = useState(0);

  useEffect(() => {
    let frameId = window.requestAnimationFrame(function animate() {
      setTick((prev: number) => prev + 1);
      frameId = window.requestAnimationFrame(animate);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const expiredItemIds = conveyItems
      .filter((item: ConveyItem) => Date.now() - item.startedAt >= item.travelMs)
      .map((item: ConveyItem) => item.id);

    if (expiredItemIds.length > 0) {
      setHealth((prevHealth: number) => Math.max(0, prevHealth - expiredItemIds.length));
      setConveyItems((prevItems: ConveyItem[]) => prevItems.filter((item: ConveyItem) => !expiredItemIds.includes(item.id)));
    }
  }, [conveyItems, setConveyItems, setHealth]);

  return (
    <div className="conveyor-wrapper">
      <div className="conveyor-assembly">
        {/* 上部レール枠 */}
        <div className="conveyor-rail conveyor-rail-top" />

        {/* ベルト面 */}
        <div className="conveyor-track">
          <div className="conveyor-items-plane">
            {conveyItems.map((conveyItem: ConveyItem) => {
              const elapsedMs = Date.now() - conveyItem.startedAt;
              const progress = Math.min(1, elapsedMs / conveyItem.travelMs);
              const distanceX = conveyItem.toX - conveyItem.coordinateX;
              const currentX = conveyItem.coordinateX + distanceX * progress;

              return (
                <GamePlayWaste
                  key={conveyItem.id}
                  id={conveyItem.id}
                  label={conveyItem.def.label}
                  isSimple={conveyItem.def.isSimple}
                  parts={conveyItem.def.parts}
                  baseX={currentX}
                  baseY={conveyItem.coordinateY}
                  setScore={setScore}
                />
              );
            })}
          </div>
        </div>

        {/* 下部レール枠 */}
        <div className="conveyor-rail conveyor-rail-bottom" />
      </div>
    </div>
  );
};

export default GamePlayConveyor;
