import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection("blog");
    const publishedPosts = posts.filter(post => !post.data.draft);

    return rss({
        title: 'Justin S. | Blog',
        description: 'Mes Articles',
        site: context.site,
        items: publishedPosts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/posts/${post.id}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}