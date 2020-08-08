import { PostData } from "./post-data";
import { markdownToHtml } from "./markdown-to-html";
const fs = require('fs');

export const getPostMetadata = async (): Promise<PostData[]> => {
    const rawData = fs.readFileSync("_posts/metadata.json", 'utf-8');
    return JSON.parse(rawData.toString())["posts"];
};

export const getPost = async (id: string): Promise<PostData> => {
    const rawData = fs.readFileSync("_posts/metadata.json", 'utf-8');
    const postDataList: PostData[] = JSON.parse(rawData.toString())["posts"];
    const post: PostData | undefined = postDataList.find((post) => post.id === id);

    if (post === undefined) {
        throw new Error(`Post with id=${id} does not exist`);
    }

    const rawMarkdown: string = fs.readFileSync("_posts/" + post.contentPath, 'utf-8');
    post.content = await markdownToHtml(rawMarkdown);

    return post;
};