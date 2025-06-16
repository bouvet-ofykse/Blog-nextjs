import {getAllposts} from "@/lib/posts";
import Link from "next/link";
import styles from './page.module.css';


export default function BlogPosts() {

    const posts = getAllposts()
    const postsSorted = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <>
            <h1>
                Blog
            </h1>

            <ul>
                {postsSorted.map(post => {
                    return (
                        <li key={post.slug} className={styles.row}>
                            <Link href={`/blog/${post.slug}`}>
                                <span className={styles.title}>{post.title}</span>
                            </Link>
                            <span className={styles.date}>{new Date(post.date).toLocaleDateString()} by {post.author}</span>
                            {post.tags && post.tags.length > 0 &&
                                <span className={styles.tags}>
                                    {post.tags.join(', ')}
                                </span>
                            }

                        </li>);
                })}
            </ul>
        </>
    );
}