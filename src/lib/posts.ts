import path from "node:path";
import fs from "fs";
import matter from "gray-matter";
import {Post} from '@/types/post.type';

const postsDir = path.join(process.cwd(), 'src/posts');

export const getPost = (slug: string): Post | null => {
    const fileNames = fs.readdirSync(postsDir);

    const post = fileNames.find((fileName) => fileName === `${slug}.md`);

    if (!post) {
        return null;
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

        const slug = fileName.replace(/\.md$/, ''); // TODO: get slug from the content of the file, not from the file name
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