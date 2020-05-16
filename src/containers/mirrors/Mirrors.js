import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";
import "../../containers/Notes.css";
import { Link } from "react-router-dom";

export default function Mirror(props) {
    const file = useRef(null);
    const [mirror, setMirror] = useState(null);
    const [goal, setGoal] = useState("");
    const [conflictField, setConflictField] = useState("");
    const [disaster, setDisaster] = useState("");
    const [mirrorMoment, setMirrorMoment] = useState("");
    const [oneMoreTime, setOneMoreTime] = useState("");
    const [actionField, setActionField] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadMirror() {
      return API.get("mirrors", `/mirrors/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const mirror = await loadMirror();
        const { 
          goal, 
          conflictField, 
          disaster,
          mirrorMoment, 
          oneMoreTime,
          actionField,
          attachment } = mirror;

        if (attachment) {
          mirror.attachmentURL = await Storage.vault.get(attachment);
        }

        setGoal(goal);
        setConflictField(conflictField);
        setDisaster(disaster);
        setMirrorMoment(mirrorMoment);
        setOneMoreTime(oneMoreTime);
        setActionField(actionField);
        setMirror(mirror);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return goal.length > 0 || conflictField.length > 0 || disaster.length > 0 || mirrorMoment.length > 0 || oneMoreTime.length > 0 || actionField.length > 0;
  }
  
  function saveMirror(mirror) {
    return API.put("mirrors", `/mirrors/${props.match.params.id}`, {
      body: mirror
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
  
      await saveMirror({
        goal,
        conflictField,
        disaster,
        mirrorMoment,
        oneMoreTime,
        actionField,
        attachment: attachment || mirror.attachment
      });
      props.history.push("/scenebuilder");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteMirror() {
    return API.del("mirrors", `/mirrors/${props.match.params.id}`);
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
      await deleteMirror();
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
          The Mirror Scene
        </Breadcrumb.Item>
      </Breadcrumb>
      {mirror && (
        <form onSubmit={handleSubmit}>
          <h2>Your Mirror Scene</h2>
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
            <Tab eventKey={3} title="3. The Disaster"> */}
            <h3>The Disaster</h3>
              <FormGroup controlId="disaster">
                <FormControl
                  value={disaster}
                  as="textarea"
                  onChange={e => setDisaster(e.target.value)}
                />
              </FormGroup>
            {/* </Tab>
            <Tab eventKey={4} title="4. The Mirror Moment"> */}
            <h3>The Mirror Moment</h3>
              <FormGroup controlId="mirrorMoment">
                <FormControl
                  value={mirrorMoment}
                  as="textarea"
                  onChange={e => setMirrorMoment(e.target.value)}
                />
              </FormGroup>
            {/* </Tab>
            <Tab eventKey={5} title="5. One More Time"> */}
            <h3>One More Time</h3>
              <FormGroup controlId="oneMoreTime">
                <FormControl
                  value={oneMoreTime}
                  as="textarea"
                  onChange={e => setOneMoreTime(e.target.value)}
                />
              </FormGroup>
            {/* </Tab>
            <Tab eventKey={6} title="6. The Action"> */}
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