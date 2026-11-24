import Game from "@/components/games/bug-invaders/game";
import styles from "./page.module.css";

export const metadata = {
    title: "Bug Invaders | ofykse.no",
    description: "Defend your application against invading bugs.",
};

export default function BugInvadersPage() {
    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <p className={styles.eyebrow}>Spill / Arcade</p>
                <h1>Bug Invaders</h1>
                <p className={styles.intro}>
                    Applikasjonen din er under angrep. Hvor lenge klarer du å holde feilene unna?
                </p>
            </header>

            <div className={styles.gamePanel}>
                <Game />
            </div>
        </main>
    );
}