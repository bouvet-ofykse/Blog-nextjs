"use client";

interface GameOverlayProps {
    state: "menu" | "playing" | "paused";
    onStart: () => void;
    onResume: () => void;
}

export default function GameOverlay({
                                        state,
                                        onStart,
                                        onResume,
                                    }: GameOverlayProps) {
    if (state === "playing") return null;

    return (
        <div className="gameOverlay">
            <div className="gameOverlayContent">
                <div className="gameEyebrow">
                    SYSTEM STATUS: {state === "menu" ? "READY" : "PAUSED"}
                </div>

                <h1>
                    {state === "menu" ? "BUG INVADERS" : "PAUSED"}
                </h1>

                <p>
                    {state === "menu"
                        ? "Your application is under attack."
                        : "Take a break. The bugs can wait."}
                </p>

                <button
                    className="gameButton"
                    onClick={state === "menu" ? onStart : onResume}
                >
                    {state === "menu" ? "START GAME" : "RESUME"}
                </button>

                {state === "menu" && (
                    <div className="gameInstructions">
                        <span>← → / A D</span>
                        <span>MOVE</span>
                        <span>SPACE</span>
                        <span>SHOOT</span>
                    </div>
                )}
            </div>
        </div>
    );
}