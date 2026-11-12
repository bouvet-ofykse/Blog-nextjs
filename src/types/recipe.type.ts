export type Recipe = {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    time: string;
    servings: string;
    difficulty: string;
    tags: string[];
    image?: string;
    draft: boolean;
    content: string;
};
