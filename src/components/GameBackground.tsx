import pollutionImg from '../assets/pollution.png';
import normalImg from '../assets/normal.png';
import reconstructionImg from '../assets/reconstruction.png';
import beautyImg from '../assets/beauty.png';
import type { BackgroundType } from '../types/game';
import './GameBackground.css';

type GameBackgroundProps = {
  controlBackground: BackgroundType;
};

const backgroundImages: Record<BackgroundType, string> = {
  pollution: pollutionImg,
  normal: normalImg,
  reconstruction: reconstructionImg,
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
