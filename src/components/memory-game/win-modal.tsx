import React from 'react';
import styles from './win-modal.module.css';

export default function WinModal({ show, matches, turns, onRestart }: { show: boolean; matches: number; turns: number; onRestart: () => void }) {
    if (!show) return null;

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Du vant! 🎉</h2>
                <p className={styles.score}>Par: <strong>{matches}</strong></p>
                <p className={styles.score}>Trekk: <strong>{turns}</strong></p>
                <button type="button" className={styles.button} onClick={onRestart}>Spill igjen</button>
            </div>
        </div>
    );
}