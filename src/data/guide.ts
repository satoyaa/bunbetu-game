export type GuideSlide = {
  title: string;
  imagePath?: string; // 後で画像を入れるためのプロパティ
};

export const GUIDE_SLIDES: GuideSlide[] = [
  { title: "流れる前にごみを分別！", imagePath: "" },
  { title: "汚れたものはきれいに！", imagePath: "" },
  { title: "たくさん点を取って称号ゲット！", imagePath: "" }
];
