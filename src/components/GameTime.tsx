type GameTimeProps = {
    timeLeft: number;
};

const GameTime = ({ timeLeft }: GameTimeProps) => {
    return (
        <div style={{ position: "fixed", top: 0, left: "20%", transform: "translateX(-50%)" }}>
            残り時間: {timeLeft}秒
        </div>
    );
};

export default GameTime;
