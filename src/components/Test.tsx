import { useState, type ReactNode } from 'react';
import { DndContext, useDraggable, useDroppable, rectIntersection, type DragEndEvent, type DragOverEvent, type UniqueIdentifier } from '@dnd-kit/core';

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
    padding: '20px',
    margin: '10px',
    border: '2px dashed #ccc',
    minHeight: '100px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

// 3．メインアプリケーション
export const Test = () => {
  // アイテムが現在どの領域にいるかを管理（初期値はnull＝どこにも属していない）
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  // 現在ドラッグ中で重なっている領域をハイライトするために管理
  const [activeOver, setActiveOver] = useState<UniqueIdentifier | null>(null);

  // ドラッグ中のリアルタイム判定（ハイライト用）
  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setActiveOver(over ? over.id : null);
  };

  // ドラッグ終了時の処理（確定処理）
  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    
    // ドロップ領域に着地した場合はStateを更新
    if (over) {
      setParent(over.id);
    }
    
    // ハイライト状態をリセット
    setActiveOver(null);
  };

  return (
    // collisionDetectionで衝突判定のアルゴリズムを指定
    <DndContext 
      collisionDetection={rectIntersection} 
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        
        {/* エリアA */}
        <div style={{ flex: 1 }}>
          <h3>エリアA</h3>
          <DroppableArea id="area-a" isOver={activeOver === 'area-a'}>
            {parent === 'area-a' ? <DraggableItem id="item-1">📦 つかめるアイテム</DraggableItem> : '空っぽ'}
          </DroppableArea>
        </div>

        {/* エリアB */}
        <div style={{ flex: 1 }}>
          <h3>エリアB</h3>
          <DroppableArea id="area-b" isOver={activeOver === 'area-b'}>
            {parent === 'area-b' ? <DraggableItem id="item-1">📦 つかめるアイテム</DraggableItem> : '空っぽ'}
          </DroppableArea>
        </div>

      </div>

      {/* どちらの領域にも属していない初期状態のアイテム */}
      {parent === null && (
        <div style={{ marginTop: '20px' }}>
          <DraggableItem id="item-1">📦 つかめるアイテム</DraggableItem>
        </div>
      )}
    </DndContext>
  );
};