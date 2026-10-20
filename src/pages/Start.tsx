import { useDifficulty } from "../contexts/Difficulty"
import type { Difficulty } from "../contexts/Difficulty"
import { usePageTransition } from "../hooks/PageTransition"
import imgSrc from '../assets/beauty2.png';
import titleSrc from '/アプリタイトル.png';
import "./Start.css"

export default function Start() {
  const { setDifficulty } = useDifficulty()
  const { goToGame, goToLearn } = usePageTransition()

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setDifficulty(difficulty)
    goToGame()
  }

  return (
    <div className="startContainer">
      <div className="startBackgroundContainer">
        <img src={imgSrc} alt="ゲーム背景" className="gameBackgroundImage" />
      </div>

      <div className="startContent">
        <header className="startHeader">
          <div className="titleWrapper">
            <img src={titleSrc} alt="ゲームタイトル" className="gameTitleImage" />
          </div>
        </header>

        <div className="mainArea">
          <nav className="cardGrid" aria-label="メニュー選択">
            {/* やさしい */}
            <button
              type="button"
              className="menuBtn btnEasy"
              onClick={() => handleSelectDifficulty("easy")}
            >
              <div className="btnInner">
                <span className="btnText">やさしい</span>
              </div>
              <hr className="btnDivider" />
            </button>

            {/* ふつう */}
            <button
              type="button"
              className="menuBtn btnNormal"
              onClick={() => handleSelectDifficulty("normal")}
            >
              <div className="btnInner">
                <span className="btnText">ふつう</span>
              </div>
              <hr className="btnDivider" />
            </button>

            {/* むずかしい */}
            <button
              type="button"
              className="menuBtn btnHard"
              onClick={() => handleSelectDifficulty("hard")}
            >
              <div className="btnInner">
                <span className="btnText">むずかしい</span>
              </div>
              <hr className="btnDivider" />
            </button>

            {/* ごみを学ぶ */}
            <button
              type="button"
              className="menuBtn btnLearn"
              onClick={goToLearn}
            >
              <div className="btnInner">
                <span className="btnText">ごみ問題を学ぶ</span>
              </div>
              <hr className="btnDivider" />
            </button>
          </nav>
        </div>

        <footer className="startFooter">
          <p>ごみ箱画像（8点）　出典：広島市／©広島市</p>
          <p>制作：広島市立大学大学院情報科学研究科学生</p>
          <p>協力：株式会社コーヨー</p>
        </footer>
      </div>
    </div>
  )
}
