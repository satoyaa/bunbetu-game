import pollutionImg from '../assets/pollution.webp';
import fewpollutionImg from '../assets/fewpollution.webp';
import normalImg from '../assets/normal.webp';
import fewbeautyImg from '../assets/fewbeauty.webp';
import beautyImg from '../assets/beauty.webp';
import type { BackgroundType } from '../types/game';
import './GameBackground.css';

type GameBackgroundProps = {
  controlBackground: BackgroundType;
};

const backgroundImages: Record<BackgroundType, string> = {
  pollution: pollutionImg,
  fewpollution: fewpollutionImg,
  normal: normalImg,
  fewbeauty: fewbeautyImg,
  beautiful: beautyImg,
};

const GameBackground = ({ controlBackground }: GameBackgroundProps) => {
  const imgSrc = backgroundImages[controlBackground] ?? pollutionImg;

  return (
    <div className="gameBackgroundContainer">
      <img src={imgSrc} alt="ゲーム背景" className="gameBackgroundImage" />
    </div>
  );
};

export default GameBackground;
