
type GameEndOverlaysProps = {
    feedBackItem?: string
    controlBackground: string
}

const GameEndOverlay = ({feedBackItem, controlBackground}:GameEndOverlaysProps) =>{

    return(
        <>
        これは終了後画面です．
        {feedBackItem}
        </>
    )
}

export default GameEndOverlay;