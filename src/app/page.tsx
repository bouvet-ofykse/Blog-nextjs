import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.home}>
            <section className={styles.hero} aria-labelledby="intro-title">
                <p className={styles.eyebrow}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    Litt kode, litt annet
                </p>
                <h1 id="intro-title">
                    Hei, jeg er Olav.
                    <span className={styles.headlineAccent}>Dette er mitt lille hjørne av internett.</span>
                </h1>
                <p className={styles.intro}>
                    Her samler jeg ting jeg lager, lærer og har lyst til å huske.
                    Det blir litt kode, noen småprosjekter og litt oppskrifter på mat jeg har laget.
                </p>
                <div className={styles.actions}>
                    <Link href="/blog" className={styles.primaryAction}>
                        Les bloggen
                    </Link>
                    <a
                        href="https://github.com/bouvet-ofykse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondaryAction}
                    >
                        Kikk på koden
                    </a>
                </div>
            </section>

            <section className={styles.projects} aria-labelledby="projects-title">
                <div className={styles.sectionHeading}>
                    <div>
                        <p className={styles.sectionLabel}>Utvalgte commits</p>
                        <h2 id="projects-title">Små prosjekter, store ambisjoner</h2>
                    </div>
                    <span className={styles.sectionNote}>Bygget med vilje. For det meste.</span>
                </div>
                <div className={styles.projectGrid}>
                    <Link href="/blog" className={styles.projectCard}>
                        <span className={styles.projectNumber}>01 / BLOGG</span>
                        <span className={styles.projectTitle}>Blogg: tankene er deployet</span>
                        <span className={styles.projectDescription}>
                            Notater, ideer og lærdommer — uten krav om at alt skal være production-ready.
                        </span>
                    </Link>
                    <Link href="/memory-game" className={styles.projectCard}>
                        <span className={styles.projectNumber}>02 / LEK</span>
                        <span className={styles.projectTitle}>Emoji-Memory: Et teit lite tidsfordriv</span>
                        <span className={styles.projectDescription}>
                            Enkel implementasjon av Memory. Laget for å lære React, emojier fordi jeg ikke kan tegne.
                        </span>
                    </Link>
                    <Link href="/recipes" className={styles.projectCard}>
                        <span className={styles.projectNumber}>03 / Mat</span>
                        <span className={styles.projectTitle}>Oppskrifter: En samling retter jeg har laget</span>
                        <span className={styles.projectDescription}>
                            Et forsøk på å huske ting jeg har laget
                        </span>
                    </Link>

                </div>
            </section>
        </main>
    );
}
