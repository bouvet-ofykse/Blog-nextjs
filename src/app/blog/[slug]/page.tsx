import {getPost} from "@/lib/posts";
import markdownit from 'markdown-it';
import {notFound} from "next/navigation";


export default async function BlogPost(props: { params: Promise<{ slug: string[] }> }) {

    const { slug } = await props.params;
    const post = getPost(slug[0]);

    if (!post) {
        notFound();
    }

    const md = markdownit();
    const convertedContent = md.render(post.content);

    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.date} by {post.author}</p>
            <div className='article-content' dangerouslySetInnerHTML={{__html: convertedContent}}></div>
        </article>
    );
}