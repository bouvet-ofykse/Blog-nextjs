"use client";

import { useEffect, useState } from "react";
import styles from "./game.module.css";

interface GameOverlayProps {
    state: "menu" | "playing" | "paused" | "gameover";
    score: number;
    highScore: number;
    wave: number;
    isNewHighScore: boolean;
    onStart: () => void;
    onResume: () => void;
    onRestart: () => void;
    onMenu: () => void;
}

export default function GameOverlay({
                                        state,
                                        score,
                                        highScore,
                                        wave,
                                        isNewHighScore,
                                        onStart,
                                        onResume,
                                        onRestart,
                                        onMenu,
                                    }: GameOverlayProps) {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice(
            navigator.maxTouchPoints > 0 ||
            "ontouchstart" in window
        );
    }, []);

    if (state === "playing") return null;

    const isGameOver = state === "gameover";
    const isMenu = state === "menu";

    const formatScore = (value: number) =>
        value.toLocaleString("en-US");

    return (
        <div className={styles.gameOverlay}>
            <div className={styles.gameOverlayContent}>
                {isGameOver ? (
                    <>
                        <div className={styles.gameEyebrow}>
                            SYSTEM STATUS: TERMINATED
                        </div>

                        <h1 className={styles.gameTitle}>GAME OVER</h1>

                        <p className={styles.gameDescription}>
                            Your application has been overrun.
                        </p>


                        {isNewHighScore && (
                            <div
                                className={styles.newHighScoreBanner}
                                role="status"
                            >
                                <span className={styles.celebrationStar}>✦</span>

                                <div className={styles.celebrationText}>
                                    <strong>NEW HIGH SCORE!</strong>
                                    <span>YOU'VE BEATEN YOUR PERSONAL BEST</span>
                                </div>

                                <span className={styles.celebrationStar}>✦</span>
                            </div>
                        )}

                        <div className={styles.gameResults}>
                            <div className={styles.gameResult}>
                                <span>SCORE</span>
                                <strong>
                                    {formatScore(score)}
                                </strong>
                            </div>

                            <div className={`${styles.gameResult} ${
                                isNewHighScore ? styles.recordResult : ""
                            }`}>
                                <span>HIGH SCORE</span>
                                <strong>
                                    {formatScore(highScore)}
                                </strong>
                            </div>
                        </div>

                        <div className={styles.gameWaveResult}>
                            WAVE REACHED: {wave}
                        </div>

                        <div className={styles.gameActions}>
                            <button
                                className={styles.gameButton}
                                onClick={onRestart}
                            >
                                PLAY AGAIN
                            </button>

                            <button
                                className={styles.secondaryButton}
                                onClick={onMenu}
                            >
                                BACK TO MENU
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.gameEyebrow}>
                            SYSTEM STATUS: {isMenu ? "READY" : "PAUSED"}
                        </div>

                        <h1 className={styles.gameTitle}>
                            {isMenu ? "BUG INVADERS" : "PAUSED"}
                        </h1>

                        <p className={styles.gameDescription}>
                            {isMenu
                                ? "Your application is under attack."
                                : "Take a break. The bugs can wait."}
                        </p>

                        <button
                            className={styles.gameButton}
                            onClick={isMenu ? onStart : onResume}
                        >
                            {isMenu ? "START GAME" : "RESUME"}
                        </button>

                        {isMenu && (
                            <div className={styles.gameInstructions}>
                                {isTouchDevice ? (
                                    <>
                                        <span>DRAG</span>
                                        <span>TO MOVE</span>
                                        <span>AUTO FIRE</span>
                                    </>
                                ) : (
                                    <>
                                        <span>← → / A D</span>
                                        <span>MOVE</span>
                                        <span>SPACE</span>
                                        <span>SHOOT</span>
                                    </>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}