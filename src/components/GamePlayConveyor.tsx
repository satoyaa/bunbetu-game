import { useEffect, useState } from "react";
import GamePlayWaste from "./GamePlayWaste";
import { useConveyItems } from "../contexts/conveyItems";

const GamePlayConveyor = () => {
    const { conveyItems, setConveyItems } = useConveyItems();
    const [, setTick] = useState(0);

    useEffect(() => {
        let frameId = window.requestAnimationFrame(function animate() {
            setTick((prev) => prev + 1);
            frameId = window.requestAnimationFrame(animate);
        });

        return () => {
            window.cancelAnimationFrame(frameId);
        };
    }, []);

    useEffect(() => {
        const expiredItemIds = conveyItems
            .filter((item) => Date.now() - item.startedAt >= item.travelMs)
            .map((item) => item.id);

        if (expiredItemIds.length > 0) {
            setConveyItems((prevItems) => prevItems.filter((item) => !expiredItemIds.includes(item.id)));
        }
    }, [conveyItems, setConveyItems]);

    return (
        <div className="conveyor">
            {conveyItems.map((conveyItem) => {
                const elapsedMs = Date.now() - conveyItem.startedAt;
                const progress = Math.min(1, elapsedMs / conveyItem.travelMs);
                const distanceX = conveyItem.toX - conveyItem.coordinateX;
                const currentX = conveyItem.coordinateX + distanceX * progress;

                return (
                    <div key={conveyItem.id} className="conveyed">
                        <GamePlayWaste
                            id={conveyItem.id}
                            label={conveyItem.def.label}
                            isSimple={conveyItem.def.isSimple}
                            parts={conveyItem.def.parts}
                            baseX={currentX}
                            baseY={conveyItem.coordinateY}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default GamePlayConveyor;