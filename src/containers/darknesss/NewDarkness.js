import React, { useRef, useState } from "react";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
// import config from "../../config";
import "../../containers/NewNote.css";
import { Link } from "react-router-dom";

export default function NewDarkness(props) {
  const file = useRef(null);
  const [goal, setGoal] = useState("");
  const [conflictField, setConflictField] = useState("");
  const [ultimateDisaster, setUltimateDisaster] = useState("");
  const [darkestMoment, setDarkestMoment] = useState("");
  const [oneChance, setOneChance] = useState("");
  const [doAndDie, setDoAndDie] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return goal.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const attachment = file.current
        ? await s3Upload(file.current)
        : null;
  
      await createDarkness(
        { 
          goal,
          conflictField,
          ultimateDisaster,
          darkestMoment,
          oneChance,
          doAndDie,
          attachment 
        });
      props.history.push("/scenebuilder");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createDarkness(darkness) {
    return API.post("darknesss", "/darknesss", {
      body: darkness
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
          New Darkness Scene
        </Breadcrumb.Item>
      </Breadcrumb>
      <form onSubmit={handleSubmit}>
        <h2>New Darkness Scene</h2>
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
          <h3>The Ultimate Disaster</h3>
            <FormGroup controlId="ultimateDisaster">
              <FormControl
                value={ultimateDisaster}
                as="textarea"
                onChange={e => setUltimateDisaster(e.target.value)}
              />
            </FormGroup>
          <h3>The Darkest Moment</h3>
            <FormGroup controlId="darkestMoment">
              <FormControl
                value={darkestMoment}
                as="textarea"
                onChange={e => setDarkestMoment(e.target.value)}
              />
            </FormGroup>
          <h3>One Chance</h3>
            <FormGroup controlId="oneChance">
              <FormControl
                value={oneChance}
                as="textarea"
                onChange={e => setOneChance(e.target.value)}
              />
            </FormGroup>
          <h3>Do and Die</h3>
            <FormGroup controlId="doAndDie">
              <FormControl
                value={doAndDie}
                as="textarea"
                onChange={e => setDoAndDie(e.target.value)}
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