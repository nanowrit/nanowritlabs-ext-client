import React, { useEffect } from "react";
import "./Lander.css";
import { HashLink as Link } from "react-router-hash-link"; 
import { Image, Jumbotron } from "react-bootstrap";
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

    return (
        <div className="align-items-center">
            {/* <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb> */}
            <Jumbotron fluid className="zero-padding transparent-bg full-length">
            <Image src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/NanowritLanderImg.png" className="full-width" />
            <Link smooth to="/#panel-2">
            <h1 className="Lexend-Tera pale-silver some-headspace">
                Are You Ready For a Tour?
                <motion.div 
                    className="float-right"
                    animate={{ y: +2 }}
                    
                >
                    <FaAngleDoubleDown />
                </motion.div> 
                </h1>
                </Link>
            </Jumbotron>
            <Jumbotron 
                fluid
                className="transparent-bg full-length d-flex flex-column"
                id="panel-2"
            >
                <div 
                    className="align-self-start"
                >
                    <h2 className="Lexend-Tera pale-silver align-middle">Your fiction factory takes the raw creativity you give it and runs it through a process that shapes and sculps it into a finished story.</h2>
                </div>
                <div className="align-self-end mt-auto">
                <Link smooth to="/#panel-3">
                <h1 className="Lexend-Tera pale-silver some-headspace">
                    <FaAngleDoubleDown />
                </h1>
                </Link>
                </div>
            </Jumbotron>
            <Jumbotron fluid
                className="transparent-bg full-length d-flex flex-column"
                id="panel-3"
            >
                <h2 className="Lexend-Tera pale-silver align-middle">The first station is the PremiseBuilder. This is where we'll draw out of your imagination an interesting story idea. One that is interesting, even exciting enough to motivate you to write it just to find out what happens at the end.</h2>
                <div className="align-self-end mt-auto">
                <Link smooth to="/#panel-4">
                <h1 className="Lexend-Tera pale-silver some-headspace">
                    <FaAngleDoubleDown />
                </h1>
                </Link>
                </div>
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
      );
}