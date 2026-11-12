import {getAllposts} from "@/lib/posts";
import Link from "next/link";
import styles from './page.module.css';


export default function BlogPosts() {

    const posts = getAllposts()
    const postsSorted = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <p className={styles.eyebrow}>Fra tastaturet</p>
                <h1>Blogg</h1>
                <p className={styles.intro}>Notater, erfaringer og ting jeg har lært underveis.</p>
            </header>

            <ul className={styles.posts}>
                {postsSorted.map(post => {
                    return (
                        <li key={post.slug} className={styles.row}>
                            <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                                <span className={styles.artwork} aria-hidden="true">
                                    <span className={styles.artworkIcon}>{'{ }'}</span>
                                </span>
                                <div className={styles.cardBody}>
                                    <span className={styles.date}>
                                        <time dateTime={post.date}>
                                            {new Date(post.date).toLocaleDateString('nb-NO', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </time>
                                        {' · '}{post.author}
                                    </span>
                                    <h2 className={styles.title}>
                                        {post.title}
                                    </h2>
                                    {post.description && (
                                        <p className={styles.description}>{post.description}</p>
                                    )}
                                    {post.tags && post.tags.length > 0 &&
                                        <span className={styles.tags}>
                                            {post.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                                        </span>
                                    }
                                </div>
                            </Link>

                        </li>);
                })}
            </ul>
        </main>
    );
}