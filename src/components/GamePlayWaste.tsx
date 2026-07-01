import type { ReactNode } from 'react';
import { useDraggable, type UniqueIdentifier } from '@dnd-kit/core';
import { Waste } from '../data/waste';
import { useConveyItems } from '../contexts/conveyItems';
import type { ConveyItem } from '../types/game';

interface DraggableItemProps {
  id: UniqueIdentifier;
  children: ReactNode;
}

// 1．ドラッグできるコンポーネント
const DraggableItem = ({ id, children }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  // ドラッグ中の移動量をCSSのtransformに適用
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 10,
  } : undefined;

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
}

const GamePlayWaste = ({ id, label, parts, isSimple }: GamePlayWasteProps) => {
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

    const separatedItems: ConveyItem[] = [
      {
        id: Date.now() + Math.random(),
        def: selectedPartDef,
        fromX: currentItem.fromX,
        fromY: currentItem.fromY,
        toX: currentItem.toX,
        travelMs: currentItem.travelMs,
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
          fromX: currentItem.fromX,
          fromY: currentItem.fromY,
          toX: currentItem.toX,
          travelMs: currentItem.travelMs,
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
        onPointerDown={(event) => event.stopPropagation()}
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
      <DraggableItem id={id}>
        {isSimple ? <div>{label}</div> : displayedParts}
      </DraggableItem>
    </div>
  );
};

export default GamePlayWaste;