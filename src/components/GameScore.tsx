

type GameScoreProps = {
    score: number
}


const GameScore = ({score}:GameScoreProps) =>{

    return(
        <div style={{position: "fixed", top: 0, left: 0}}>
        スコア: {score}
        </div>
    )
}

export default GameScore;