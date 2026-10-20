import { useDroppable } from '@dnd-kit/core';
import './GamePlaySink.css';
import sinkImage from '../assets/images/ui/流し台（idle）.webp';

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
      <img src={sinkImage} alt="流し台" className="game-play-sink-image" />
    </div>
  );
};

export default GamePlaySink;
