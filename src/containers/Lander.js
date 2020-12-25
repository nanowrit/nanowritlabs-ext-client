import React, { useEffect } from "react";
import "./Lander.css";
import { HashLink as Link } from "react-router-hash-link"; 
import { Card, CardDeck, Breadcrumb, Image, Jumbotron } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaAngleDoubleDown } from "react-icons/fa";
import { GiHomeGarage } from "react-icons/gi";


export default function Lander(props) {

    useEffect(() => {
        const script = document.createElement('script');
    
        document.body.appendChild(script);
    
        try {
            window._mNHandle.queue.push(function (){
                window._mNDetails.loadTag("743382387", "728x90", "743382387");
            });
        }
        catch (error) {}
    
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    function RenderUnauthLander() {
        return (
            <div className="align-items-center">
                <Jumbotron fluid className="zero-padding transparent-bg">
                <Image src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/NanowritLabsCover1.png" className="full-width" />
                {/* <Link smooth to="/#panel-2">
                <h1 className="Lexend-Tera pale-silver some-headspace">
                    Are You Ready For a Tour?
                    <motion.div 
                        className="float-right"
                        animate={{ y: +2 }}
                        
                    >
                        <FaAngleDoubleDown />
                    </motion.div> 
                    </h1>
                    </Link> */}
                </Jumbotron>
                <Jumbotron 
                    fluid
                    className="transparent-bg d-flex flex-column"
                    id="panel-2"
                >
                    <Image src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/NanowritLabsCover2ndPanel.png" className="full-width" />
                </Jumbotron>
                <Jumbotron 
                    fluid
                    className="transparent-bg d-flex flex-column"
                    id="panel-2"
                >
                    <Image src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/NanowritLabsCover3rdPanel2.png" className="full-width" />
                </Jumbotron>
                <Jumbotron
                    fluid
                    className="transparent-bg full-length d-flex flex-column"
                    id="panel-4"
                >
                    <h2 className="Lexend-Tera pale-silver align-middle">Next, we'll feed the output of the PremiseBuilder into the SceneBuilder. Here the premises will be fitted with a story structure where you'll lay out the events of your nascent story, from beginning to middle to end, in a sequence of scene critical to the telling of a good pulp fiction story. </h2>
                    <div className="align-self-end mt-auto">
                    <Link smooth to="/#panel-5">
                    <h1 className="Lexend-Tera pale-silver some-headspace">
                        <FaAngleDoubleDown />
                    </h1>
                    </Link>
                    </div>
                </Jumbotron>
                <Jumbotron
                    fluid
                    className="transparent-bg full-length d-flex flex-column"
                    id="panel-5"
                >
                    <h2 className="Lexend-Tera pale-silver align-middle">Finally, the rough shape of your story is pulled from the forge. It is basically in it final form only requiring you to perhaps polish some area and hammer out others until you feel that sense of pride in your craftsmanship and you know it is ready to roll off the assembly line and meet the world.</h2>
                    <div className="align-self-end mt-auto">
                    <Link smooth to="/#AppContainer">
                    <h1 className="Lexend-Tera pale-silver some-headspace">
                        <GiHomeGarage />
                    </h1>
                    </Link>
                    </div>
                </Jumbotron>
            </div>
        )
    }

    function RenderAuthLander() {
        return (
            <div>
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
        )
    }

    return (
        <div>
            {props.isAuthenticated ? RenderAuthLander() : RenderUnauthLander()}
        </div>
      );
}