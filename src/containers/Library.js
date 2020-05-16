import React from "react";
import { Image, Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Library.css";

export default function Library(props) {
    return (
        <div className="Library">
            <Container fluid>
                <Row>
                    <Col xsHidden smHidden md={3}>
                        <Image className="art" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/Weird_Tales_November_1941.png" />
                    </Col>
                    <Col xsPull={6} mdPush={3} lgPush={3}>
                    <h1>The Library</h1>
                    <ListGroup className="library-list">
                        <Link to="/classicStories">
                            <ListGroupItem>
                                <h2>Classic Pulp Fiction Stories</h2>
                            </ListGroupItem>
                        </Link>
                        <Link to="/modern-stories">
                            <ListGroupItem>
                                <h2>Modern Pulp Fiction Stories</h2>
                            </ListGroupItem>
                        </Link>
                        <Link to="/">
                            <ListGroupItem>
                                <h2>Pulp Fiction Blueprints</h2>
                            </ListGroupItem>
                        </Link>
                        <Link to="/">
                            <ListGroupItem>
                                <h2>Classic Pulp Fiction Art</h2>
                            </ListGroupItem>
                        </Link>
                        <Link to="/">
                            <ListGroupItem>
                                <h2>Story Seeds</h2>
                            </ListGroupItem>
                        </Link>
                    </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
