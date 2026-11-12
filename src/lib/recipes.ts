import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type {Recipe} from '@/types/recipe.type';

const recipesDir = path.join(process.cwd(), 'src', 'recipes');

function readRecipe(fileName: string): Recipe {
    const filePath = path.join(recipesDir, fileName);
    const {content, data} = matter(fs.readFileSync(filePath, 'utf8'));

    const requiredString = (key: string): string => {
        const value: unknown = data[key];
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error(`Recipe "${fileName}" must define a non-empty "${key}".`);
        }
        return value;
    };

    const tags = data.tags ?? [];
    if (!Array.isArray(tags) || !tags.every((tag: unknown) => typeof tag === 'string')) {
        throw new Error(`Recipe "${fileName}" must define "tags" as a list of strings.`);
    }

    if (data.image !== undefined) {
        if (typeof data.image !== 'string' || !data.image.startsWith('/recipes/images/') || data.image.includes('..')) {
            throw new Error(`Recipe "${fileName}" image must use a path under "/recipes/images/".`);
        }

        const imagePath = path.join(process.cwd(), 'public', data.image.slice(1));
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Recipe "${fileName}" image was not found at "public${data.image}".`);
        }
    }

    if (data.draft !== undefined && typeof data.draft !== 'boolean') {
        throw new Error(`Recipe "${fileName}" must define "draft" as true or false.`);
    }

    return {
        slug: fileName.replace(/\.md$/, ''),
        title: requiredString('title'),
        description: requiredString('description'),
        date: requiredString('date'),
        category: requiredString('category'),
        prepTime: requiredString('prepTime'),
        cookTime: requiredString('cookTime'),
        servings: requiredString('servings'),
        difficulty: requiredString('difficulty'),
        tags,
        image: data.image,
        draft: data.draft ?? false,
        content,
    };
}

export function getRecipe(slug: string): Recipe | null {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        return null;
    }

    const fileName = `${slug}.md`;
    if (!fs.existsSync(path.join(recipesDir, fileName))) {
        return null;
    }

    const recipe = readRecipe(fileName);
    return recipe.draft ? null : recipe;
}

export function getAllRecipes(): Recipe[] {
    return fs.readdirSync(recipesDir)
        .filter((fileName) => fileName.endsWith('.md'))
        .map(readRecipe)
        .filter((recipe) => !recipe.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
