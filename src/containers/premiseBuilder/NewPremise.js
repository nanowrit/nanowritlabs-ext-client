import React, { useRef, useState } from "react";
import { Breadcrumb, Collapse, FormGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
import { GoQuestion } from "react-icons/go";
// import config from "../../config";
import "../../containers/NewNote.css";

export default function NewPremise(props) {
  const file = useRef(null);
  const [protagonist, setProtagonist] = useState("");
  const [situation, setSituation] = useState("");
  const [objective, setObjective] = useState("");
  const [opponent, setOpponent] = useState("");
  const [disaster, setDisaster] = useState("");
  const [theme, setTheme] = useState("");
  const [dramaticStatement, setDramaticStatement] = useState("");
  const [dramaticQuestion, setDramaticQuestion] = useState("");
  const [openProtagonist, setOpenProtagonist] = useState(true);
  const [openSituation, setOpenSituation] = useState(true);
  const [openObjective, setOpenObjective] = useState(true);
  const [openOpponent, setOpenOpponent] = useState(true);
  const [openDisaster, setOpenDisaster] = useState(true);
  const [openTheme, setOpenTheme] = useState(true);
  const [openDramaticStatement, setOpenDramaticStatement] = useState(true);
  const [openDramaticQuestion, setOpenDramaticQuestion] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return protagonist.length > 0;
  }

  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }

  async function handleSubmit(event) {
    event.preventDefault();
  
    // if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
    //   alert(
    //     `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
    //       1000000} MB.`
    //   );
    //   return;
    // }
  
    setIsLoading(true);
  
    try {
      const attachment = file.current
        ? await s3Upload(file.current)
        : null;
  
      await createPremise(
        { 
          protagonist,
          situation,
          objective,
          opponent,
          disaster,
          theme,
          dramaticStatement,
          dramaticQuestion,
          attachment 
        });
      props.history.push("/premisebuilder");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createPremise(premise) {
    return API.post("premises", "/premises", {
      body: premise
    });
  }

  return (
    <div className="NewNote">
      <Breadcrumb>
        <Breadcrumb.Item as="div">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item as="div">
          <Link to="/Laboratory">Laboratory</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active as="div">PremiseBuilder</Breadcrumb.Item> 
      </Breadcrumb>
      <form onSubmit={handleSubmit}>
        <h2>The Premise</h2>
          <h3>
            Your Protagonist
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenProtagonist(!openProtagonist)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openProtagonist}>
            <div className="pale-silver pb-3">
              <p>
                The protagonist is the hero(ine) of your story. You can write as little or as much as you like here. Start with just a name if you like and come back later to add a description of vice-versa.
              </p>
            </div>
          </Collapse>
          <div className="Lexend-Tera pb-3">
            {/* eslint-disable-next-line */}
            <a href="https://guides.nanowritlabs.com/guides/PremiseBuilder/#the-protagonist" target="_blank">Guide</a>
            {/* eslint-disable-next-line */}
            <a href="https://workshop.nanowritlabs.com/c/PremiseBuilder/protagonist/" target="_blank" className="float-right">Discuss</a>
          </div>
            <FormGroup controlId="protagonist">
              <FormControl
                value={protagonist}
                as="textarea"
                onChange={e => setProtagonist(e.target.value)}
              />
            </FormGroup>
          <h3>
            The Situation
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenSituation(!openSituation)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openSituation}>
            <div className="pale-silver pb-3">
              <p>
                The Situation is the context of your story. Context can mean just about anything but try to describe the situation as the environment that your protagonist finds themselves in.
              </p>
            </div>
          </Collapse>
          <div className="Lexend-Tera pb-3">
            {/* eslint-disable-next-line */}
            <a href="https://guides.nanowritlabs.com/guides/PremiseBuilder/#the-situation" target="_blank">Guide</a>
            {/* eslint-disable-next-line */}
            <a href="https://workshop.nanowritlabs.com/c/PremiseBuilder/situation/" target="_blank" className="float-right">Discuss</a>
          </div>
            <FormGroup controlId="situation">
              <FormControl
                value={situation}
                as="textarea"
                onChange={e => setSituation(e.target.value)}
              />
            </FormGroup>
          <h3>
            The Protagonist's Objective
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenObjective(!openObjective)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openObjective}>
            <div className="pale-silver">
              <p>
                The objective is simply the protagonist's desire through out the entire story. What do they want?
              </p>
            </div>
          </Collapse>
          <div className="Lexend-Tera pb-3">
            {/* eslint-disable-next-line */}
            <a href="https://guides.nanowritlabs.com/guides/PremiseBuilder/#the-objective" target="_blank">Guide</a>
            {/* eslint-disable-next-line */}
            <a href="https://workshop.nanowritlabs.com/c/PremiseBuilder/objective/" target="_blank" className="float-right">Discuss</a>
          </div>
            <FormGroup controlId="objective">
              <FormControl
                value={objective}
                as="textarea"
                onChange={e => setObjective(e.target.value)}
              />
            </FormGroup>
          <h3>
            The Protagonist's Opponent
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenOpponent(!openOpponent)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openOpponent}>
            <div className="pale-silver">
              <p>
                The bad guy. The villian. The Opponent. Who is in your hero's way? Or or more likely, who is your hero in the way of? In this approach the Opponent can be an act of nature or aspect of the hero themselves. Or just a person. You're the boss. 
                Describe the Opponent here. 
              </p>
            </div>
          </Collapse>
          <div className="Lexend-Tera pb-3">
            {/* eslint-disable-next-line */}
            <a href="https://guides.nanowritlabs.com/guides/PremiseBuilder/#the-opponent" target="_blank">Guide</a>
            {/* eslint-disable-next-line */}
            <a href="https://workshop.nanowritlabs.com/c/PremiseBuilder/opponent/" target="_blank" className="float-right">Discuss</a>
          </div>
            <FormGroup controlId="opponent">
              <FormControl
                value={opponent}
                as="textarea"
                onChange={e => setOpponent(e.target.value)}
              />
            </FormGroup>
          <h3>
            The Disaster that Looms over our Hero
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenDisaster(!openDisaster)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openDisaster}>
            <div className="pale-silver">
              <p>
                "But what if the hero fails? What if the villian wins?" 
              </p>
              <p>
                Describe that situation here.
              </p>
            </div>
          </Collapse>
          <div className="Lexend-Tera pb-3">
            {/* eslint-disable-next-line */}
            <a href="https://guides.nanowritlabs.com/guides/PremiseBuilder/#the-disaster" target="_blank">Guide</a>
            {/* eslint-disable-next-line */}
            <a href="https://workshop.nanowritlabs.com/c/PremiseBuilder/disaster/" target="_blank" className="float-right">Discuss</a>
          </div>
            <FormGroup controlId="disaster">
              <FormControl
                value={disaster}
                as="textarea"
                onChange={e => setDisaster(e.target.value)}
              />
            </FormGroup>
          <h3>
            The Theme of your Story
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenTheme(!openTheme)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openOpponent}>
            <div className="pale-silver">
              <p>
                And finally, the theme. What is your story about? What singular truth must the hero finally accept in order to overcome all odds and win in the end? This could be one word. It probably should be, eventually. To start just start free writing on what you think it is about. 
              </p>
              <p>
                You'll get to that one word in time. That is your theme.
              </p>
            </div>
          </Collapse>
          <div className="Lexend-Tera pb-3">
            {/* eslint-disable-next-line */}
            <a href="https://guides.nanowritlabs.com/guides/PremiseBuilder/#the-disaster" target="_blank">Guide</a>
            {/* eslint-disable-next-line */}
            <a href="https://workshop.nanowritlabs.com/c/PremiseBuilder/disaster/" target="_blank" className="float-right">Discuss</a>
          </div>
            <FormGroup controlId="theme">
              <FormControl
                value={theme}
                as="textarea"
                onChange={e => setTheme(e.target.value)}
              />
            </FormGroup>
          <h3>
            The Dramatic Statement
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenDramaticStatement(!openDramaticStatement)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openOpponent}>
            <div className="pale-silver">
              <p>

              </p>
            </div>
          </Collapse>
          <div className="Lexend-Tera pb-3">
            {/* eslint-disable-next-line */}
            <a href="https://guides.nanowritlabs.com/guides/PremiseBuilder/#the-disaster" target="_blank">Guide</a>
            {/* eslint-disable-next-line */}
            <a href="https://workshop.nanowritlabs.com/c/PremiseBuilder/dramatic-statement/" target="_blank" className="float-right">Discuss</a>
          </div>
            <FormGroup controlId="dramaticStatement">
              <FormControl
                value={dramaticStatement}
                as="textarea"
                onChange={e => setDramaticStatement(e.target.value)}
              />
            </FormGroup>
          <h3>
            The Dramatic Question
            <GoQuestion 
              className="pale-silver float-right" 
              onClick={() => setOpenDramaticQuestion(!openDramaticQuestion)} 
            />
          </h3>
          <Collapse className="Lexend-Tera" in={openOpponent}>
            <div className="pale-silver">
              <p className="pale-silver">

              </p>
            </div>
          </Collapse>
          <div className="Lexend-Tera pb-3">
            {/* eslint-disable-next-line */}
            <a href="https://guides.nanowritlabs.com/guides/PremiseBuilder/#the-disaster" target="_blank">Guide</a>
            {/* eslint-disable-next-line */}
            <a href="https://workshop.nanowritlabs.com/c/PremiseBuilder/dramatic-question/" target="_blank" className="float-right">Discuss</a>
          </div>
            <FormGroup controlId="dramaticQuestion">
              <FormControl
                value={dramaticQuestion}
                as="textarea"
                onChange={e => setDramaticQuestion(e.target.value)}
              />
            </FormGroup>
        {/* <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup> */}
        <LoaderButton
          block
          type="submit"
          size="large"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create Premise
        </LoaderButton>
      </form>
    </div>
  );
}