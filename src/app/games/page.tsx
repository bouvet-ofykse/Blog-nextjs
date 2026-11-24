import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
    title: "Spill | ofykse.no",
    description: "Små spill og tidsfordriv fra Olav Fykse.",
};

const games = [
    {
        title: "Emoji-Memory",
        description: "Finn parene og test hukommelsen i et lite spill med emojier.",
        href: "/memory-game",
        label: "Hukommelse",
        artwork: "🃏",
    },
    {
        title: "Bug Invaders",
        description: "Forsvar applikasjonen din mot en invasjon av bugs.",
        href: "/games/bug-invaders",
        label: "Arcade",
        artwork: "👾",
    },
];

export default function GamesPage() {
    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <p className={styles.eyebrow}>Litt lek</p>
                <h1>Spill</h1>
                <p className={styles.intro}>
                    Små spill og tidsfordriv. Velg et spill og ta en pause.
                </p>
            </header>

            <ul className={styles.games}>
                {games.map((game) => (
                    <li key={game.href} className={styles.item}>
                        <Link href={game.href} className={styles.card}>
                            <span className={styles.artwork} aria-hidden="true">{game.artwork}</span>
                            <div className={styles.cardBody}>
                                <span className={styles.label}>{game.label}</span>
                                <h2 className={styles.title}>{game.title}</h2>
                                <p className={styles.description}>{game.description}</p>
                                <span className={styles.action}>Spill nå <span aria-hidden="true">→</span></span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
