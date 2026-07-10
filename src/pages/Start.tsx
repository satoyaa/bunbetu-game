import { useState } from "react"
import { useDifficulty } from "../contexts/Difficulty"
import { usePageTransition } from "../hooks/PageTransition"
import GameHowToPlay from "../components/overlays/GameHowToPlay"

export default function Start() {
  const { setDifficulty } = useDifficulty(); //難易度設定用関数 easy, normal, hardで管理．
  const { goToGame, goToLearn } = usePageTransition() //ページ遷移関数を呼び出し
  const [showHowToPlay, setShowHowToPlay] = useState(false)

  const goToHowToPlay = () => {
    setShowHowToPlay(true)
  }

  const closeHowToPlay = () => {
    setShowHowToPlay(false)
  }

  return (
    <section>
      <h1>これはStartページです</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            goToGame()
          }}>
          Gameページへ
        </button>
      </div>
      <div>
        <button type="button" onClick={goToLearn}>
          Learnページへ
        </button>
      </div>
      <div>
        <button type="button" onClick={goToHowToPlay}>
          使い方
        </button>
      </div>
      {showHowToPlay ? <GameHowToPlay onStart={closeHowToPlay} /> : null}
    </section>
  )
}
