import { useDifficulty } from "../contexts/Difficulty"
import type { Difficulty } from "../contexts/Difficulty"
import { usePageTransition } from "../hooks/PageTransition"
import imgSrc from '../assets/beauty2.png';
import "./Start.css"

export default function Start() {
  const { setDifficulty } = useDifficulty() // 難易度設定用関数 easy, normal, hardで管理
  const { goToGame, goToLearn } = usePageTransition() // ページ遷移関数を呼び出し

  // 難易度ボタン押下時 ①難易度を設定 ②Gameページへ遷移
  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setDifficulty(difficulty)
    goToGame()
  }

  return (
    <div className="startContainer">
      <div className="startBackgroundContainer">
        <img src={imgSrc} alt="ゲーム背景" className="gameBackgroundImage" />
      </div>
      <header className="startHeader">
        {/* メインタイトル */}
        <div className="titleWrapper">
          <h1 className="mainTitle">
            <span className="titleGreen">ごみ分別</span>
            <span className="titleBlue">ゲーム</span>
          </h1>
        </div>

        {/* サブタイトル */}
        <p className="subTitle">分別をして，地球を守ろう！</p>
      </header>

      {/* カード選択エリア */}
      <nav className="cardGrid" aria-label="メニュー選択">
        {/* やさしい */}
        <button
          type="button"
          className="menuCard cardEasy"
          onClick={() => handleSelectDifficulty("easy")}
        >
          <div className="iconCircle iconCircleEasy">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 36C11 22 23 10 38 10C38 25 26 37 12 36Z"
                fill="#72c53a"
              />
              <path
                d="M14 34C21 27 28 20 36 12"
                stroke="#52a123"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M13 35C10 38 7 40 4 41"
                stroke="#52a123"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="cardContent">
            <h2 className="cardTitle titleEasy">やさしい</h2>
            <p className="cardDesc">はじめての人におすすめ</p>
          </div>
        </button>

        {/* ふつう */}
        <button
          type="button"
          className="menuCard cardNormal"
          onClick={() => handleSelectDifficulty("normal")}
        >
          <div className="iconCircle iconCircleNormal">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 木の幹 */}
              <rect x="21" y="28" width="6" height="14" rx="2" fill="#8c5828" />
              {/* 木の葉 */}
              <circle cx="24" cy="18" r="12" fill="#60bf3b" />
              <circle cx="17" cy="22" r="9" fill="#4fa829" />
              <circle cx="31" cy="22" r="9" fill="#71ce4a" />
            </svg>
          </div>
          <div className="cardContent">
            <h2 className="cardTitle titleNormal">ふつう</h2>
            <p className="cardDesc">ちょうどいいレベル</p>
          </div>
        </button>

        {/* むずかしい */}
        <button
          type="button"
          className="menuCard cardHard"
          onClick={() => handleSelectDifficulty("hard")}
        >
          <div className="iconCircle iconCircleHard">
            <svg width="52" height="48" viewBox="0 0 52 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 奥の山 */}
              <polygon points="10,38 27,14 44,38" fill="#76c843" />
              {/* 手前の山 */}
              <polygon points="20,38 35,20 50,38" fill="#54a826" />
              {/* 旗のポール */}
              <line x1="27" y1="14" x2="27" y2="6" stroke="#9e6634" strokeWidth="2" strokeLinecap="round" />
              {/* 旗 */}
              <polygon points="27,6 38,10 27,14" fill="#f57c00" />
            </svg>
          </div>
          <div className="cardContent">
            <h2 className="cardTitle titleHard">むずかしい</h2>
            <p className="cardDesc">ちょうせんしたい人向け</p>
          </div>
        </button>

        {/* ごみを学ぶ */}
        <button
          type="button"
          className="menuCard cardLearn"
          onClick={goToLearn}
        >
          <div className="iconCircle iconCircleLearn">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 本の表紙・枠組み */}
              <path
                d="M8 35C13 32 19 32 24 35C29 32 35 32 40 35V16C35 13 29 13 24 16C19 13 13 13 8 16V35Z"
                fill="#ffffff"
                stroke="#2a7858"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <line x1="24" y1="16" x2="24" y2="35" stroke="#2a7858" strokeWidth="2.5" />
              {/* 右ページの葉っぱ */}
              <path
                d="M32 20C34 23 35 26 31 29C29 27 29 24 32 20Z"
                fill="#43a047"
              />
            </svg>
          </div>
          <div className="cardContent">
            <h2 className="cardTitle titleLearn">ごみを学ぶ</h2>
            <p className="cardDesc">ごみのことを知ろう</p>
          </div>
        </button>
      </nav>
    </div>
  )
}
