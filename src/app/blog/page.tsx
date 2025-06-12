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
                    return (<li key={post.slug}>
                        <div className={styles.row}>
                            <Link href={`/blog/${post.slug}`}>
                                <span className={styles.title}>{post.title} ({post.date})</span>
                            </Link>
                        </div>

                    </li>);
                })}
            </ul>
        </>
    );
}