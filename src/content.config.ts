// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        derniereModification: z.date().optional(),
        description: z.string(),
        author: z.string(),
        image: z.object({
            url: z.string(),
            alt: z.string(),
            source: z.string().optional(),
            credit: z.string().optional()
        }),
        tags: z.array(z.string()),
        IAGenerated: z.boolean().optional(),
        draft: z.boolean().optional()
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = { blog };