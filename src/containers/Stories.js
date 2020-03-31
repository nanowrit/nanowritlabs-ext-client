import React from "react";
import "./Lander.css";
import { Tabs, Tab, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Stories(props) {
    return (
        <div className="Lander">
            <h1>Classic Pulp Fiction Stories</h1>
            <Tabs defaultActiveKey={1} id="stories-tabs">
                <Tab eventKey={1} title="Robert E. Howard">
                    <ListGroup>
                        <Link to="/stories/the-tower-of-the-elephant">
                            <ListGroupItem href="">
                                <h2>The Tower of the Elephant</h2>
                            </ListGroupItem>
                        </Link>
                    </ListGroup>
                </Tab>
            </Tabs>
        </div>
      );
}