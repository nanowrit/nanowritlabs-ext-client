import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { Collapse, FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import { GoQuestion } from "react-icons/go";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";
import "../../containers/Notes.css";

export default function Premise(props) {
    const file = useRef(null);
    const [premise, setPremise] = useState(null);
    const [protagonist, setProtagonist] = useState("");
    const [situation, setSituation] = useState("");
    const [objective, setObjective] = useState("");
    const [opponent, setOpponent] = useState("");
    const [disaster, setDisaster] = useState("");
    const [theme, setTheme] = useState("");
    const [dramaticStatement, setDramaticStatement] = useState("");
    const [dramaticQuestion, setDramaticQuestion] = useState("");
    const [openProtagonist, setOpenProtagonist] = useState(false);
    const [openSituation, setOpenSituation] = useState(false);
    const [openObjective, setOpenObjective] = useState(false);
    const [openOpponent, setOpenOpponent] = useState(false);
    const [openDisaster, setOpenDisaster] = useState(false);
    const [openTheme, setOpenTheme] = useState(false);
    const [openDramaticStatement, setOpenDramaticStatement] = useState(false);
    const [openDramaticQuestion, setOpenDramaticQuestion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadPremise() {
      return API.get("premises", `/premises/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const premise = await loadPremise();
        const { 
          protagonist, 
          situation, 
          objective,
          opponent, 
          disaster,
          theme,
          dramaticStatement,
          dramaticQuestion,
          attachment } = premise;

        if (attachment) {
          premise.attachmentURL = await Storage.vault.get(attachment);
        }

        setProtagonist(protagonist);
        setSituation(situation);
        setObjective(objective);
        setOpponent(opponent);
        setDisaster(disaster);
        setTheme(theme);
        setDramaticStatement(dramaticStatement);
        setDramaticQuestion(dramaticQuestion);
        setPremise(premise);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return protagonist.length > 0 || situation.length > 0 || objective.length > 0 || opponent.length > 0 || disaster.length > 0 || theme.length > 0 || dramaticStatement.length > 0 || dramaticQuestion.length > 0;
  }
  
  // function formatFilename(str) {
  //   return str.replace(/^\w+-/, "");
  // }
  
  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }
  
  function savePremise(premise) {
    return API.put("premises", `/premises/${props.match.params.id}`, {
      body: premise
    });
  }
  
  async function handleSubmit(event) {
    let attachment;
  
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }
  
      await savePremise({
        protagonist,
        situation,
        objective,
        opponent,
        disaster,
        theme,
        dramaticStatement,
        dramaticQuestion,
        attachment: attachment || premise.attachment
      });
      props.history.push("/premisebuilder");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deletePremise() {
    return API.del("premises", `/premises/${props.match.params.id}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this scene?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deletePremise();
      props.history.push("/premisebuilder");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
        <div>
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
        </div>
      {premise && (
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
                The protagonist is the hero(ine) of your story. You can write as little or as much as you like here. Start with just a name if you like and come back later to add a description or vice-versa.
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
                The objective is simply the protagonist's desire through out the entire story. What do they want? Describe that here.
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
                The bad guy. The villian. The Opponent. Who is in your hero's way? Or or more likely, who is your hero in the way of? In this approach the opponent can be an act of nature or aspect of the hero themselves. Or just a person. You're the boss. 
                Describe the opponent here. 
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
                And finally, the theme. What is your story about? What singular truth must the hero finally accept in order to overcome all odds and win in the end? This could be one word. It probably should be one word in fact... eventually. To start just start free writing on what you think this story is about until you can distill down to one word or one sentence. 
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
          <Collapse className="Lexend-Tera" in={openDramaticStatement}>
            <div className="pale-silver">
              <p>
                Now that we have considered all of the elements of a premise, let's start putting them together.
              </p>
              <p>
                The dramatic statment is the first of two parts of the finished premise. In this part, try to establish the protagonist, the situation, and the objective in one or two sentences. You can think of it as an equation if that helps:
              </p>
              <p className="text-center dark-goldenrod">
                [PROTAGONIST] + [SITUATION] + [OBJECTIVE] = Dramatic Statement
              </p>
              <p>
                For the non-math nerd, another perspective on the same thing:
              </p>
              <p className="text-center dark-goldenrod">
                "In a [SITUATION], all [PROTAGONIST] wants is [OBJECTIVE]." &#8212;dramatic statement
              </p>
              <p>
                Or something along those lines.
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
          <Collapse className="Lexend-Tera" in={openDramaticQuestion}>
            <div className="pale-silver">
              <p>
                In the dramatic question, try to establish the opponent and the disaster in the form of a question. The fill-in-the-blank example might look something like:
              </p>
              <p className="text-center dark-goldenrod">
                But can [PROTAGONIST] get [OBJECTIVE] before [OPPONENT] causes [DISASTER]?
              </p>
              <p>
                I can already tell I'm going to have to rewrite that one but, for now, you hopefully get the idea.
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
          {/* {premise.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={premise.attachmentURL}
                >
                  {formatFilename(premise.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )} */}
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}