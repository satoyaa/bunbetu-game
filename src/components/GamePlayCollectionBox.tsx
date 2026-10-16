import { useDroppable } from '@dnd-kit/core';
import './GamePlayCollectionBox.css';

interface GamePlayCollectionBoxProps {
  isOver: boolean;
}

const GamePlayCollectionBox = ({ isOver }: GamePlayCollectionBoxProps) => {
  const { setNodeRef } = useDroppable({ id: 'collection_box' });

  return (
    <div
      ref={setNodeRef}
      className={`game-play-collection-box ${isOver ? 'is-over' : ''}`}
      title="購入店へ持参するものを入れるエリア"
      aria-label="回収ボックス"
    >
      <span>回収ボックス</span>
    </div>
  );
};

export default GamePlayCollectionBox;
