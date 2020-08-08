import * as React from "react";
import { PostData } from "../../lib/post-data";
import { GetStaticProps } from 'next'
import { GetStaticPaths } from 'next'
import { getPost, getPostMetadata } from "../../lib/post-loader";

interface Properties {
    post?: PostData
}

export default class Post extends React.Component<Properties, {}> {

    constructor(props: Properties) {
        super(props);
    }

    render() {
        return <div className={`${this.props.post.id}`}>
            <h1>{this.props.post.title}</h1>
            <h3>{this.props.post.subtitle}</h3>
            <p>{new Date(this.props.post.dateTime).toLocaleDateString("en-US")}</p>
            <div className="content markdown" dangerouslySetInnerHTML={{__html: this.props.post.content }} />
        </div>
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const post: PostData = await getPost(context.params.id as string);
    return {
        props: {
            post: post,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts: PostData[] = await getPostMetadata();
    return {
        paths: posts.map((post) => {
            return {
                params: {
                    id: post.id,
                }
            }
        }),
        fallback: false,
    }
}