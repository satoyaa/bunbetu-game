

type GameScoreProps = {
    score: number
}


const GameScore = ({score}:GameScoreProps) =>{

    return(
        <>
        これは体力です．
        {score}
        </>
    )
}

export default GameScore;