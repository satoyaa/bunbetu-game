

type GameHealthProps = {
    health: number
    maxHealth: number
}

const GameHealth = ({health, maxHealth}:GameHealthProps) =>{

    return(
        <div style={{position: "fixed", top: 0, right: 0}}>
        {"💛".repeat(health)}{"🖤".repeat(maxHealth - health)}
        </div>
    )
}

export default GameHealth;