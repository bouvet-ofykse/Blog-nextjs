import {notFound} from 'next/navigation';
import markdownit from 'markdown-it';
import {getPost} from '@/lib/posts';

export default async function BlogPost({ params, }: { params: Promise<{ slug: string }>;}) {
    const { slug } = await params;

    console.log('slug', slug);

    const post = getPost(slug);
    if (!post) notFound();

    const md = markdownit();
    const convertedContent = md.render(post.content);

    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.date} by {post.author}</p>
            <div dangerouslySetInnerHTML={{__html: convertedContent}}/>
        </article>
    );
};