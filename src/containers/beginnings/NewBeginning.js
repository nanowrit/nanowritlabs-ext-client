import React, { useRef, useState } from "react";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
// import config from "../../config";
import "../../containers/NewNote.css";
import { Link } from "react-router-dom";

export default function NewBeginning(props) {
  const file = useRef(null);
  const [hook, setHook] = useState("");
  const [backstory, setBackstory] = useState("");
  const [incitingIncident, setIncitingIncident] = useState("");
  const [triggerEvent, setTriggerEvent] = useState("");
  const [debate, setDebate] = useState("");
  const [decision, setDecision] = useState("");
  const [threshold, setThreshold] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return hook.length > 0;
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
  
      await createBeginning(
        { 
          hook,
          backstory,
          incitingIncident,
          triggerEvent,
          debate,
          decision,
          threshold,
          attachment 
        });
      props.history.push("/scenebuilder");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createBeginning(beginning) {
    return API.post("beginnings", "/beginnings", {
      body: beginning
    });
  }

  return (
    <div className="NewNote">
      <Breadcrumb>
        <Breadcrumb.Item as="div">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item as="div">
          <Link to="/laboratory">Laboratory</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item as="div">
          <Link to="/scenebuilder">scenebuilder</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active as="div">
          New Beginning Scene
        </Breadcrumb.Item>
      </Breadcrumb>
      <form onSubmit={handleSubmit}>
        <h2>New Beginning Scene</h2>
          <h3>The Hook</h3>
            <FormGroup controlId="hook">
              <FormControl
                value={hook}
                as="textarea"
                onChange={e => setHook(e.target.value)}
              />
            </FormGroup>
          <h3>The Backstory</h3>
            <FormGroup controlId="backstory">
              <FormControl
                value={backstory}
                as="textarea"
                onChange={e => setBackstory(e.target.value)}
              />
            </FormGroup>
          <h3>The Inciting Incident</h3>
            <FormGroup controlId="incitingIncident">
              <FormControl
                value={incitingIncident}
                as="textarea"
                onChange={e => setIncitingIncident(e.target.value)}
              />
            </FormGroup>
          <h3>The Trigger</h3>
            <FormGroup controlId="triggerEvent">
              <FormControl
                value={triggerEvent}
                as="textarea"
                onChange={e => setTriggerEvent(e.target.value)}
              />
            </FormGroup>
          <h3>The Debate</h3>
            <FormGroup controlId="debate">
              <FormControl
                value={debate}
                as="textarea"
                onChange={e => setDebate(e.target.value)}
              />
            </FormGroup>
          <h3>The Decision</h3>
            <FormGroup controlId="decision">
              <FormControl
                value={decision}
                as="textarea"
                onChange={e => setDecision(e.target.value)}
              />
            </FormGroup>
          <h3>The Threshold</h3>
            <FormGroup controlId="threshold">
              <FormControl
                value={threshold}
                as="textarea"
                onChange={e => setThreshold(e.target.value)}
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
          Create
        </LoaderButton>
      </form>
    </div>
  );
}