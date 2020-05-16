import React from "react";
import "./Lander.css";
import { Link } from "react-router-dom"; 
import { Card, CardDeck, Breadcrumb } from "react-bootstrap";

export default function Lander(props) {

    return (
        <div className="align-items-center">
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <CardDeck>
                <Card>
                    <Card.Title>
                        <Link to="/library">
                            <h1 className="spanish-gray center Aladin">The Library</h1>
                        </Link>
                    </Card.Title>
                    <Link to="/library">
                    <Card.Img variant="top" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/LibraryCardImg.png" />
                    </Link>
                    <Link to="/library">
                    <Card.Body>
                        <Card.Text className="spanish-gray center">
                            Go here for access to research and specimen collection
                        </Card.Text>
                    </Card.Body>
                    </Link>
                </Card>
                <Card>
                    <Card.Title>
                        <Link to="/laboratory">
                            <h1 className="spanish-gray center Aladin">The Laboratory</h1>
                        </Link>            
                    </Card.Title>
                    <Link to="/laboratory">
                        <Card.Img variant="top" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/LaboratoryCardImg.png" />
                    </Link>
                    <Link to="/laboratory">
                        <Card.Body>
                            <Card.Text className="spanish-gray center">
                                Go here for access to the tools of the trade
                            </Card.Text>
                        </Card.Body>
                    </Link>
                </Card>
            </CardDeck>
        </div>
      );
}