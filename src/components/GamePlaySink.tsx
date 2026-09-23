import { useDroppable } from '@dnd-kit/core';
import './GamePlaySink.css';

interface GamePlaySinkProps {
  isOver: boolean;
}

const GamePlaySink = ({ isOver }: GamePlaySinkProps) => {
  const { setNodeRef } = useDroppable({
    id: 'sink',
  });

  return (
    <div
      ref={setNodeRef}
      className={`game-play-sink ${isOver ? 'is-over' : ''}`}
      title="流しエリア"
    >
      <img src="/流し台/流し台（idle）.png" alt="流し台" className="game-play-sink-image" />
    </div>
  );
};

export default GamePlaySink;
