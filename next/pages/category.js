import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import MainNav from '../components/nav'
import { Jumbotron, Card, CardBody, CardImg, CardTitle } from 'reactstrap'

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount = async () => {
        let res = await fetch("http://localhost:1337/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                    {
                        posts(sort: "createdAt:desc", where: {category: {name: "${new URL(window.location).searchParams.get("name").toString()}"}}) {
                            id
                            title
                            content
                            image {
                                url
                            }
                        }
                    }
                `
            })
        });
        res = await res.json();
        this.setState({ posts: res.data.posts });
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Blog</title>
                    <link rel='icon' href='/favicon.ico' />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
                </Head>
                <MainNav />
                <Jumbotron className="m-4">
                    {
                        this.state.posts.map(post => {
                            return (
                                <Card key={post.id} className="mt-2">
                                    <CardBody>
                                        {post.image &&
                                            <div className="my-3">
                                                <CardImg src={`http://localhost:1337${post.image.url}`} />
                                            </div>
                                        }
                                        <CardTitle>
                                            <Link href={`/post?id=${post.id}`}>
                                                <h2 style={{ cursor: "pointer", display: "inline-block" }}>{post.title}</h2>
                                            </Link>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            );
                        })
                    }
                </Jumbotron>
            </div>
        );
    }
}

export default Categories
