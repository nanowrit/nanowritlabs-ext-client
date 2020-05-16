import React, { useRef, useState } from "react";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
import "../../containers/NewNote.css";
import { Link } from "react-router-dom";

export default function NewRecommitment(props) {
  const file = useRef(null);
  const [goal, setGoal] = useState("");
  const [conflictField, setConflictField] = useState("");
  const [revelation, setRevelation] = useState("");
  const [praiseTheEnemy, setPraiseTheEnemy] = useState("");
  const [doOrDie, setDoOrDie] = useState("");
  const [crossThreshold, setCrossThreshold] = useState("");
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
  
      await createRecommitment(
        { 
          goal,
          conflictField,
          revelation,
          praiseTheEnemy,
          doOrDie,
          crossThreshold,
          attachment 
        });
      props.history.push("/scenebuilder");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createRecommitment(recommitment) {
    return API.post("recommitments", "/recommitments", {
      body: recommitment
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
          New Recommitment Scene
        </Breadcrumb.Item>
      </Breadcrumb>
      <h2>New Recommitment Scene</h2>
      <form onSubmit={handleSubmit}>
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
          <Tab eventKey={3} title="3. The Revelation"> */}
          <h3>The Revelation</h3>
            <FormGroup controlId="revelation">
              <FormControl
                value={revelation}
                as="textarea"
                onChange={e => setRevelation(e.target.value)}
              />
            </FormGroup>
          {/* </Tab>
          <Tab eventKey={4} title="4. Praising The Enemy"> */}
          <h3>Praising the Enemy</h3>
            <FormGroup controlId="praiseTheEnemy">
              <FormControl
                value={praiseTheEnemy}
                as="textarea"
                onChange={e => setPraiseTheEnemy(e.target.value)}
              />
            </FormGroup>
          {/* </Tab>
          <Tab eventKey={5} title="5. Do or Die"> */}
          <h3>Do or Die</h3>
            <FormGroup controlId="doOrDie">
              <FormControl
                value={doOrDie}
                as="textarea"
                onChange={e => setDoOrDie(e.target.value)}
              />
            </FormGroup>
          {/* </Tab>
          <Tab eventKey={6} title="6. Crossing the Threshold"> */}
          <h3>Crossing the Threshold</h3>
            <FormGroup controlId="crossThreshold">
              <FormControl
                value={crossThreshold}
                as="textarea"
                onChange={e => setCrossThreshold(e.target.value)}
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
          Create
        </LoaderButton>
      </form>
    </div>
  );
}