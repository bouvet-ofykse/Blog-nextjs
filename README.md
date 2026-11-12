This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Writing blog posts

Posts live in `src/posts` as Markdown files. The filename becomes the URL slug.
Set `title`, `date` (`YYYY-MM-DD`) and `author` in the YAML frontmatter.
Use `##` and lower for headings; the page already renders the title as an `h1`.

To show a cover image on the blog overview, add an optional `image` field to the
frontmatter, for example `image: '/blog/images/azure-foundry.png'`, and place the
file at `public/blog/images/azure-foundry.png`. Images fill the card's image area
and are cropped to fit. Posts without an image keep the default `{ }` artwork.

Use fenced code blocks with a language such as `csharp`, `typescript`, `json` or
`bash` for syntax highlighting. Unknown languages and blocks without a language
are displayed as plain text. Code blocks and tables scroll horizontally on small
screens.

````markdown
```csharp
Console.WriteLine("Hei!");
```

![Describe what the image shows](/images/blog/example.png)

> A quotation or note.

| Feature | Supported |
| --- | --- |
| Markdown tables | Yes |
````

For the image example, place the file at `public/images/blog/example.png`.
Images automatically scale to the article width while keeping their aspect ratio.
Use descriptive alt text for accessibility. Raw HTML is disabled in posts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
