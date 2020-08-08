export const transformLink = (link: string) => {
    if (process.env.STAGE === 'dev') {
        return link;
    } else {
        return link + ".html";
    }
}