import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem, ProgressBar } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
// import Lander from "./Lander";
import "../../containers/Home.css";

export default function PremiseBuilder(props) { 
  const [premises, setPremises] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
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
        console.log(e);
        // alert(e);
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
        <PageHeader>Your Premises</PageHeader>
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