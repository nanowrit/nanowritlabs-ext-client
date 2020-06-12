import React, { useState, useEffect } from "react";
import { Collapse, ListGroup, ListGroupItem, ProgressBar, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import Lander from "./Lander";
import "./Home.css";
import { IoIosAdd } from "react-icons/io";
import { GoQuestion } from "react-icons/go";

export default function SceneBuilder(props) { 
  const [mirrors, setMirrors] = useState([{}]);
  const [beginnings, setBeginnings] = useState([{}]);
  const [darknesss, setDarknesss] = useState([{}]);
  const [fillers, setFillers] = useState([{}]);
  const [recommitments, setRecommitments] = useState([{}]);
  const [climaxs, setClimaxs] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  let [progress, setProgress] = useState(0);
  // The boolean variables for the collapsable instructions/hints
  const [openBeginningScene, setOpenBeginningScene] = useState(false);
  const [openMirrorScene, setOpenMirrorScene] = useState(false);
  const [openRecommitmentScene, setOpenRecommitmentScene] = useState(false);
  const [openDarknessScene, setOpenDarknessScene] = useState(false);
  const [openClimaxScene, setOpenClimaxScene] = useState(false);
  const [openFillerScene, setOpenFillerScene] = useState(false);


  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      setProgress(0);
  
      try {
        const beginnings = await loadBeginnings();
        setBeginnings(beginnings);
        setProgress(progress => progress + 16.67);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      setProgress(0);
  
      try {
        const mirrors = await loadMirrors();
        setMirrors(mirrors);
        setProgress(progress => progress + 16.67);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      setProgress(0);
  
      try {
        const darknesss = await loadDarknesss();
        setDarknesss(darknesss);
        setProgress(progress => progress + 16.67);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      setProgress(0);
  
      try {
        const fillers = await loadFillers();
        setFillers(fillers);
        setProgress(progress => progress + 16.67);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      setProgress(0);
  
      try {
        const recommitments = await loadRecommitments();
        setRecommitments(recommitments);
        setProgress(progress => progress + 16.67);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      setProgress(0);
  
      try {
        const climaxs = await loadClimaxs();
        setClimaxs(climaxs);
        setProgress(progress => progress + 16.67);
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
            <h2 className="Gotu center d-inline-flex">
              Acme Legal Pads
            </h2>
            <Link to="/fillers/new">
              <h3 className="d-inline-flex float-right" ><IoIosAdd /></h3>
            </Link>
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
          <h3>
            The Beginning Scene  
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenBeginningScene(!openBeginningScene)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openBeginningScene}>
            <div className="pale-silver">
              <p className="pale-silver">
                The beginning scene is basically Act I of your story. The objective here is to introduce the situation, the main characters and the conflicts between, and end with a departure or crisis that leads to a departure.
              </p>
              <p className="pale-silver">
                The beginning scene is composed of seven elements. These are The Hook, The Backstory, The Inciting Incident, The Trigger, The Debate, The Decision, and The Threshold. Let’s quickly go over each of these.
              </p>
              <p className="pale-silver">
                The Hook acts as a device to snare the reader’s attention. The best hooks start in the middle of some excitement like an action scene or it starts with trouble. The trouble can be a murder, explosion or something like that. It can also be the ominous arrival of the villain of your story into the town or setting the story where takes place.
              </p>
              <p className="pale-silver">
                The Backstory provides the context of the story. This can include details about the hero and why the reader should care what happens to this person, the source of conflict for the hero and villain (and hero and rival, if your story includes a rival). The backstory also sheds light on the other supporting characters such as the love interest, the mentor, any henchmen the bad guy might have, a sidekick for the hero, and the hero’s rival if there is one. 
              </p>
              <p className="pale-silver">
                The Inciting Incident is an incident where the hero sees some injustice of some kind that conflicts with deeply-held values. This is where the hero is almost forced to do something and that decision is what propels the story into act II. 
              </p>
              <p className="pale-silver">
                But before Act II, there is a trigger. The trigger is where the hero takes some action that plunges your character into the heart of the conflict. Think of the trigger as the point where your hero sticks their neck out. 
              </p>
              <p className="pale-silver">
                Sometimes when you stick your neck out, you tend to second-guess yourself. We call this part ‘The Debate.’ The Debate is where your hero starts to think that maybe they don’t want to be involved in this thing after all. Maybe they're not up to the challenge and it is too much trouble anyway. 
              </p>
              <p className="pale-silver">
                There would be no story if the hero decided to turn around now so inevitably the hero makes the decision. The decision is a moment in the story where the call to action is accepted because the hero cannot live with doing nothing about the trouble they dipped their toe in at The Inciting Incident.
              </p>
              <p className="pale-silver">
                The mental decision to commit to the cause is followed by an emotional decision. We call this ‘Crossing the Threshold.’ The hero crosses the threshold and commits to taking action. This threshold is also where we leave Act I and transition to Act II.
              </p>
            </div>
          </Collapse>
            <ListGroup>
              {!isLoading && renderBeginningsList(beginnings)}
            </ListGroup>
          <h3 className="some-headspace">
            The Mirror Scene 
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenMirrorScene(!openMirrorScene)} 
            />
            </h3>
            <Collapse className="Lexend-Tera" in={openMirrorScene}>
              <div className="pale-silver">
                <p className="pale-silver">
                  The Mirror Scene can either be the beginning of Act II (for a shorter piece) or part of the middle of Act II for a longer piece. For longer pieces, use one or more filler scene to transition from the departure at the end of Act I or the beginning scene to the mirror scene.
                </p>
                <p className="pale-silver">
                  The main objective the the mirror scene is to establish the hero’s realization that the opposing forces are stronger than originally anticipated and that the struggle in overcoming the challenges ahead may me more than the hero thinks they can handle.
                </p>
                <p className="pale-silver">
                  This scene consists of six elements. They are The Goal, The Conflict, The Disaster, The Mirror Moment, One More Time, And The Action. Let’s briefly touch on these and how they work within the overall scene.
                </p>
                <p className="pale-silver">
                  The goal element in the mirror scene has to do with the reason the hero had crossed the threshold at the end of the beginning scene. Continue to re-establish that motivation here. 
                </p>
                <p className="pale-silver">
                  The Conflict—this is a beat in the scene where the hero makes a lazy attempt at fixing the problem and is met with defeat. The defeat is where the hero starts to realize this is going to take more than a lazy attempt to overcome. 
                </p>
                <p className="pale-silver">
                  The Disaster—in the course of making the attempt defined in the The Conflict where the hero is soundly defeated and perhaps humbled, some disaster takes place to remind the hero what exactly is at stake here. The hero may not have been utterly destroyed during the defeat but something the hero cares about perhaps has and the hero recognizes that the villain is capable of destroying everything the hero cares about.
                </p>
                <p className="pale-silver">
                  The Mirror Moment—This is the other side of the coin in relation to The Disaster. In The Mirror Moment the hero also comes to realize what is at stake if they were to walk away and do nothing. The Disaster and The Mirror Moment act as the proverbial rock and hard place situation where the hero struggles with the temptation of going back to their old life and the stubborn realization that that is just not possible.
                </p>
                <p className="pale-silver">
                  One More Time—At some point the hero comes to the realization that forward is the only path available here and makes the decision to try One More Time. This section is more of an emotional decision where as the next section symbolizes more of a physical commitment to the cause.
                </p>
                <p className="pale-silver">
                  The Action—The hero has steeled themselves doing something about the problem but doesn’t yet know what to do. Maybe they need to seek support or guidance, or maybe they need recruit an army. This is where the hero makes the decision to gather resources or information to assist on the trials ahead and commits some physical act to further reinforce that the story is progress forward.
                </p>
              </div>
          </Collapse>
            <ListGroup>
              {!isLoading && renderMirrorsList(mirrors)}
            </ListGroup>
          <h3 className="some-headspace">
            The Recommitment Scene 
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenRecommitmentScene(!openRecommitmentScene)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openRecommitmentScene}>
              <div className="pale-silver">
                <p className="pale-silver">
                  The Recommitment Scene is the middle of Act II. This whole scene has to do with coming up with a plan for how to accomplish the task of cleaning up this story of the forces of evil.
                </p>
                <p className="pale-silver">
                  This scene also consists of six elements. They are The Goal, The Conflict, The Revelation, Praising The Enemy, Do or Die, and Crossing the Threshold II. Let’s look at each of these. 
                </p>
                <p className="pale-silver">
                  The Goal—the goal in this scene is obviously to come up with a plan. The plan will obviously have to be more daring than the first lazy attempt back in the mirror scene but it should also serve to add tension to the story that keeps the reader engaged and wondering what happens next.
                </p>
                <p className="pale-silver">
                  The Conflict—the conflict in this scene doesn’t come from the forces of evil but comes from friends and allies who, in their own mirror moment, try to take the hero out of going through with it. This dynamic between the hero and the reservations or objections of anyone in the hero camp should also add tension to the story. 
                </p>
                <p className="pale-silver">
                  The Revelation—this is the moment when the hero simply accepts that all the bad things and misfortune everyone brought up in the previous section could happen. The hero may not make it back and must acknowledge and accept the mortality of everyone involved in the quest.That also means accepting responsibility for the outcome for everyone involved. The most important thing here may be to reinforce the theme. What is the story about? The theme can be considered struggle of good versus evil in the context of some aspect of the human experience. The hero is simply the embodiment of one side of that argument or the other. That revelation may appear to the hero here as well or it can be implicitly understood. 
                </p>
                <p className="pale-silver">
                Praising The Enemy—after the revelation, everyone that is committed to the cause is on-board and now they take the time to appreciate exactly what they are up against and how they can go out and defeat this evil despite the overwhelming odds.
                </p>
                <p className="pale-silver">
                  Do or Die—at some point in praising the enemy and taking stock, a strategy emerges that provides some hope for success. Its not a lot of hope but it's something. And the hero’s camp make the decision that it has to be enough because they must act. This is where everyone involved in the plot emotionally accepts that they are doing this. 
                </p>
                <p className="pale-silver">
                  Crossing The Threshold II—this part is where the the hero’s party physically performs some action that symbolizes the crossing of a threshold and moving beyond the point of no return.
                </p>
              </div>
          </Collapse>
            <ListGroup>
              {!isLoading && renderRecommitmentList(recommitments)}
            </ListGroup>
          <h3 className="some-headspace">
            The Darkness Scene 
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenDarknessScene(!openDarknessScene)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openDarknessScene}>
            <div className="pale-silver">
              <p className="pale-silver">
                This marks the end of Act II as the hero(es) embark on their ambitious plan. This scene begins at the location of the planned strategy. If you would like to add scenes where they go from the location where the plan was determined, use filler scenes for that. 
              </p>
              <p className="pale-silver">
                The darkness scene is also comprised of six elements. These are The Goal, The Conflict, The Ultimate Disaster, The Darkest Moment, One Chance, and finally Do and Die. Let look at what each of these elements are exactly.
              </p>
              <p className="pale-silver">
                The Goal of the Darkness Scene is obviously to succeed at carrying out the plan after making it into position to strike. Everyone one still feels pretty good about the plan—mostly because no one has engaged with the enemy yet. 
              </p>
              <p className="pale-silver">
                The Conflict of the Darkness Scene is where the enemy responds to the attack and things get real. Tension is reaching its height here.
              </p>
              <p className="pale-silver">
                The Ultimate Disaster is a moment or event that signifies the worst and hope drains from everyone. This could be where the hero runs out of bullets, any and all allied support is destroyed or somehow rendered ineffective and the hero is on their own.
              </p>
              <p className="pale-silver">
                The Darkest Moment comes when the villain also realizes the precarious position the hero is suddenly mired in and maybe doesn’t yet go in for the kill but simply plays with its prey after realizing how helpful the prey is now. Drag this part out to really turn up the tension.
              </p>
              <p className="pale-silver">
                One Chance—At some point in fighting for nothing more than survival, the hero recognizes something that might turn this whole thing around and save the day. This could be something that may have come up earlier in the story but was scoffed at at the time or something or someone that appeared lost initially but recovered enough to help the hero during the most desperate of times. 
              </p>
              <p className="pale-silver">
                Do and Die is when the hero goes all in, guns blazing, revitalized by what ever was introduced in the previous section, and tries to end this thing once and for all.  
              </p>
            </div>
          </Collapse>
            <ListGroup>
              {!isLoading && renderDarknessList(darknesss)}
            </ListGroup>
          <h3 className="some-headspace">
            The Climax Scene
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenClimaxScene(!openClimaxScene)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openClimaxScene}>
            <div className="pale-silver">
              <p className="pale-silver">
                The Climax Scene is essentially all of Act III in this system. Certain elements of Act III can be given their own scenes through filler scenes.
              </p>
              <p className="pale-silver">
                This scene is also comprised of six elements. They are The Struggle, The Doubt, The Unexpected, The Climax, Poetic Justice, Poetic Reward, and The Wrap Up. Let go over each of these quickly.
              </p>
              <p className="pale-silver">
                The Struggle is where the villain is baring down on the hero, ready to end this. The villain may or may not be aware of the source of renewed hope described in the One Chance section in the previous scene. Maybe they are tired of playing with their prey. Either way the hero is starting to look like toast. 
              </p>
              <p className="pale-silver">
                The Doubt—here there is a battle between hero and villain that is kind of a stalemate. Both are starting to realize that they don’t have any distinct advantage over the other after all.
              </p>
              <p className="pale-silver">
                The Unexpected—this is where some unexpected twist occurs that puts the hero on top.
              </p>
              <p className="pale-silver">
                The Climax—the hero takes full advantage of the unexpected to finally vanquish the enemy and ultimately defeat them. 
              </p>
              <p className="pale-silver">
                Poetic Justice—soon after the main personification of evil has been defeated by the hero, the larger structures holding the elements of evil in places of power also come tumbling down. Or maybe they blow up, totally your choice. But this event should symbolize the ultimate defeat of whatever forces represented evil in the context of the theme in the world of your story.
              </p>
              <p className="pale-silver">
                Poetic Reward—this is an event where the heroes of the story are rewarded for their courage and bravery in the face of evil and recognized for their efforts to bring it down. 
              </p>
              <p className="pale-silver">
                Wrapping it Up—the curtain line where all loose ends are tied up and the moral lesson of the story is reinforced. 
              </p>
            </div>
          </Collapse>
            <ListGroup>
              {!isLoading && renderClimaxList(climaxs)}
            </ListGroup>
          <h3 className="some-headspace">
            The Filler Scene
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenFillerScene(!openFillerScene)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openFillerScene}>
            <div className="pale-silver">
              <p className="pale-silver">
                The filler scene is a scene that acts as a transition between any of the core scenes listed above. This can be a great place to add foreshadowing events that are reintroduced with much satisfaction later in the story. Add as many of these scenes as necessary to provide a smooth flow from scene to scene.
              </p>
              <p className="pale-silver">
                The filler scene consists of seven elements. These are Situation, Conflict, Twist/Complication/Disaster, Dilemma, Decision, and Action. Let’s look at each of these elements.
              </p>
              <p className="pale-silver">
                Situation—loosely speaking this is where the setting and the goal of the scene are defined. 
              </p>
              <p className="pale-silver">
                Conflict—the goal defined above must be pursued by the characters involved. There also must be someone or something that doesn’t want those characters to achieve that goal. Perhaps these forces want to achieve the goal for themselves. Describe that conflict here. 
              </p>
              <p className="pale-silver">
                Twist/Complication/Disaster—in the pursuit of the goal some unexpected twist or complication should occur to provide tension and intrigue to the scene. This event can benefit or punish any of the characters in the scene. For maximum value the twist should also foreshadow something that will be vital to the story later. 
              </p>
              <p className="pale-silver">
                Emotion/Feeling/Reaction—this element describes the emotional reaction of the characters in the scene to the twist described above.
              </p>
              <p className="pale-silver">
                Dilemma—the realization that circumstances have changed
              </p>
              <p className="pale-silver">
                Decision—a choice is made on what to do in light of the new set of circumstances.
              </p>
              <p className="pale-silver">
                Action—an action is committed based on the decision made that propels the story into the next scene. 
              </p>
            </div>
          </Collapse>
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