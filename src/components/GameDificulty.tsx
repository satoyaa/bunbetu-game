

type GameDificultyProps = {
    difficulty: string
}

const GameDificulty = ({difficulty}:GameDificultyProps) =>{

    return(
        <div style={{position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)"}}>
        難易度: {difficulty}
        </div>
    )
}

export default GameDificulty;
