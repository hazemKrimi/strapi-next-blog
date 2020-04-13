import React from 'react'
import Head from 'next/head'
import MainNav from '../components/nav'
import { Jumbotron, Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap'

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            content: "",
            image: ""
        }
    }

    componentDidMount = async() => {
        let res = await fetch("http://localhost:1337/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                    {
                        post(id: "${new URL(window.location).searchParams.get("id").toString()}") {
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
        this.setState({ id: res.data.post.id, title: res.data.post.title, content: res.data.post.content, image: res.data.post.image });
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
                    <Card key={this.state.id} className="mt-2">
                        <CardBody>
                            <CardTitle>
                                <h2>{this.state.title}</h2>
                            </CardTitle>
                            { this.state.image && 
                                <div className="my-3">
                                    <CardImg src={`http://localhost:1337${this.state.image.url}`}/>
                                </div>
                            }
                            <CardText>{this.state.content}</CardText>
                        </CardBody>
                    </Card>
                </Jumbotron>
            </div>
        );
    }
}

export default Post
