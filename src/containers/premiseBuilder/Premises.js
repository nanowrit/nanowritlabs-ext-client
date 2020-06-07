import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
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
          <h3>Your Protagonist</h3>
            <FormGroup controlId="protagonist">
              <FormControl
                value={protagonist}
                type="text"
                onChange={e => setProtagonist(e.target.value)}
              />
            </FormGroup>
          <h3>The Situation</h3>
            <FormGroup controlId="situation">
              <FormControl
                value={situation}
                componentClass="textarea"
                onChange={e => setSituation(e.target.value)}
              />
            </FormGroup>
          <h3>The Protagonist's Objective</h3>
            <FormGroup controlId="objective">
              <FormControl
                value={objective}
                type="text"
                onChange={e => setObjective(e.target.value)}
              />
            </FormGroup>
          <h3>The Protagonist's Opponent</h3>
            <FormGroup controlId="opponent">
              <FormControl
                value={opponent}
                type="text"
                onChange={e => setOpponent(e.target.value)}
              />
            </FormGroup>
          <h3>The Disaster that Looms over our Hero</h3>
            <FormGroup controlId="disaster">
              <FormControl
                value={disaster}
                componentClass="textarea"
                onChange={e => setDisaster(e.target.value)}
              />
            </FormGroup>
          <h3>The Theme of your Story</h3>
            <FormGroup controlId="theme">
              <FormControl
                value={theme}
                componentClass="textarea"
                onChange={e => setTheme(e.target.value)}
              />
            </FormGroup>
          <h3>The Dramatic Statement</h3>
            <FormGroup controlId="dramaticStatement">
              <FormControl
                value={dramaticStatement}
                as="textarea"
                onChange={e => setDramaticStatement(e.target.value)}
              />
            </FormGroup>
          <h3>The Dramatic Question</h3>
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