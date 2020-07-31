import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, ProgressBar, Breadcrumb, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
// import Lander from "./Lander";
import "../../containers/Home.css";
import { GoQuestion } from "react-icons/go";

export default function PremiseBuilder(props) { 
  const [premises, setPremises] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [openPremisesMain, setOpenPremisesMain] = useState(false);
  let [progress, setProgress] = useState(0);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      setProgress(0);
  
      try {
        const premises = await loadPremises();
        setPremises(premises);
        setProgress(50);
        setProgress(99);
      } catch (e) {
        alert(e);
      }
  
      setProgress(99);
      setTimeout(() => {
        setProgress(100);
      }, 1000);
      setIsLoading(false);
    }

    
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function loadPremises() {
    return API.get("premises", "/premises");
  }

  function renderPremisesList(premises) {
    return [{}].concat(premises).map((premise, i) =>
      i !== 0 ? (
        <LinkContainer key={premise.id} to={`/premises/${premise.id}`}>
          <ListGroupItem className="listGroupItem">
            <h2 className="black-olive">Premise {i} </h2>
            {premise.dramaticStatement && premise.dramaticQuestion 
              ? <div>
                  {premise.dramaticStatement} 
                  {premise.dramaticQuestion} 
                </div>
                : <div>
                  <h3>The Protagonist</h3>
                  {premise.protagonist}
                  <h3>The Situation</h3>
                  {premise.situation}
                  <h3>The Objective</h3>
                  {premise.objective}
                  <h3>The Disaster</h3>
                  {premise.disaster}
                  <h3>The Theme</h3>
                  {premise.theme}
                  <h3>The Dramatic Statement</h3>
                  {premise.dramaticStatement}
                  <h3>The Dramatic Question</h3>
                  {premise.dramaticQuestion}
                </div>
              }
          </ListGroupItem>
        </LinkContainer>
      ) : (
            <LinkContainer key="new" to="/premises/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new premise
              </h4>
            </ListGroupItem>
          </LinkContainer>
          )
    );
  }

  function renderProgressBar() {
    return (
      <div className="notes">
        <h1>Loading the Premises...</h1>
        <ProgressBar active now={progress} />
      </div>
    )
  }

  function renderPremises() {
    return (
      <div className="notes">
        <Breadcrumb>
          <Breadcrumb.Item as="div">
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item as="div">
            <Link to="/laboratory">Laboratory</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active as="div">
            PremiseBuilder
          </Breadcrumb.Item>
        </Breadcrumb>
        <h2>
          Your Premises
          <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenPremisesMain(!openPremisesMain)} 
            />
        </h2>
        <Collapse className="Lexend-Tera" in={openPremisesMain}>
          <div className="pale-silver pb-3">
            <p>
              Your Premises are the premises you created using the PremiseBuilder tool. Hit 'Create a new premise' to begin.
            </p>
            {/* eslint-disable-next-line */}
            <a href="https://guides.nanowritlabs.com/guides/PremiseBuilder/" target="_blank">Guide</a>
            {/* eslint-disable-next-line */}
            <a href="https://workshop.nanowritlabs.com/c/PremiseBuilder/" target="_blank" className="float-right">Discuss</a>
          </div>
        </Collapse>
          <ListGroup>
            {!isLoading && renderPremisesList(premises)}
          </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {progress > 99 ? renderPremises() : renderProgressBar()} 
    </div>
  );
}