import React, { useRef, useState } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
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
                componentClass="textarea"
                onChange={e => setDramaticStatement(e.target.value)}
              />
            </FormGroup>
          <h3>The Dramatic Question</h3>
            <FormGroup controlId="dramaticQuestion">
              <FormControl
                value={dramaticQuestion}
                componentClass="textarea"
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
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create Premise
        </LoaderButton>
      </form>
    </div>
  );
}