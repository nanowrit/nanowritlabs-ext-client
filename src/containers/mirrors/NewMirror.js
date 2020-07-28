import React, { useRef, useState } from "react";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "../../containers/NewNote.css";
import { Link } from "react-router-dom";

export default function NewMirror(props) {
  const file = useRef(null);
  const [goal, setGoal] = useState("");
  const [conflictField, setConflictField] = useState("");
  const [disaster, setDisaster] = useState("");
  const [mirror, setMirror] = useState("");
  const [oneMoreTime, setOneMoreTime] = useState("");
  const [actionField, setActionField] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return goal.length > 0;
  }

  async function handleSubmit(event) {
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
      const attachment = file.current
        ? await s3Upload(file.current)
        : null;
  
      await createMirror(
        { 
          goal,
          conflictField,
          disaster,
          mirror,
          oneMoreTime,
          actionField,
          attachment 
        });
      props.history.push("/scenebuilder");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createMirror(mirror) {
    return API.post("mirrors", "/mirrors", {
      body: mirror
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
          New Mirror Scene
        </Breadcrumb.Item>
      </Breadcrumb>
      <h2>New Mirror Scene</h2>
      <form onSubmit={handleSubmit}>
          <h3>The Goal</h3>
            <FormGroup controlId="goal">
              <FormControl
                value={goal}
                as="textarea"
                onChange={e => setGoal(e.target.value)}
              />
            </FormGroup>
        <h3>The Conflict</h3>
          <FormGroup controlId="conflictField">
            <FormControl
              value={conflictField}
              as="textarea"
              onChange={e => setConflictField(e.target.value)}
            />
          </FormGroup>
          <h3>The Disaster</h3>
            <FormGroup controlId="disaster">
              <FormControl
                value={disaster}
                as="textarea"
                onChange={e => setDisaster(e.target.value)}
              />
            </FormGroup>
          <h3>The Mirror </h3>
            <FormGroup controlId="mirror">
              <FormControl
                value={mirror}
                as="textarea"
                onChange={e => setMirror(e.target.value)}
              />
            </FormGroup>
          <h3>One More Time</h3>
            <FormGroup controlId="oneMoreTime">
              <FormControl
                value={oneMoreTime}
                as="textarea"
                onChange={e => setOneMoreTime(e.target.value)}
              />
            </FormGroup>
          <h3>The Action</h3>
            <FormGroup controlId="actionField">
              <FormControl
                value={actionField}
                as="textarea"
                onChange={e => setActionField(e.target.value)}
              />
            </FormGroup>
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