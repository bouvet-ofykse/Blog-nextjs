import Link from 'next/link';
import Image from 'next/image';
import {getAllRecipes} from '@/lib/recipes';
import styles from './page.module.css';

export const metadata = {
    title: 'Oppskrifter | Olav Fykse',
    description: 'En samling enkle oppskrifter og gode ting fra kjøkkenet.',
};

export default function RecipesPage() {
    const recipes = getAllRecipes();

    return (
        <main className={styles.page}>
            <header className={styles.intro}>
                <p className={styles.eyebrow}>Fra kjøkkenet</p>
                <h1>Oppskrifter</h1>
                <p className={styles.description}>
                    En samling gode ting å lage – Oppskrifter jeg har laget, eller andres som jeg har modifisert.
                </p>
            </header>

            {recipes.length > 0 ? (
                <section className={styles.grid} aria-label="Alle oppskrifter">
                    {recipes.map((recipe) => (
                        <Link
                            key={recipe.slug}
                            href={`/recipes/${recipe.slug}`}
                            className={styles.card}
                        >
                            <span className={styles.artwork} aria-hidden="true">
                                {recipe.image ? (
                                    <Image
                                        src={recipe.image}
                                        alt=""
                                        fill
                                        sizes="(max-width: 700px) 100vw, 33vw"
                                        className={styles.coverImage}
                                    />
                                ) : (
                                    <span className={styles.artworkIcon}>✳</span>
                                )}
                                <span className={styles.artworkLabel}>{recipe.category}</span>
                            </span>
                            <span className={styles.cardBody}>
                                <span className={styles.meta}>
                                    {recipe.time} <span aria-hidden="true">·</span> {recipe.difficulty}
                                </span>
                                <span className={styles.cardTitle}>{recipe.title}</span>
                                <span className={styles.cardDescription}>{recipe.description}</span>
                                <span className={styles.cardFooter}>
                                    {recipe.servings}
                                </span>
                            </span>
                        </Link>
                    ))}
                </section>
            ) : (
                <p className={styles.empty}>Her kommer det snart noen gode oppskrifter.</p>
            )}
        </main>
    );
}
