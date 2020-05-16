import React, { useRef, useState } from "react";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "../../containers/NewNote.css";
import { Link } from "react-router-dom";

export default function NewClimax(props) {
  const file = useRef(null);
  const [struggle, setStruggle] = useState("");
  const [doubt, setDoubt] = useState("");
  const [unexpected, setUnexpected] = useState("");
  const [climax, setClimax] = useState("");
  const [poeticJustice, setPoeticJustice] = useState("");
  const [poeticReward, setPoeticReward] = useState("");
  const [wrapUp, setWrapUp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return struggle.length > 0;
  }

  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }

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
  
      await createClimax(
        { 
          struggle,
          doubt,
          unexpected,
          climax,
          poeticJustice,
          poeticReward,
          wrapUp,
          attachment 
        });
      props.history.push("/scenebuilder");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createClimax(climax) {
    return API.post("climaxs", "/climaxs", {
      body: climax
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
          New Climax Scene
        </Breadcrumb.Item>
      </Breadcrumb>
      <form onSubmit={handleSubmit}>
        <h2>New Climax Scene</h2>
          <h3>The Struggle</h3>
            <FormGroup controlId="struggle">
              <FormControl
                value={struggle}
                as="textarea"
                onChange={e => setStruggle(e.target.value)}
              />
            </FormGroup>
          <h3>The Doubt</h3>
            <FormGroup controlId="doubt">
              <FormControl
                value={doubt}
                as="textarea"
                onChange={e => setDoubt(e.target.value)}
              />
            </FormGroup>
          <h3>The Unexpected</h3>
            <FormGroup controlId="unexpected">
              <FormControl
                value={unexpected}
                as="textarea"
                onChange={e => setUnexpected(e.target.value)}
              />
            </FormGroup>
          <h3>The Climax</h3>
            <FormGroup controlId="climax">
              <FormControl
                value={climax}
                as="textarea"
                onChange={e => setClimax(e.target.value)}
              />
            </FormGroup>
          <h3>Poetic Justice</h3>
            <FormGroup controlId="poeticJustice">
              <FormControl
                value={poeticJustice}
                as="textarea"
                onChange={e => setPoeticJustice(e.target.value)}
              />
            </FormGroup>
          <h3>Poetic Reward</h3>
            <FormGroup controlId="poeticReward">
              <FormControl
                value={poeticReward}
                as="textarea"
                onChange={e => setPoeticReward(e.target.value)}
              />
            </FormGroup>
          <h3>Wrapping It Up</h3>
            <FormGroup controlId="wrapUp">
              <FormControl
                value={wrapUp}
                as="textarea"
                onChange={e => setWrapUp(e.target.value)}
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