import { useState } from "react";
import { useDifficulty } from "../../contexts/Difficulty";
import { GAME_DIFFICULTY_DATA } from "../../data/difficulty";
import { GUIDE_SLIDES } from "../../data/guide";
import "./GameStartOverlay.css";

type GameStartOverlayProps = {
  onStart?: () => void;
};

const GameStartOverlay = ({ onStart }: GameStartOverlayProps) => {
  const { difficulty } = useDifficulty();
  const diffData = GAME_DIFFICULTY_DATA.find((d) => d.difficulty === difficulty);
  const diffName = diffData?.name || "ふつう";
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation(); // 背景クリックでのスタートを防ぐ
    setCurrentSlide((prev) => (prev + 1) % GUIDE_SLIDES.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + GUIDE_SLIDES.length) % GUIDE_SLIDES.length);
  };

  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation(); // 背景クリックでの連動を防ぐ
    if (onStart) onStart();
  };

  return (
    <div className="game-start-overlay">
      <div className="start-modal">
        {/* 1. 難易度バッジ */}
        <div className="start-difficulty-badge">
          難易度：{diffName}
        </div>

        {/* 2. タイトル */}
        <h2 className="start-modal-title">
          あそびかた
        </h2>
        
        

        {/* 3. スライダー */}
        <div className="start-slider-container">
          <button className="slider-arrow left" onClick={prevSlide}>&lt;</button>
          <div className="slider-card">
            <div className="slider-image-placeholder">画像準備中</div>
            <p className="slider-card-title">{GUIDE_SLIDES[currentSlide].title}</p>
          </div>
          <button className="slider-arrow right" onClick={nextSlide}>&gt;</button>
        </div>

        {/* 4. ページナビゲーション */}
        <div className="start-pagination">
          {GUIDE_SLIDES.map((_, idx) => (
            <span key={idx} className={`dot ${idx === currentSlide ? "active" : ""}`} />
          ))}
        </div>

        {/* 5. スタートボタン */}
        <button className="start-action-button" onClick={handleStart}>
          ゲームスタート！
        </button>
      </div>
    </div>
  );
};

export default GameStartOverlay;