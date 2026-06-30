import { useDifficulty } from "../contexts/Difficulty"
import { usePageTransition } from "../hooks/PageTransition"

export default function Start() {
  const { setDifficulty } = useDifficulty(); //難易度設定用関数 easy, normal, hardで管理．
  const { goToGame, goToLearn } = usePageTransition() //ページ遷移関数を呼び出し

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
    </section>
  )
}
