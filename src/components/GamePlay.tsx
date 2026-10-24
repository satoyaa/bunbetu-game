import { useState, useEffect, useRef } from "react";
import GamePlayBin from "./GamePlayBin";
import GamePlaySink from "./GamePlaySink";
import GamePlayCollectionBox from "./GamePlayCollectionBox";
import { DndContext, pointerWithin, useSensor, useSensors, MouseSensor, TouchSensor, type DragOverEvent, type DragEndEvent, type UniqueIdentifier } from "@dnd-kit/core";
import { BINS } from "../data/bins";
import { GAME_LEVEL_PARAMETER_DATA } from "../data/difficulty";
import { BASE_TRAVEL_MS } from "../data/layout";
import GamePlayConveyor from "./GamePlayConveyor";
import { useConveyItems, ConveyItemsProvider } from "../contexts/ConveyItems";

import { Waste } from "../data/waste";
import type { BackgroundType, BinDef, ConveyItem, FeedBack, GameLevelParameter, GameStatus, WasteDef } from "../types/game";

import { getImmediateHint, SPECIAL_FEEDBACK_MESSAGES, type SpecialFeedbackMessage } from "../data/feedback";
import { useGameSound } from "../contexts/SoundContext";

import './GamePlay.css';

type GamePlayProps = {
  gameProgress: GameStatus;
  setFeedBackItem: React.Dispatch<React.SetStateAction<FeedBack | undefined>>;
  setGameProgress: React.Dispatch<React.SetStateAction<GameStatus>>;
  setControlBackground: React.Dispatch<React.SetStateAction<BackgroundType>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setHealth: React.Dispatch<React.SetStateAction<number>>;
  gameLevel: number;
};

type ImmediateHint = {
  message: string;
  x: number;
  y: number;
};

// 指定した範囲 of ランダムな整数を生成する関数
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const GamePlayContent = (props: GamePlayProps) => {
  const { gameProgress, setFeedBackItem, setHealth, setScore, gameLevel } = props;
  const { conveyItems, setConveyItems } = useConveyItems();
  const { playSE } = useGameSound();
  const [activeOver, setActiveOver] = useState<UniqueIdentifier | null>(null); // 現在ドラッグ中で重なっている領域をハイライトするために管理
  const [immediateHint, setImmediateHint] = useState<ImmediateHint | null>(null);
  const hasSpawnedFirstItem = useRef(false);

  useEffect(() => {
    if (!immediateHint) return;
    const timeoutId = window.setTimeout(() => setImmediateHint(null), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [immediateHint]);

  // ゲーム終了時またはスタート画面への遷移時に conveyItems をリセット
  useEffect(() => {
    if (gameProgress === "end" || gameProgress === "start") {
      setConveyItems([]);
    }
  }, [gameProgress, setConveyItems]);

  /*
   * PointerSensor 単独だと iOS Safari でドラッグ開始を取りこぼすことがあるため、
   * MouseSensor と TouchSensor を併用する。
   * どちらも距離しきい値のみで発火させ（遅延は入れない）、
   * テンポの速いゲーム操作を阻害しないようにする。
   */
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // ドラッグ中のリアルタイム判定（ハイライト & 洗浄処理）
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    setActiveOver(over ? over.id : null);

    if (over && over.id === 'sink' && active) {
      const activeItem = conveyItems.find((item: ConveyItem) => item.id === active.id);
      if (activeItem && activeItem.def.isWash && activeItem.def.washTargetKey) {
        const targetDef = Waste.find((w: WasteDef) => w.key === activeItem.def.washTargetKey);
        if (targetDef) {
          setConveyItems((prevItems: ConveyItem[]) =>
            prevItems.map((item: ConveyItem) =>
              item.id === active.id
                ? { ...item, def: targetDef }
                : item
            )
          );
        }
      }
    }
  };

  // ドラッグ終了時の処理（確定処理）
  const handleDragEnd = (_event: DragEndEvent) => {
    // ハイライト状態をリセット
    setActiveOver(null);
    const { active, over } = _event;
    if (!active || !over) {
      return;
    }

    // シンクの上にドロップされた場合は分別ではないため処理を終了（洗浄された状態で維持）
    if (over.id === 'sink') {
      setImmediateHint(null);
      return;
    }

    const activeItem = conveyItems.find((item: ConveyItem) => item.id === active.id);
    if (!activeItem) {
      return;
    }

    const isCorrect = activeItem.def.isTrash
      ? activeItem.def.bin === over.id
      : over.id === 'collection_box';

    if (isCorrect) {
      setImmediateHint(null);
      setScore((prevScore: number) => prevScore + activeItem.def.score);
      setConveyItems((prevItems: ConveyItem[]) => prevItems.filter((item: ConveyItem) => item.id !== active.id));
      playSE('correct');
    } else {
      setHealth((prevHealth: number) => Math.max(0, prevHealth - 1));
      playSE('incorrect');

      const hintMessage = getImmediateHint(activeItem.def);
      if (hintMessage) {
        const halfWidth = Math.min(140, (window.innerWidth - 24) / 2);
        setImmediateHint({
          message: hintMessage,
          x: Math.max(halfWidth + 12, Math.min(over.rect.left + over.rect.width / 2, window.innerWidth - halfWidth - 12)),
          y: Math.max(24, over.rect.top - 68),
        });
      } else {
        setImmediateHint(null);
      }

      const feedBackId = activeItem.def.feedBackId ?? 'simple_mistake';
      const binInfo = BINS.find((b: BinDef) => b.id === activeItem.def.bin);
      const whereText = activeItem.def.isTrash
        ? (binInfo ? binInfo.label : activeItem.def.bin)
        : '回収ボックス（購入店へ持参）';

      let specialMessage = "";
      if (feedBackId !== 'simple_mistake') {
        const matchedMsg = SPECIAL_FEEDBACK_MESSAGES.find(
          (msg: SpecialFeedbackMessage) => msg.feedBackId === feedBackId
        );
        if (matchedMsg) {
          specialMessage = matchedMsg.message;
        }
      }
      setFeedBackItem({
        id: feedBackId,
        who: activeItem.def.label,
        where: whereText,
        special_message: specialMessage,
        wasteImg: activeItem.def.img,
        binImg: binInfo ? binInfo.img : undefined,
      });
    }
  };

  useEffect(() => {
    if (gameProgress !== "playing") {
      hasSpawnedFirstItem.current = false;
      return;
    }

    const levelNum = gameLevel;
    const currentParam = GAME_LEVEL_PARAMETER_DATA.find((p: GameLevelParameter) => p.level === levelNum) ?? GAME_LEVEL_PARAMETER_DATA[0];

    // 出現可能なゴミ一覧（wasteLevel 以下に絞り込み）
    const availableWastes = Waste.filter((w: WasteDef) => w.wasteLevel <= currentParam.wasteLevel);
    const wasteList = availableWastes.length > 0 ? availableWastes : Waste;

    const spawnItem = () => {
      const itemId = Date.now() + Math.random();
      const index = getRandomNumber(0, wasteList.length - 1);
      // 「ベルト右端の外側 → 左端の外側」を流れ切るまでの時間。
      // 位置は割合で持つので、この値がそのまま画面上の滞在時間になる（画面幅に非依存）。
      const travelMs = Math.round(BASE_TRAVEL_MS / currentParam.wasteSpeed);

      const newItem: ConveyItem = {
        id: itemId, // 重複を避けるために一意のIDを生成
        def: wasteList[index],
        laneOffset: 0,
        travelMs: travelMs, // スピードに応じた移動ミリ秒
        startedAt: Date.now(),
      };

      setConveyItems((prevItems: ConveyItem[]) => [...prevItems, newItem]);
    };

    if (!hasSpawnedFirstItem.current) {
      spawnItem();
      hasSpawnedFirstItem.current = true;
    }

    const intervalId = setInterval(spawnItem, currentParam.itemInterval * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [gameProgress, gameLevel, setConveyItems]);

  return (
    <div className="game-play-container">
      {gameProgress === 'playing' && immediateHint && (
        <div
          className="game-play-immediate-hint"
          role="status"
          style={{ left: immediateHint.x, top: immediateHint.y }}
        >
          {immediateHint.message}
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        autoScroll={false}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="game-play-main-area">
          <div className="conveyor-section">
            <div className="special-areas">
              <GamePlayCollectionBox isOver={activeOver === 'collection_box'} />
              <GamePlaySink isOver={activeOver === 'sink'} />
            </div>
            <GamePlayConveyor setHealth={setHealth} setScore={setScore} />
          </div>
        </div>

        <div className="bottom-bins-bar">
          <div className="bins-container">
            <div className="bins-grid">
              {BINS.map((bin: BinDef) => {
                return (
                  <GamePlayBin
                    key={bin.id}
                    bin={bin}
                    activeOver={activeOver}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
};

const GamePlay = (props: GamePlayProps) => {
  return (
    <ConveyItemsProvider>
      <GamePlayContent {...props} />
    </ConveyItemsProvider>
  );
};

export default GamePlay;
