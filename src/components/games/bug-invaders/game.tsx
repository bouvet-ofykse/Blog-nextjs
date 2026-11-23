"use client";

import { useState } from "react";

import GameCanvas from "./game-canvas";
import GameOverlay from "./game-overlay";
import styles from "./game.module.css";

export default function Game() {
    const [state, setState] = useState<
        "menu" | "playing" | "paused"
    >("menu");

    const startGame = () => setState("playing");
    const pauseGame = () => setState("paused");
    const resumeGame = () => setState("playing");

    return (
        <section className={styles.gameContainer}>
            <div className={styles.gameHeader}>
                <div>
                    <span className={styles.statusDot} />
                    ARCADE / BUG INVADERS
                </div>

                {state === "playing" && (
                    <button
                        className={styles.pauseButton}
                        onClick={pauseGame}
                    >
                        PAUSE
                    </button>
                )}
            </div>

            <div className={styles.gameFrame}>
                <GameCanvas active={state === "playing"} />

                <GameOverlay
                    state={state}
                    onStart={startGame}
                    onResume={resumeGame}
                />
            </div>

            <div className={styles.gameFooter}>
                <span>BUILD: 0.1.0</span>
                <span>STATUS: {state.toUpperCase()}</span>
                <span>NO BUGS ALLOWED</span>
            </div>
        </section>
    );
}