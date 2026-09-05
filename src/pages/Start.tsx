import { useDifficulty } from "../contexts/Difficulty"
import type { Difficulty } from "../contexts/Difficulty"
import { usePageTransition } from "../hooks/PageTransition"
import imgSrc from '../assets/beauty2.png';
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
            <h1 className="mainTitle">
              <div className="titleTop">
                <span className="charPink">ゴ</span>
                <span className="charPink">ミ</span>
                <span className="charGreen">分</span>
                <span className="charOrange">別</span>
              </div>
              <div className="titleBottom">
                <span className="charBlue">ゲーム！</span>
              </div>
            </h1>
          </div>
          <div className="subTitleRibbon">
            <span>きれいな未来のために、正しく分けよう！</span>
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
      </div>

      {/* 木の看板 (左下) */}
      <div className="woodenSignboard">
        <p>ルールをまもって</p>
        <p>だいせつな地球を守ろう！</p>
      </div>
    </div>
  )
}
