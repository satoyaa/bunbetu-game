import guideImage0 from '../assets/images/guide/流れる前にごみを分別.png';
import guideImage1 from '../assets/images/guide/ペットボトルは分解しよう.png';
import guideImage2 from '../assets/images/guide/汚れたものはきれいに.png';
import guideImage3 from '../assets/images/guide/スマホは販売店へ.png';
export type GuideSlide = {
  title: string;
  imagePath: string;
};

export const GUIDE_SLIDES: GuideSlide[] = [
  { title: "流れる前にごみを分別！", imagePath: guideImage0 },
  { title: "ペットボトルはタップで分解！", imagePath: guideImage1 },
  { title: "汚れたものはきれいに！", imagePath: guideImage2 },
  { title: "スマホは販売店へ！", imagePath: guideImage3 },
];
