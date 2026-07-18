import { useDifficulty } from "../contexts/Difficulty"
import type { Difficulty } from "../contexts/Difficulty"
import { usePageTransition } from "../hooks/PageTransition"

export default function Start() {
  const { setDifficulty } = useDifficulty(); //難易度設定用関数 easy, normal, hardで管理．
  const { goToGame, goToLearn} = usePageTransition() //ページ遷移関数を呼び出し

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
    </section>
  )
}
