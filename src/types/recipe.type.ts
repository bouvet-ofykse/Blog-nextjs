export type Recipe = {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    difficulty: string;
    tags: string[];
    image?: string;
    draft: boolean;
    content: string;
};
