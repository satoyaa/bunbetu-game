import { createContext, ReactNode, useContext, useState } from "react"

export type Difficulty = "easy" | "normal" | "hard"

type DifficultyContextType = {
  difficulty: Difficulty
  setDifficulty: (difficulty: Difficulty) => void
}

const DifficultyContext = createContext<DifficultyContextType | undefined>(undefined)

export const DifficultyProvider = ({ children }: { children: ReactNode }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("normal")

  return (
    <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
      {children}
    </DifficultyContext.Provider>
  )
}

export const useDifficulty = () => {
  const context = useContext(DifficultyContext)
  if (!context) {
    throw new Error("useDifficulty must be used within a DifficultyProvider")
  }
  return context
}
