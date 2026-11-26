"use client";

import { useEffect, useState } from "react";

import GameCanvas from "./game-canvas";
import GameOverlay from "./game-overlay";
import styles from "./game.module.css";

import {
    getHighScore,
    saveHighScore,
} from "@/lib/games/bug-invaders/storage";

type GameState = "menu" | "playing" | "paused" | "gameover";

export default function Game() {
    const [state, setState] = useState<GameState>("menu");

    const [canvasKey, setCanvasKey] = useState(0);
    const [score, setScore] = useState(0);
    const [wave, setWave] = useState(1);
    const [highScore, setHighScore] = useState(0);
    const [isNewHighScore, setIsNewHighScore] = useState(false);

    useEffect(() => {
        setHighScore(getHighScore());
    }, []);

    const startGame = () => {
        setCanvasKey((current) => current + 1);
        setScore(0);
        setWave(1);
        setIsNewHighScore(false);
        setState("playing");
    };

    const handleGameOver = (finalScore: number, finalWave: number) => {
        const previousHighScore = getHighScore();
        const updatedHighScore = saveHighScore(finalScore);

        setScore(finalScore);
        setWave(finalWave);
        setHighScore(updatedHighScore);
        setIsNewHighScore(finalScore > previousHighScore);
        setState("gameover");
    };

    const pauseGame = () => setState("paused");
    const resumeGame = () => setState("playing");

    const returnToMenu = () => {
        setCanvasKey((current) => current + 1);
        setIsNewHighScore(false);
        setState("menu");
    };

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
                <GameCanvas
                    key={canvasKey}
                    active={state === "playing"}
                    onGameOver={handleGameOver}
                />

                <GameOverlay
                    state={state}
                    score={score}
                    highScore={highScore}
                    wave={wave}
                    isNewHighScore={isNewHighScore}
                    onStart={startGame}
                    onResume={resumeGame}
                    onRestart={startGame}
                    onMenu={returnToMenu}
                />
            </div>

            <div className={styles.gameFooter}>
                <span>BUILD: 0.1.0</span>
                <div className={styles.highScore}>
                    <span>HIGH SCORE:</span>
                    <strong>{highScore.toLocaleString("en-US")}</strong>
                </div>
            </div>
        </section>
    );
}