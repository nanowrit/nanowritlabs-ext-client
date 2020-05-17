import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, ProgressBar, Breadcrumb } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import Lander from "./Lander";
import "./Home.css";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";

export default function SceneBuilder(props) { 
  const [mirrors, setMirrors] = useState([{}]);
  const [beginnings, setBeginnings] = useState([{}]);
  const [darknesss, setDarknesss] = useState([{}]);
  const [fillers, setFillers] = useState([{}]);
  const [recommitments, setRecommitments] = useState([{}]);
  const [climaxs, setClimaxs] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  let [progress, setProgress] = useState(0);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      setProgress(0);
  
      try {
        const beginnings = await loadBeginnings();
        setBeginnings(beginnings);
        setProgress(16.67);
        const mirrors = await loadMirrors();
        setMirrors(mirrors);
        setProgress(33.33);
        const darknesss = await loadDarknesss();
        setDarknesss(darknesss);
        setProgress(50);
        const fillers = await loadFillers();
        setFillers(fillers);
        setProgress(66.67);
        const recommitments = await loadRecommitments();
        setRecommitments(recommitments);
        setProgress(83.35)
        const climaxs = await loadClimaxs();
        setClimaxs(climaxs);
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
  
  function loadBeginnings() {
    return API.get("beginnings", "/beginnings");
  }

  function loadMirrors() {
    return API.get("mirrors", "/mirrors");
  }

  function loadDarknesss() {
    return API.get("darknesss", "/darknesss");
  }

  function loadFillers() {
    return API.get("fillers", "/fillers");
  }

  function loadRecommitments() {
    return API.get("recommitments", "/recommitments");
  }

  function loadClimaxs() {
    return API.get("climaxs", "/climaxs");
  }

  function renderBeginningsList(beginnings) {
    return [{}].concat(beginnings).map((beginning, i) =>
      i !== 0 ? (
        <LinkContainer key={beginning.beginningId} to={`/beginnings/${beginning.beginningId}`}>
          <ListGroupItem className="listGroupItem">
            <h3>The Hook</h3>
            {beginning.hook}
            <h3>The Backstory</h3>
            {beginning.backstory}
            <h3>The Inciting Incident</h3>
            {beginning.incitingIncident}
            <h3>The Trigger</h3>
            {beginning.triggerEvent}
            <h3>The Debate</h3>
            {beginning.debate}
            <h3>The Decision</h3>
            {beginning.decision}
            <h3>The Threshold</h3>
            {beginning.threshold}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <div>
          { 
          beginnings.length > 0 ? (
            <LinkContainer key="new" to="#">
            <ListGroupItem>
              <h2 className="Gotu center">
                Acme Legal Pads
              </h2>
            </ListGroupItem>
          </LinkContainer>
          ) : (
            <LinkContainer key="new" to="/beginnings/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new beginning scene
              </h4>
            </ListGroupItem>
          </LinkContainer>
          )
          }
        </div>
      )
    );
  }

  function renderMirrorsList(mirrors) {
    return [{}].concat(mirrors).map((mirror, i) =>
      i !== 0 ? (
        <LinkContainer key={mirror.mirrorId} to={`/mirrors/${mirror.mirrorId}`}>
          <ListGroupItem className="listGroupItem">
            <h3>The Goal</h3>
            {mirror.goal}
            <h3>The Conflict</h3>
            {mirror.conflictField}
            <h3>Then Disaster Strikes</h3>
            {mirror.disaster}
            <h3>The Mirror Moment</h3>
            {mirror.mirrorMoment}
            <h3>One More Time</h3>
            {mirror.oneMoreTime}
            <h3>The Action</h3>
            {mirror.actionField}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <div>
        { 
        mirrors.length > 0 ? (
          <LinkContainer key="new" to="#">
          <ListGroupItem>
            <h2 className="Gotu center">
              Acme Legal Pads
            </h2>
          </ListGroupItem>
        </LinkContainer>
        ) : (
          <LinkContainer key="new" to="/mirrors/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new mirror scene
            </h4>
          </ListGroupItem>
        </LinkContainer>
        )
        }
      </div>
      )
    );
  }

  function renderDarknessList(darknesss) {
    return [{}].concat(darknesss).map((darkness, i) =>
      i !== 0 ? (
        <LinkContainer key={darkness.darknessId} to={`/darknesss/${darkness.darknessId}`}>
          <ListGroupItem className="listGroupItem">
            <h3>The Goal</h3>
            {darkness.goal}
            <h3>The Conflict</h3>
            {darkness.conflictField}
            <h3>Then Ultimate Disaster Strikes</h3>
            {darkness.ultimateDisaster}
            <h3>The Mirror Moment</h3>
            {darkness.darkestMoment}
            <h3>One Chance</h3>
            {darkness.oneChance}
            <h3>Do and Die</h3>
            {darkness.doAndDie}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <div>
        { 
        darknesss.length > 0 ? (
          <LinkContainer key="new" to="#">
          <ListGroupItem>
            <h2 className="Gotu center">
              Acme Legal Pads
            </h2>
          </ListGroupItem>
        </LinkContainer>
        ) : (
          <LinkContainer key="new" to="/darknesss/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new darkness scene
            </h4>
          </ListGroupItem>
        </LinkContainer>
        )
        }
      </div>
      )
    );
  }

  function renderFillerList(fillers) {
    return [{}].concat(fillers).map((filler, i) =>
      i !== 0 ? (
        <LinkContainer key={filler.fillerId} to={`/fillers/${filler.fillerId}`}>
          <ListGroupItem className="listGroupItem">
            <h3>The Goal</h3>
            {filler.goal}
            <h3>The Conflict</h3>
            {filler.conflictField}
            <h3>Then Disaster Strikes</h3>
            {filler.disaster}
            <h3>The Dilemma</h3>
            {filler.dilemma}
            <h3>The Decision</h3>
            {filler.decision}
            <h3>The Action</h3>
            {filler.actionField}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <div>
        { 
        fillers.length > 0 ? (
          <LinkContainer key="new" to="#">
          <ListGroupItem>
            <h2 className="Gotu center">
              Acme Legal Pads
            </h2>
          </ListGroupItem>
        </LinkContainer>
        ) : (
          <LinkContainer key="new" to="/fillers/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new filler scene
            </h4>
          </ListGroupItem>
        </LinkContainer>
        )
        }
      </div>
      )
    );
  }

  function renderRecommitmentList(recommitments) {
    return [{}].concat(recommitments).map((recommitment, i) =>
      i !== 0 ? (
        <LinkContainer key={recommitment.recommitmentId} to={`/recommitments/${recommitment.recommitmentId}`}>
          <ListGroupItem className="listGroupItem">
            <h3>The Goal</h3>
            {recommitment.goal}
            <h3>The Conflict</h3>
            {recommitment.conflictField}
            <h3>Then Revelation</h3>
            {recommitment.revelation}
            <h3>Praising the Enemy</h3>
            {recommitment.praiseTheEnemy}
            <h3>Do or Die</h3>
            {recommitment.doOrDie}
            <h3>Crossing the Threshold II</h3>
            {recommitment.crossThreshold}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <div>
        { 
        recommitments.length > 0 ? (
          <LinkContainer key="new" to="#">
          <ListGroupItem>
            <h2 className="Gotu center">
              Acme Legal Pads
            </h2>
          </ListGroupItem>
        </LinkContainer>
        ) : (
          <LinkContainer key="new" to="/recommitments/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new re-commitment scene
            </h4>
          </ListGroupItem>
        </LinkContainer>
        )
        }
      </div>
      )
    );
  }

  function renderClimaxList(climaxs) {
    return [{}].concat(climaxs).map((climax, i) =>
      i !== 0 ? (
        <LinkContainer key={climax.climaxId} to={`/climaxs/${climax.climaxId}`}>
          <ListGroupItem className="listGroupItem">
            <h3>The struggle</h3>
            {climax.struggle}
            <h3>The Doubt</h3>
            {climax.doubt}
            <h3>The Unexpected</h3>
            {climax.unexpected}
            <h3>The Climax</h3>
            {climax.climax}
            <h3>Poetic Justice</h3>
            {climax.poeticJustice}
            <h3>Poetic Reward</h3>
            {climax.poeticReward}
            <h3>Wrap it Up</h3>
            {climax.wrapUp}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <div>
          {
          climaxs.length > 0 ? (
            <LinkContainer key="new" to="#">
            <ListGroupItem>
              <h2 className="Gotu center">
                Acme Legal Pads
              </h2>
            </ListGroupItem>
          </LinkContainer>
        ) : (
          <LinkContainer key="new" to="/climaxs/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new climax scene
              </h4>
            </ListGroupItem>
          </LinkContainer>
        )
        }
      </div>
      )
    );
  }

  function renderProgressBar() {
    return (
      <div className="notes">
        <h1>Loading the Scenes...</h1>
        <ProgressBar active now={progress} />
      </div>
    )
  }

  function renderScenes() {
    return (
      <div className="notes min-padding">
        <Breadcrumb>
          <Breadcrumb.Item as="div">
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item as="div">
            <Link to="/Laboratory">Laboratory</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active as="div">SceneBuilder</Breadcrumb.Item>
        </Breadcrumb>
        <h2>Your Scenes</h2>
          <h3>The Beginning Scene</h3>
            <ListGroup>
              {!isLoading && renderBeginningsList(beginnings)}
            </ListGroup>
          <h3>The Mirror Scene</h3>
            <ListGroup>
              {!isLoading && renderMirrorsList(mirrors)}
            </ListGroup>
          <h3>The Recommitment Scene</h3>
            <ListGroup>
              {!isLoading && renderRecommitmentList(recommitments)}
            </ListGroup>
          <h3>The Darkness Scene</h3>
            <ListGroup>
              {!isLoading && renderDarknessList(darknesss)}
            </ListGroup>
          <h3>The Climax Scene</h3>
            <ListGroup>
              {!isLoading && renderClimaxList(climaxs)}
            </ListGroup>
          <h3 className="d-inline-flex">The Filler Scene</h3>
            <Link to="/fillers/new">
              <h3 className="d-inline-flex float-right" ><IoIosAdd /></h3>
            </Link>
            <ListGroup>
              {!isLoading && renderFillerList(fillers)}
            </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ?  progress > 99 ? renderScenes() : renderProgressBar()
      : <Lander />} 
    </div>
  );
}