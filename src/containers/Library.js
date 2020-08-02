import React from "react";
import { Breadcrumb, Card, CardDeck } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Library.css";

export default function Library(props) {
    return (
        <div className="Library">
            <Breadcrumb>
                <Breadcrumb.Item as="div">
                    <Link to="/">Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active as="div">
                    Library
                </Breadcrumb.Item>
            </Breadcrumb>
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/ClassicStoriesCardImg.png" />
                    {/* eslint-disable-next-line */}
                    <a href="https://workshop.nanowritlabs.com/c/classic-stories/" target="_blank">
                        <Card.ImgOverlay>
                            <h1 className="spanish-gray center Aladin">Classic Pulp Fiction Stories</h1>
                        </Card.ImgOverlay>
                    </a>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/CharacterCreatorCardImg.png" />
                    {/* eslint-disable-next-line */}
                    <a href="https://workshop.nanowritlabs.com/c/workshopping/" target="_blank">
                        <Card.ImgOverlay>
                            <h1 className="spanish-gray center Aladin">Workshop</h1>
                        </Card.ImgOverlay>
                    </a>
                </Card>
            </CardDeck>
            <CardDeck>
                <Card> 
                    <Card.Img variant="top" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/TheCraftCardImg.png" />
                    {/* eslint-disable-next-line */}
                    <a href="https://workshop.nanowritlabs.com/c/the-craft/" target="_blank">
                    <Card.ImgOverlay>
                        <h1 className="spanish-gray center Aladin">The Craft</h1>
                    </Card.ImgOverlay>
                    </a>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/StorySeedsCardImg.png" />
                    {/* eslint-disable-next-line */}
                    <a href="https://workshop.nanowritlabs.com/c/storyseeds/" target="_blank">
                    <Card.ImgOverlay>
                        <h1 className="spanish-gray center Aladin">Story Seeds</h1>
                    </Card.ImgOverlay>
                    </a>
                </Card>
            </CardDeck>
        </div>
    );
}
