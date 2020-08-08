const unified = require('unified');
const remarkParse = require('remark-parse');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify')

export async function markdownToHtml(markdown: string): Promise<string> {
    const result = await unified()
        .use(remarkParse)
        .use(remark2rehype)
        .use(html)
        .process(markdown);
    return (result.contents as string);
}