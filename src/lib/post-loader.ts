import { PostData } from "./post-data";
const fs = require('fs');

export const getPostMetadata = async (): Promise<PostData[]> => {
    const rawData = fs.readFileSync("_posts/metadata.json", 'utf-8');
    return JSON.parse(rawData.toString())["posts"];
};