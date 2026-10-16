export type GuideSlide = {
  title: string;
  imagePath?: string; // 後で画像を入れるためのプロパティ
};

export const GUIDE_SLIDES: GuideSlide[] = [
  { title: "流れる前にごみを分別！", imagePath: "遊び方/流れる前にごみを分別.png" },
  { title: "ペットボトルは分解しよう！", imagePath: "遊び方/ペットボトルは分解しよう.png" },
  { title: "汚れたものはきれいに！", imagePath: "遊び方/汚れたものはきれいに.png" },
  { title: "スマホは販売店へ", imagePath: "遊び方/スマホは販売店へ.png" },
];
