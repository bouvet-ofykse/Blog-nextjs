import {notFound} from 'next/navigation';
import Link from 'next/link';
import markdownit from 'markdown-it';
import hljs from 'highlight.js/lib/common';
import {getPost} from '@/lib/posts';
import styles from './page.module.css';

export default async function BlogPost({ params, }: { params: Promise<{ slug: string }>;}) {
    const { slug } = await params;

    const post = getPost(slug);
    if (!post) notFound();

    const md = markdownit();
    md.renderer.rules.fence = (tokens, index) => {
        const token = tokens[index];
        const language = token.info.trim().split(/\s+/)[0];
        const code = language && hljs.getLanguage(language)
            ? hljs.highlight(token.content, {language}).value
            : md.utils.escapeHtml(token.content);
        const label = md.utils.escapeHtml(language || 'Kode');

        return `<div class="code-block"><div class="code-label">${label}</div><pre tabindex="0" aria-label="Kodeblokk: ${label}"><code>${code}</code></pre></div>`;
    };
    md.renderer.rules.table_open = () => '<div class="table-wrapper" role="region" aria-label="Tabell" tabindex="0"><table>';
    md.renderer.rules.table_close = () => '</table></div>';

    const convertedContent = md.render(post.content);

    return (
        <main className={styles.page}>
            <Link href="/blog" className={styles.backLink}>← Alle innlegg</Link>
            <article>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>Fra tastaturet</p>
                    <h1>{post.title}</h1>
                    <p className={styles.meta}>
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('nb-NO', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </time>
                        {' · '}{post.author}
                    </p>
                </header>
                <div className={styles.content} dangerouslySetInnerHTML={{__html: convertedContent}}/>
            </article>
        </main>
    );
};