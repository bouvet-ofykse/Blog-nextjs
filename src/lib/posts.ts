import path from "node:path";
import fs from "fs";
import matter from "gray-matter";
import {notFound} from "next/navigation";
import {Post} from '@/types/post.type';

const postsDir = path.join(process.cwd(), 'src/posts');

export const getPost = (slug: string): Post => {
    const fileNames = fs.readdirSync(postsDir);

    const post = fileNames.find((fileName) => fileName === `${slug}.md`);

    if (!post) {
        notFound();
    }

    const filePath = path.join(postsDir, post);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const {content, data} = matter(fileContent);

    return {
        title: data.title,
        date: data.date,
        author: data.author,
        slug,
        content,
        ...data
    };

}


export const getAllposts = () : Post[] => {
    const fileNames = fs.readdirSync(postsDir);
    return fileNames.filter(fileName => fileName.endsWith('.md')).map(fileName => {

        const slug = fileName.replace(/\.md$/, '');
        const filePath = path.join(postsDir, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        const {content, data} = matter(fileContent);

        return {
            title: data.title,
            date: data.date,
            author: data.author,
            slug,
            content,
            ...data
        };
    })
}