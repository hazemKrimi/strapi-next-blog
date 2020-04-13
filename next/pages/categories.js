import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import MainNav from '../components/nav'
import { Jumbotron, Card, CardBody, CardTitle } from 'reactstrap'

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
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
                        categories {
                            id
                            name
                        }
                    }
                `
            })
        });
        res = await res.json();
        this.setState({ categories: res.data.categories });
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
                        this.state.categories.map(category => {
                            return (
                                <Card key={category.id} className="mt-2">
                                    <CardBody>
                                        <CardTitle>
                                            <Link href={`/category?name=${category.name}`}>
                                                <h2 style={{ cursor: "pointer", display: "inline-block" }}>{category.name}</h2>
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
