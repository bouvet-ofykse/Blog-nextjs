import React from 'react';
import styles from './win-modal.module.css';

export default function WinModal({ show, matches, turns, onRestart }: { show: boolean; matches: number; turns: number; onRestart: () => void }) {
    if (!show) return null;

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <h2 className={styles.title}>You won 🎉</h2>
                <p className={styles.score}>Matches: <strong>{matches}</strong></p>
                <p className={styles.score}>Turns: <strong>{turns}</strong></p>
                <button className={styles.button} onClick={onRestart}>Play Again</button>
            </div>
        </div>
    );
}