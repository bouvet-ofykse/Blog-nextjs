import {getPost} from "@/lib/posts";
import markdownit from 'markdown-it';
import {notFound} from "next/navigation";


export default async function BlogPost({params}: { params: { slug: string } }) {

    const { slug } = params;
    const post = getPost(slug)

    if (!post) {
        notFound();
    }

    const md = markdownit();
    const convertedContent = md.render(post.content);

    return (
        <article>
            <h1 className='text-5xl mb-2'>{post.title}</h1>
            <p className='italic mb-5'>{post.date} by {post.author}</p>
            <div className='article-content' dangerouslySetInnerHTML={{__html: convertedContent}}></div>
        </article>
    );
}