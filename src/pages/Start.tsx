import { useState } from "react"
import { useDifficulty } from "../contexts/Difficulty"
import type { Difficulty } from "../contexts/Difficulty"
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

  //難易度ボタン押下時 ①難易度を設定 ②Gameページへ遷移 (トラック走行演出は後で実装)
  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setDifficulty(difficulty)
    goToGame()
  }

  return (
    <section>
      <h1>スタート画面</h1>
      <h2>ごみ分別ゲーム</h2>
      <div>
        <button type="button" onClick={() => handleSelectDifficulty("easy")}>
          やさしい
        </button>
      </div>
      <div>
        <button type="button" onClick={() => handleSelectDifficulty("normal")}>
          ふつう
        </button>
      </div>
      <div>
        <button type="button" onClick={() => handleSelectDifficulty("hard")}>
          むずかしい
        </button>
      </div>
      <div>
        <button type="button" onClick={goToLearn}>
          ごみ問題をまなぶ
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
