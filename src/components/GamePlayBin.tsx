import type { ReactNode } from 'react';
import { useDroppable, type UniqueIdentifier } from '@dnd-kit/core';
import type { BinDef } from '../types/game';
import './GamePlayBin.css';

interface DroppableAreaProps {
  id: UniqueIdentifier;
  children: ReactNode;
  isOver: boolean;
  binDef?: BinDef;
}

// ドロップを受け入れるカードコンポーネント
const DroppableArea = ({ id, children, isOver}: DroppableAreaProps) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`bin-card ${isOver ? 'is-over' : ''}`}
    >
      {children}
    </div>
  );
};

interface GamePlayBinProps {
  bin: BinDef;
  activeOver: UniqueIdentifier | null;
}

const GamePlayBin = ({ bin, activeOver }: GamePlayBinProps) => {
  const isOver = activeOver === bin.id;

  return (
    <DroppableArea id={bin.id} isOver={isOver} binDef={bin}>
      <div className="bin-image-wrapper">
        <img src={`/${bin.img}`} alt={bin.label} className="bin-image" />
      </div>
    </DroppableArea>
  );
};

export default GamePlayBin;
