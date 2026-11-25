import { useEffect, useState } from "react";
import GamePlayWaste from "./GamePlayWaste";
import { useConveyItems } from "../contexts/ConveyItems";
import { getProgress, isExpired } from "../data/layout";
import type { ConveyItem } from "../types/game";
import "./GamePlayConveyor.css";
import conveyorImage from '../assets/images/waste/ベルトコンベア.webp';
import { BINS } from "../data/bins";
import { SPECIAL_FEEDBACK_MESSAGES, type SpecialFeedbackMessage } from "../data/feedback";
import type { BinDef, FeedBack } from "../types/game";

type GamePlayConveyorProps = {
  setHealth: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setFeedBackItem: React.Dispatch<React.SetStateAction<FeedBack | undefined>>;
};

const GamePlayConveyor = ({ setHealth, setScore, setFeedBackItem }: GamePlayConveyorProps) => {
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
    const now = Date.now();
    const expiredItemIds = conveyItems
      .filter((item: ConveyItem) => isExpired(item, now))
      .map((item: ConveyItem) => item.id);

    if (expiredItemIds.length > 0) {
      const firstExpired = conveyItems.find((item: ConveyItem) => expiredItemIds.includes(item.id));
      if (firstExpired) {
        const waste = firstExpired.def;
        const binInfo = BINS.find((bin: BinDef) => bin.id === waste.bin);
        const feedbackId = 'missed_Waste';
        const message = SPECIAL_FEEDBACK_MESSAGES.find(
          (item: SpecialFeedbackMessage) => item.feedBackId === feedbackId
        )?.message ?? "分別が間に合いませんでした。";
        setFeedBackItem({
          id: feedbackId,
          who: waste.label,
          where: binInfo?.label ?? waste.bin,
          special_message: message,
          wasteImg: waste.img,
          binImg: binInfo?.img,
        });
      }
      setHealth((prevHealth: number) => Math.max(0, prevHealth - expiredItemIds.length));
      setConveyItems((prevItems: ConveyItem[]) => prevItems.filter((item: ConveyItem) => !expiredItemIds.includes(item.id)));
    }
  }, [conveyItems, setConveyItems, setHealth]);

  return (
    <div className="conveyor-wrapper">
      <div className="conveyor-assembly">
        {/* イラスト画像のビューポート（中央揃え・--conveyor-h に合わせて縮尺） */}
        <div className="conveyor-image-viewport">
          <img
            src={conveyorImage}
            alt="ベルトコンベア"
            className="conveyor-illustration"
          />
        </div>

        {/* ベルト面上のアイテム描画領域 */}
        <div className="conveyor-items-plane">
          {conveyItems.map((conveyItem: ConveyItem) => (
            <GamePlayWaste
              key={conveyItem.id}
              id={conveyItem.id}
              label={conveyItem.def.shortLabel ?? conveyItem.def.label}
              isSimple={conveyItem.def.isSimple}
              progress={getProgress(conveyItem)}
              laneOffset={conveyItem.laneOffset}
              setScore={setScore}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePlayConveyor;
