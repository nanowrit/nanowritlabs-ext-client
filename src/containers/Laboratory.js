import React from "react";
import { Link } from "react-router-dom"; 
import "./Home.css";
import { Card, CardDeck, Breadcrumb } from "react-bootstrap";

export default function Laboratory(props) {

    function RenderUnAuthLabLander() {
        return (
            <div className="Laboratory align-middle center">
            <h1 className="Black-Ops radioactive">Restricted Access</h1>
            <h3 className="center pale-silver">Please Sign up or in to proceed</h3>
            <div className="buttons">
                <Link to="/login" className="btn btn-lg">
                    Login
                </Link>
                <Link to="/signup" className="btn btn-lg center">
                    Signup
                </Link>
            </div>
        </div>
        )
    }

    function RenderLaboratoryLander() {
        return (
            <div className="options">
                <Breadcrumb>
                        <Breadcrumb.Item as="div"><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active title>Laboratory</Breadcrumb.Item>
                </Breadcrumb>
                <CardDeck>
                    <Card className="flex flex-column align-content-stretch mx-auto">
                        <Card.Title className="d-flex col">
                            <Link to="/premisebuilder">
                                <h1 className="pale-silver center Aladin">Premise Builder</h1>
                            </Link>
                        </Card.Title>
                        <Card.Body className="d-flex col">
                            {/* <Card.Text className="pale-silver center">
                                This tool helps you build compelling story premises
                            </Card.Text> */}
                            <Link to="/premisebuilder">
                                <Card.Img variant="bottom" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/PremiseBuilderCardImg.png" />
                            </Link>
                            {/* <Card.Text className="pale-silver center">
                                Start here if you don't have a story idea yet
                            </Card.Text> */}
                        </Card.Body>
                    </Card>
                    {/* <Card className="flex flex-column align-content-stretch">
                        <Card.Title className="d-flex col">
                            <Link to="/scenebuilder">
                                <h1 className="pale-silver center Aladin">Character Creator</h1>
                            </Link>            
                        </Card.Title>
                        <Card.Body className="d-flex col">
                            <Link to="/scenebuilder">
                                <Card.Img variant="bottom" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/CharacterCreatorCardImg1.png" />
                            </Link>
                        </Card.Body>
                    </Card> */}
                    <Card className="flex flex-column align-content-stretch">
                        <Card.Title className="d-flex col">
                            <Link to="/scenebuilder">
                                <h1 className="pale-silver center Aladin">Scene Builder</h1>
                            </Link>            
                        </Card.Title>
                        <Card.Body className="d-flex col">
                            {/* <Card.Text className="pale-silver center">
                                This tools help you develop your premise into a complete story
                            </Card.Text> */}
                            <Link to="/scenebuilder">
                                <Card.Img variant="bottom" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/SceneBuilderCardImg1.png" />
                            </Link>
                            {/* <Card.Text className="pale-silver center">
                                Go here once you have your premise established and some charaters developed
                            </Card.Text> */}
                        </Card.Body>
                    </Card>
                </CardDeck>
        </div>
        )
    }

    return (
        <div className="Laboratory">
            {props.isAuthenticated ? RenderLaboratoryLander() : RenderUnAuthLabLander()}
        </div>
    )
} 