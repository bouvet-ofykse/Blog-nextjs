import {getAllposts} from "@/lib/posts";
import Link from "next/link";


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
                        <Link href={`/blog/${post.slug}`} >
                            <span>{post.title}</span><span>{post.date}</span>
                        </Link>

                    </li>)
                })}
            </ul>


        </>
    );
}