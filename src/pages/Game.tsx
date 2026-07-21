import GameController from "../components/GameController"
import { usePageTransition } from "../hooks/PageTransition"

export default function Game() {
  const { goToStart, goToLearn } = usePageTransition()

  return (
    <section>
      <div>
        <button type="button" onClick={goToStart}>
          スタートページへ
        </button>
        <button type="button" onClick={goToLearn}>
          Learnページへ
        </button>
      </div>
      <GameController></GameController>
    </section>
  )
}
