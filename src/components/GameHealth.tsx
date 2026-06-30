

type GameHealthProps = {
    health: number
}

const GameHealth = ({health}:GameHealthProps) =>{

    return(
        <>
        これは体力です．
        {health}
        </>
    )
}

export default GameHealth;