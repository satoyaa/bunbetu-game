import { useNavigate } from "react-router-dom"

export const usePageTransition = () => {
  const navigate = useNavigate()

  const goToStart = () => navigate("/")
  const goToGame = () => navigate("/game")
  const goToLearn = () => navigate("/learn")

  return { goToStart, goToGame, goToLearn }
}
