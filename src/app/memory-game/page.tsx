import GameBoard from "@/components/memory-game/game-board";
import Link from "next/link";
import styles from "./page.module.css";

export default function MemoryGamePage() {
    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <Link href="/games" className={styles.backLink}>← Alle spill</Link>
                <p className={styles.eyebrow}>Spill / Hukommelse</p>
                <h1>Emoji-Memory</h1>
                <p className={styles.intro}>
                    Finn alle parene og se hvor få trekk du trenger.
                </p>
            </header>
            <div className={styles.gamePanel}>
                <GameBoard />
            </div>
        </main>
    );
}