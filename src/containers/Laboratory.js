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
            <div>
                <Breadcrumb>

                        <Breadcrumb.Item as="div"><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active title>Laboratory</Breadcrumb.Item>
                </Breadcrumb>
                <CardDeck>
                    <Card>
                        <Card.Title>
                            <Link to="/premisebuilder">
                                <h1 className="spanish-gray center Aladin">Premise Builder</h1>
                            </Link>
                        </Card.Title>
                        <Card.Body>
                            {/* <Card.Text className="spanish-gray center">
                                This tool helps you build compelling story premises
                            </Card.Text> */}
                            <Link to="/premisebuilder">
                                <Card.Img variant="top" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/PremiseBuilderCardImg.png" />
                            </Link>
                            {/* <Card.Text className="spanish-gray center">
                                Start here if you don't have a story idea yet
                            </Card.Text> */}
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Title>
                            <Link to="/scenebuilder">
                                <h1 className="spanish-gray center Aladin">Character Creator</h1>
                            </Link>            
                        </Card.Title>
                        <Card.Body>
                            {/* <Card.Text className="spanish-gray center">
                                This tools help you develop your characters
                            </Card.Text> */}
                            <Link to="/scenebuilder">
                                <Card.Img variant="top" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/CharacterCreatorCardImg.png" />
                            </Link>
                            {/* <Card.Text className="spanish-gray center">
                                Go here once you have your premise established
                            </Card.Text> */}
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Title>
                            <Link to="/scenebuilder">
                                <h1 className="spanish-gray center Aladin">Scene Builder</h1>
                            </Link>            
                        </Card.Title>
                        <Card.Body>
                            {/* <Card.Text className="spanish-gray center">
                                This tools help you develop your premise into a complete story
                            </Card.Text> */}
                            <Link to="/scenebuilder">
                                <Card.Img variant="top" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/SceneBuilderCardImg1.png" />
                            </Link>
                            {/* <Card.Text className="spanish-gray center">
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