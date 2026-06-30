import type { ReactNode } from 'react';
import { useDraggable, type UniqueIdentifier } from '@dnd-kit/core';


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
}

const GamePlayWaste = ({ id, label}: GamePlayWasteProps) => {
  return (
    <div>
      <DraggableItem id={id}>{label}</DraggableItem>
    </div>
  );
};

export default GamePlayWaste;