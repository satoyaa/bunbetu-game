import { useState } from "react";
import { useDifficulty } from "../../contexts/Difficulty";
import { GAME_DIFFICULTY_DATA } from "../../data/difficulty";
import { GUIDE_SLIDES } from "../../data/guide";
import { usePageTransition } from "../../hooks/PageTransition";
import ArrowCircleIcon from "./ArrowCircleIcon";
import "./GameStartOverlay.css";

type GameStartOverlayProps = {
  onStart?: () => void;
};

const GameStartOverlay = ({ onStart }: GameStartOverlayProps) => {
  const { difficulty } = useDifficulty();
  const { goToStart } = usePageTransition();
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
        <button className="reselect-difficulty-btn" onClick={goToStart}>
          難易度を選びなおす
        </button>

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
          <button className="slider-arrow left" type="button" aria-label="前のページ" onClick={prevSlide}>
            <ArrowCircleIcon direction="left" className="slider-arrow-icon" />
          </button>
          <div className="slider-card">
            <img
              className="slider-image"
              src={GUIDE_SLIDES[currentSlide].imagePath}
              alt={GUIDE_SLIDES[currentSlide].title}
            />
            <p className="slider-card-title">{GUIDE_SLIDES[currentSlide].title}</p>
          </div>
          <button className="slider-arrow right" type="button" aria-label="次のページ" onClick={nextSlide}>
            <ArrowCircleIcon direction="right" className="slider-arrow-icon" />
          </button>
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
        <span className="start-notion-reference" >
          ※分別は広島市のごみ分別50音事典に基づいています<br className="start-notion-sp-br"></br>
          <a href="https://www.city.hiroshima.lg.jp/living/gomi-kankyo/1021277/1003072/1026094/1003180.html">広島市/ごみ分別50音事典</a>
        </span>
        
      </div>
    </div>
  );
};

export default GameStartOverlay;
