
export type Post = {
    title : string;
    date : string;
    author : string;
    slug: string;
    featured: boolean;
    draft: boolean;
    tags?: string[];
    description?: string;
    content: string;

}