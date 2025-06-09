import {getAllposts} from "@/lib/posts";
import Link from "next/link";
import styles from './page.module.css';



export default function BlogPosts() {

    const posts = getAllposts()

    console.log(posts);
    return (
        <>
            <h1>
                Blog
            </h1>

            <ul>
                {posts.map(post => {
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