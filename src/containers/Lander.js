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
            <CardDeck className="min-padding">
                <Card>
                    <Card.Title>
                        <Link to="/library">
                            <h1 className="spanish-gray center Aladin">The Library</h1>
                        </Link>
                    </Card.Title>
                    <Link to="/library">
                    <Card.Img variant="top" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/LibraryCardImg.png" />
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
                </Card>
            </CardDeck>
        </div>
      );
}