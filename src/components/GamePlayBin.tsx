import type { ReactNode } from 'react';
import { useDroppable, type UniqueIdentifier } from '@dnd-kit/core';

interface DroppableAreaProps {
  id: UniqueIdentifier;
  children: ReactNode;
  isOver: boolean;
}

// 2．ドロップを受け入れるコンポーネント
const DroppableArea = ({ id, children, isOver }: DroppableAreaProps) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  // アイテムが重なっている時は背景色を変更する
  const style = {
    backgroundColor: isOver ? 'lightgreen' : '#f0f0f0',
    border: '2px dashed #ccc',
    flex: 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

interface GamePlayBinProps {
  id: UniqueIdentifier;
  img?: string;
  label: string;
  activeOver: UniqueIdentifier | null;
}

const GamePlayBin = ({ id, label, img, activeOver }: GamePlayBinProps) => {
  return (
    <>
      <DroppableArea id={id} isOver={activeOver === `${id}`}>
        <img src={img} alt={label} />
      </DroppableArea>
    </>
  );
};

export default GamePlayBin;