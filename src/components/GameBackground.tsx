import pollutionImg from '../assets/pollution.png';
import normalImg from '../assets/normal.png';
import natureImg from '../assets/nature.png';
import './GameBackground.css';

type GameBackgroundProps = {
  controlBackground: string;
};

const backgroundImages: Record<string, string> = {
  pollution: pollutionImg,
  normal: normalImg,
  nature: natureImg,
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
