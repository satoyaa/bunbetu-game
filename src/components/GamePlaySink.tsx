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
    />
  );
};

export default GamePlaySink;
