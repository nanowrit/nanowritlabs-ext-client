import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";
import "../../containers/Notes.css";
import { Link } from "react-router-dom";

export default function Recommitment(props) {
    const file = useRef(null);
    const [recommitment, setRecommitment] = useState(null);
    const [goal, setGoal] = useState("");
    const [conflictField, setConflictField] = useState("");
    const [revelation, setRevelation] = useState("");
    const [praiseTheEnemy, setPraiseTheEnemy] = useState("");
    const [doOrDie, setDoOrDie] = useState("");
    const [crossThreshold, setCrossThreshold] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadRecommitment() {
      return API.get("recommitments", `/recommitments/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const recommitment = await loadRecommitment();
        const { 
          goal, 
          conflictField, 
          revelation,
          praiseTheEnemy, 
          doOrDie,
          crossThreshold,
          attachment } = recommitment;

        if (attachment) {
          recommitment.attachmentURL = await Storage.vault.get(attachment);
        }

        setGoal(goal);
        setConflictField(conflictField);
        setRevelation(revelation);
        setPraiseTheEnemy(praiseTheEnemy);
        setDoOrDie(doOrDie);
        setCrossThreshold(crossThreshold);
        setRecommitment(recommitment);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return goal.length > 0 || conflictField.length > 0 || revelation.length > 0 || praiseTheEnemy.length > 0 || doOrDie.length > 0 || crossThreshold.length > 0;
  }

  function saveRecommitment(recommitment) {
    return API.put("recommitments", `/recommitments/${props.match.params.id}`, {
      body: recommitment
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
  
      await saveRecommitment({
        goal,
        conflictField,
        revelation,
        praiseTheEnemy,
        doOrDie,
        crossThreshold,
        attachment: attachment || recommitment.attachment
      });
      props.history.push("/scenebuilder");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteRecommitment() {
    return API.del("recommitments", `/recommitments/${props.match.params.id}`);
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
      await deleteRecommitment();
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
          The Recommitment Scene
        </Breadcrumb.Item>
      </Breadcrumb>
      {recommitment && (
        <form onSubmit={handleSubmit}>
          <h2>Your Recommitment Scene</h2>
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
            <h3>The Revelation</h3>
              <FormGroup controlId="revelation">
                <FormControl
                  value={revelation}
                  as="textarea"
                  onChange={e => setRevelation(e.target.value)}
                />
              </FormGroup>
            <h3>Praising the Enemy</h3>
              <FormGroup controlId="praiseTheEnemy">
                <FormControl
                  value={praiseTheEnemy}
                  as="textarea"
                  onChange={e => setPraiseTheEnemy(e.target.value)}
                />
              </FormGroup>
            <h3>Do or Die</h3>
              <FormGroup controlId="doOrDie">
                <FormControl
                  value={doOrDie}
                  as="textarea"
                  onChange={e => setDoOrDie(e.target.value)}
                />
              </FormGroup>
            <h3>Crossing the Threshold</h3>
              <FormGroup controlId="crossThreshold">
                <FormControl
                  value={crossThreshold}
                  as="textarea"
                  onChange={e => setCrossThreshold(e.target.value)}
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