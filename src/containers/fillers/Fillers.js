import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";
import "../../containers/Notes.css";
import { Link } from "react-router-dom";

export default function Filler(props) {
    const file = useRef(null);
    const [filler, setFiller] = useState(null);
    const [goal, setGoal] = useState("");
    const [conflictField, setConflictField] = useState("");
    const [dilemma, setDilemma] = useState("");
    const [decision, setDecision] = useState("");
    const [actionField, setActionField] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadFiller() {
      return API.get("fillers", `/fillers/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const filler = await loadFiller();
        const { 
          goal, 
          conflictField, 
          dilemma,
          decision, 
          actionField,
          attachment } = filler;

        if (attachment) {
          filler.attachmentURL = await Storage.vault.get(attachment);
        }

        setGoal(goal);
        setConflictField(conflictField);
        setDilemma(dilemma);
        setDecision(decision);
        setActionField(actionField);
        setFiller(filler);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return goal.length > 0 || conflictField.length > 0 || dilemma.length > 0 || decision.length > 0|| actionField.length > 0;
  }
  
  function saveFiller(filler) {
    return API.put("fillers", `/fillers/${props.match.params.id}`, {
      body: filler
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
  
      await saveFiller({
        goal,
        conflictField,
        dilemma,
        decision,
        actionField,
        attachment: attachment || filler.attachment
      });
      props.history.push("/scenebuilder");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteFiller() {
    return API.del("fillers", `/fillers/${props.match.params.id}`);
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
      await deleteFiller();
      props.history.push("/scenebuilder");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
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
          The Filler Scene
        </Breadcrumb.Item>
      </Breadcrumb>
      {filler && (
        <form onSubmit={handleSubmit}>
          <h2>The Filler Scene</h2>
          {/* <Tabs defaultActiveKey={1} id="uncontrolled-tab">
            <Tab eventKey={1} title="1. The Goal"> */}
            <h3>The Goal</h3>
              <FormGroup controlId="goal">
                <FormControl
                  value={goal}
                  as="textarea"
                  onChange={e => setGoal(e.target.value)}
                />
              </FormGroup>
            {/* </Tab>
            <Tab eventKey={2} title="2. The Conflict"> */}
            <h3>The Conflict</h3>
              <FormGroup controlId="conflictField">
                <FormControl
                  value={conflictField}
                  as="textarea"
                  onChange={e => setConflictField(e.target.value)}
                />
              </FormGroup>
            {/* </Tab>
            <Tab eventKey={3} title="3. The Dilemma"> */}
            <h3>The Dilemma</h3>
              <FormGroup controlId="dilemma">
                <FormControl
                  value={dilemma}
                  as="textarea"
                  onChange={e => setDilemma(e.target.value)}
                />
              </FormGroup>
            {/* </Tab>
            <Tab eventKey={4} title="4. The Decision"> */}
            <h3>The Decision</h3>
              <FormGroup controlId="decision">
                <FormControl
                  value={decision}
                  as="textarea"
                  onChange={e => setDecision(e.target.value)}
                />
              </FormGroup>
            {/* </Tab>
            <Tab eventKey={5} title="5. The Action"> */}
            <h3>The Action</h3>
              <FormGroup controlId="actionField">
                <FormControl
                  value={actionField}
                  as="textarea"
                  onChange={e => setActionField(e.target.value)}
                />
              </FormGroup>
            {/* </Tab>
          </Tabs> */}
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