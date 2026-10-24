import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useDraggable, type UniqueIdentifier } from '@dnd-kit/core';
import { Waste } from '../data/waste';
import { useConveyItems } from '../contexts/ConveyItems';
import { LANE_OFFSET_STEP } from '../data/layout';
import type { ConveyItem, WasteDef } from '../types/game';
import './GamePlayWaste.css';

/** タップとドラッグを判別する移動量のしきい値(px) */
const TAP_SLOP_PX = 8;

interface DraggableItemProps {
  id: UniqueIdentifier;
  children: ReactNode;
  disabled: boolean;
  /** 0 = ベルト右端の外側 / 1 = ベルト左端の外側 */
  progress: number;
  /** ベルト面高さに対する縦方向オフセット(%) */
  laneOffset: number;
}

// 1．ドラッグできるコンポーネント
const DraggableItem = ({ id, children, disabled, progress, laneOffset }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging, activatorEvent, activeNodeRect } = useDraggable({
    id: id,
    disabled,
  });
  // ドラッグ中はベルトの進行を止めて見せる（指から位置が逃げないように）
  const [frozenProgress, setFrozenProgress] = useState<number | null>(null);

  useEffect(() => {
    if (isDragging && frozenProgress === null) {
      setFrozenProgress(progress);
    } else if (!isDragging && frozenProgress !== null) {
      setFrozenProgress(null);
    }
  }, [isDragging, frozenProgress, progress]);

  const p = isDragging && frozenProgress !== null ? frozenProgress : progress;

  /*
   * 割合ベースの座標計算。
   *   left        : 親(ベルト面)の幅に対する %
   *   translateX  : 自分自身の幅に対する %
   * この 2 つを組み合わせることで、
   *   p = 0 … 要素の左端がベルトの右端に一致（完全に画面外）
   *   p = 1 … 要素の右端がベルトの左端に一致（完全に画面外）
   * となり、画面幅が何 px でも必ず「右端外 → 左端外」を完走する。
   * JS 側で画面幅を測る必要がないため、リサイズ・端末回転にも自動追従する。
   */
  const leftPercent = (1 - p) * 100;
  const selfShiftPercent = -p * 100;

  const startPoint = activatorEvent instanceof MouseEvent
    ? activatorEvent
    : activatorEvent instanceof TouchEvent
      ? activatorEvent.touches[0]
      : null;
  // dnd-kit の矩形は CSS transform を除いた位置。ベルト上の配置分を戻して中心を求める。
  const centerOffset = isDragging && activeNodeRect && startPoint
    ? {
        x: startPoint.clientX - (activeNodeRect.left + activeNodeRect.width * (0.5 - p)),
        y: startPoint.clientY - activeNodeRect.top,
      }
    : { x: 0, y: 0 };

  const translateX = transform
    ? `calc(${selfShiftPercent}% + ${transform.x + centerOffset.x}px)`
    : `${selfShiftPercent}%`;
  const translateY = transform ? `calc(-50% + ${transform.y + centerOffset.y}px)` : '-50%';

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${leftPercent}%`,
    top: `${50 + laneOffset}%`,
    transform: `translate3d(${translateX}, ${translateY}, 0)`,
    zIndex: isDragging ? 1000 : 10,
    pointerEvents: disabled ? 'none' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="draggable-waste-container">
      {children}
    </div>
  );
};

interface GamePlayWasteProps {
  id: UniqueIdentifier;
  label: string;
  isSimple: boolean;
  progress: number;
  laneOffset: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const GamePlayWaste = ({ id, label, isSimple, progress, laneOffset, setScore }: GamePlayWasteProps) => {
  const { conveyItems, setConveyItems } = useConveyItems();
  const currentItem = conveyItems.find((item: ConveyItem) => item.id === id);
  const wasteDef = currentItem?.def;
  const [imageState, setImageState] = useState<{ src: string; status: 'loaded' | 'error' } | null>(null);
  const imageReady = !wasteDef || imageState?.src === wasteDef.img;
  // タップ開始位置。ドラッグとの競合を避けるため、移動量が小さいときだけ分解とみなす。
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleSeparate = () => {
    if (isSimple) {
      return;
    }

    if (!currentItem) {
      return;
    }

    const partDefs = currentItem.def.parts.map((partKey: string) =>
      Waste.find((item: WasteDef) => item.key === partKey)
    );
    if (partDefs.length === 0 || partDefs.some((partDef) => !partDef)) {
      return;
    }

    setScore((prevScore: number) => prevScore + currentItem.def.score);

    /*
     * 分解後のパーツは、親の startedAt / travelMs をそのまま引き継ぐ。
     * 進行度は時間だけで決まるので、これだけで分解地点から途切れずに流れ続ける。
     */
    const separatedItems: ConveyItem[] = partDefs.map((partDef, index) => ({
      id: Date.now() + Math.random(),
      def: partDef!,
      laneOffset: currentItem.laneOffset + (index - (partDefs.length - 1) / 2) * LANE_OFFSET_STEP,
      travelMs: currentItem.travelMs,
      startedAt: currentItem.startedAt,
    }));

    setConveyItems((prevItems: ConveyItem[]) =>
      prevItems.filter((item: ConveyItem) => item.id !== currentItem.id).concat(separatedItems)
    );
  };

  const handlePartPointerDown = (event: React.PointerEvent) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePartPointerUp = (event: React.PointerEvent) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) {
      return;
    }

    // 指が動いていればドラッグ操作とみなし、分解しない
    const movedX = Math.abs(event.clientX - start.x);
    const movedY = Math.abs(event.clientY - start.y);
    if (movedX > TAP_SLOP_PX || movedY > TAP_SLOP_PX) {
      return;
    }

    event.stopPropagation();
    handleSeparate();
  };

  const renderVisual = () => {
    if (!wasteDef || (imageState?.src === wasteDef.img && imageState.status === 'error')) {
      return <div className="waste-label-tag waste-label-fallback">{label}</div>;
    }

    return (
      <div className={`waste-visual${imageReady ? '' : ' waste-visual-loading'}`}>
        <span className="waste-label-tag">{label}</span>
        <img
          src={wasteDef.img}
          alt=""
          className="waste-image"
          onLoad={() => setImageState({ src: wasteDef.img, status: 'loaded' })}
          onError={() => setImageState({ src: wasteDef.img, status: 'error' })}
        />
      </div>
    );
  };

  return (
    <DraggableItem id={id} disabled={!imageReady} progress={progress} laneOffset={laneOffset}>
      {isSimple ? (
        renderVisual()
      ) : (
        <div onPointerDown={handlePartPointerDown} onPointerUp={handlePartPointerUp}>
          {renderVisual()}
        </div>
      )}
    </DraggableItem>
  );
};

export default GamePlayWaste;
