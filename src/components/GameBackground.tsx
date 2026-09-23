import pollutionImg from '../assets/pollution.jpg';
import fewpollutionImg from '../assets/fewpollution.jpg';
import normalImg from '../assets/normal.jpg';
import fewbeautyImg from '../assets/fewbeauty.jpg';
import beautyImg from '../assets/beauty.jpg';
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
