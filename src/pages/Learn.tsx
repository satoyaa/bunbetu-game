import { usePageTransition } from "../hooks/PageTransition"

export default function Learn() {
  const { goToStart, goToGame } = usePageTransition()

  return (
    <section>
      <h1>これはLearnページです</h1>
      <div>
        <button type="button" onClick={goToStart}>
          スタートページへ
        </button>
        <button type="button" onClick={goToGame}>
          Gameページへ
        </button>
      </div>
    </section>
  )
}
