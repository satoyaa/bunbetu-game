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
      className={`game-play-shop ${isOver ? 'is-over' : ''}`}
      title="購入店へ持参するものを入れるエリア"
      aria-label="回収ボックス"
    >
      <img src="/販売店/販売店.png" alt="販売店" className="game-play-shop-img" />
    </div>
  );
};

export default GamePlayCollectionBox;
