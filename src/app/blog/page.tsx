import {getAllposts} from "@/lib/posts";
import Link from "next/link";


export default function BlogPosts() {

    const posts = getAllposts()

    console.log(posts);
    return (
        <>
            <h1 className='text-3xl mb-3'>
                Blog
            </h1>

            <ul>
                {posts.map(post => {
                    return (<li key={post.slug} className='flex flex-col w-100'>
                        <Link href={`/blog/${post.slug}`} className='flex justify-between' >
                            <span className='hover:underline text-xl'>{post.title}</span><span className='italic justify-end'>{post.date}</span>
                        </Link>

                    </li>)
                })}
            </ul>


        </>
    );
}