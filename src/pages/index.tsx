import * as React from "react";
import { PostData } from "../lib/post-data";
import { getPostMetadata } from "../lib/post-loader";
import { transformLink } from "../lib/transform-link";

interface Properties {
    posts: PostData[];
}

export default class HomePage extends React.Component<Properties, {}> {

    constructor(props: Properties) {
        super(props);
    }

    private createPostLinks = () => {
        const sortedPostDataList = this.props.posts.sort((postA: PostData, postB: PostData) => {
            return Date.parse(postB.dateTime) - Date.parse(postA.dateTime);
        });

        const postLinks: React.ReactElement[] = [];
        sortedPostDataList.forEach((post: PostData) => {
            postLinks.push(<div key={post.id} className={`${post.id}`}>
                <a href={transformLink(`/posts/${post.id}`)}>
                    <h4 className="text-xl text-teal-500 hover:bg-teal-100 hover:text-teal-700 mb-4">
                        {post.title}
                    </h4>
                </a>
            </div>)
        });
        return postLinks;
    }

    render() {
        return <div className="container mx-auto mt-12">
            <h1 className="text-6xl mb-12">Hello, Nextjs!</h1>
            { this.createPostLinks() }
        </div>
    }
}

export async function getStaticProps(context: any) {
    const posts: PostData[] = await getPostMetadata();
    return {
        props: {
            posts: posts,
        }
    }
}