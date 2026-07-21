import { useEffect, useState, type ReactNode } from 'react';
import { useDraggable, type UniqueIdentifier } from '@dnd-kit/core';
import { Waste } from '../data/waste';
import { useConveyItems } from '../contexts/ConveyItems';
import type { ConveyItem } from '../types/game';

interface DraggableItemProps {
  id: UniqueIdentifier;
  children: ReactNode;
  baseX: number;
  baseY: number;
}

// 1．ドラッグできるコンポーネント
const DraggableItem = ({ id, children, baseX, baseY }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  useEffect(() => {
    if (!transform) {
      setDragStartX(null);
      return;
    }

    if (dragStartX === null) {
      setDragStartX(baseX);
    }
  }, [baseX, dragStartX, transform]);

  const dragOffsetX = dragStartX !== null && transform ? transform.x + (dragStartX - baseX) : transform?.x ?? 0;

  const style = {
    position: "absolute" as const,
    width: "100px",
    left: `${baseX}px`,
    top: `${baseY}px`,
    transform: transform ? `translate3d(${dragOffsetX}px, ${transform.y}px, 0)` : undefined,
    zIndex: 10,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="draggable">
      {children}
    </div>
  );
};

interface GamePlayWasteProps {
  id: UniqueIdentifier;
  label: string;
  parts: string[];
  isSimple: boolean;
  baseX: number;
  baseY: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const GamePlayWaste = ({ id, label, parts, isSimple, baseX, baseY, setScore }: GamePlayWasteProps) => {
  const { conveyItems, setConveyItems } = useConveyItems();

  const handleSeparate = (partKey: string) => {
    if (isSimple) {
      return;
    }

    const currentItem = conveyItems.find((item) => item.id === id);
    if (!currentItem) {
      return;
    }

    const selectedPartDef = Waste.find((item) => item.key === partKey);
    if (!selectedPartDef) {
      return;
    }

    const elapsedMs = Date.now() - currentItem.startedAt;
    const progress = Math.min(1, elapsedMs / currentItem.travelMs);
    const currentX = currentItem.coordinateX + (currentItem.toX - currentItem.coordinateX) * progress;
    const remainingTravelMs = Math.max(0, currentItem.travelMs - elapsedMs);

    setScore((prevScore) => prevScore + currentItem.def.score);

    const separatedItems: ConveyItem[] = [
      {
        id: Date.now() + Math.random(),
        def: selectedPartDef,
        coordinateX: currentX,
        coordinateY: currentItem.coordinateY - 10,
        toX: currentItem.toX,
        travelMs: remainingTravelMs,
        startedAt: Date.now(),
      },
    ];

    const remainingParts = currentItem.def.parts.filter((part) => part !== partKey);
    if (remainingParts.length > 0) {
      const combinedKey = [
        ...remainingParts,
        ...(currentItem.def.isWash ? ['drink'] : []),
      ].join('_');
      const remainingDef = Waste.find((item) => item.key === combinedKey);
      if (remainingDef) {
        separatedItems.push({
          id: Date.now() + Math.random(),
          def: remainingDef,
          coordinateX: currentX,
          coordinateY: currentItem.coordinateY + 10,
          toX: currentItem.toX,
          travelMs: remainingTravelMs,
          startedAt: Date.now(),
        });
      }
    }

    setConveyItems((prevItems) =>
      prevItems.filter((item) => item.id !== currentItem.id).concat(separatedItems)
    );
  };

  const displayedParts = parts.map((partKey, index) => {
    const matchedWaste = Waste.find((item) => item.key === partKey);
    return (
      <div
        key={`${partKey}-${index}`}
        onClick={(event) => {
          event.stopPropagation();
          handleSeparate(partKey);
        }}
      >
        {matchedWaste?.label ?? partKey}
      </div>
    );
  });

  return (
    <div>
      <DraggableItem id={id} baseX={baseX} baseY={baseY}>
        {isSimple ? <div>{label}</div> : displayedParts}
      </DraggableItem>
    </div>
  );
};

export default GamePlayWaste;