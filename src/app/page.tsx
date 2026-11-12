import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.home}>
            <section className={styles.hero} aria-labelledby="intro-title">
                <p className={styles.eyebrow}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    Utvikler · kaffe i cache
                </p>
                <h1 id="intro-title">
                    Hei, jeg er Olav.
                    <span className={styles.headlineAccent}>Jeg får ting til å klikke.</span>
                </h1>
                <p className={styles.intro}>
                    Helst med vilje. Her finner du prosjekter, små eksperimenter og ting jeg har lært
                    underveis. Når noe ikke virker, kaller jeg det debugging — det høres i det minste
                    planlagt ut.
                </p>
                <div className={styles.actions}>
                    <Link href="/blog" className={styles.primaryAction}>
                        Se hva som kompilerer <span aria-hidden="true">↗</span>
                    </Link>
                    <a
                        href="https://github.com/bouvet-ofykse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondaryAction}
                    >
                        Kikk i kodekjelleren
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
                        <span className={styles.projectArrow} aria-hidden="true">↗</span>
                    </Link>
                    <Link href="/memory-game" className={styles.projectCard}>
                        <span className={styles.projectNumber}>02 / LEK</span>
                        <span className={styles.projectTitle}>Emoji-Memory: Et teit lite tidsfordriv</span>
                        <span className={styles.projectDescription}>
                            Enkel implementasjon av Memory. Laget for å lære React, emojier fordi jeg ikke kan tegne.
                        </span>
                        <span className={styles.projectArrow} aria-hidden="true">↗</span>
                    </Link>
                    <Link href="/recipes" className={styles.projectCard}>
                        <span className={styles.projectNumber}>03 / Mat</span>
                        <span className={styles.projectTitle}>Oppskrifter: En samling retter jeg har laget</span>
                        <span className={styles.projectDescription}>
                            Et forsøk på å huske ting jeg har laget
                        </span>
                        <span className={styles.projectArrow} aria-hidden="true">↗</span>
                    </Link>

                </div>
            </section>
        </main>
    );
}
