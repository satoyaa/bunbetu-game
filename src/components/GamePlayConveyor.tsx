import GamePlayWaste from "./GamePlayWaste";
import { useConveyItems } from "../contexts/conveyItems";

const GamePlayConveyor = () => {
    const { conveyItems } = useConveyItems();

    return (
        <div className="conveyor">
            {conveyItems.map((conveyItem) => {
                return (
                    <div key={conveyItem.id} className="conveyed" style={{ top: `${conveyItem.fromY}px` }}>
                        <GamePlayWaste
                            id={conveyItem.id}
                            label={conveyItem.def.label}
                            isSimple={conveyItem.def.isSimple}
                            parts={conveyItem.def.parts}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default GamePlayConveyor;