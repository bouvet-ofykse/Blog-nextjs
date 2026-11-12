import Link from 'next/link';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import markdownit from 'markdown-it';
import {getRecipe} from '@/lib/recipes';
import styles from './page.module.css';

export default async function RecipePage({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params;
    const recipe = getRecipe(slug);
    if (!recipe) notFound();

    const markdown = markdownit();

    return (
        <main className={styles.page}>
            <Link href="/recipes" className={styles.backLink}>← Alle oppskrifter</Link>
            <article>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>{recipe.category}</p>
                    <h1>{recipe.title}</h1>
                    <p className={styles.description}>{recipe.description}</p>
                    {recipe.image && (
                        <div className={styles.cover}>
                            <Image src={recipe.image} alt="" fill sizes="(max-width: 780px) 100vw, 780px" />
                        </div>
                    )}
                    <div className={styles.facts} aria-label="Oppskriftsdetaljer">
                        <div className={styles.fact}>
                            <span className={styles.factLabel}>Forberedelse</span>
                            <span>{recipe.prepTime}</span>
                        </div>
                        <div className={styles.fact}>
                            <span className={styles.factLabel}>Koketid</span>
                            <span>{recipe.cookTime}</span>
                        </div>
                        <div className={styles.fact}>
                            <span className={styles.factLabel}>Mengde</span>
                            <span>{recipe.servings}</span>
                        </div>
                        <div className={styles.fact}>
                            <span className={styles.factLabel}>Nivå</span>
                            <span>{recipe.difficulty}</span>
                        </div>
                    </div>

                </header>

                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{__html: markdown.render(recipe.content)}}
                />

                {recipe.tags.length > 0 && (
                    <ul className={styles.tags} aria-label="Emneord">
                        {recipe.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                )}
            </article>
        </main>
    );
}
