import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";
import "../../containers/Notes.css";
import { Link } from "react-router-dom";

export default function Darkness(props) {
    const file = useRef(null);
    const [darkness, setDarkness] = useState(null);
    const [goal, setGoal] = useState("");
    const [conflictField, setConflictField] = useState("");
    const [ultimateDisaster, setUltimateDisaster] = useState("");
    const [darkestMoment, setDarkestMoment] = useState("");
    const [oneChance, setOneChance] = useState("");
    const [doAndDie, setDoAndDie] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadDarkness() {
      return API.get("darknesss", `/darknesss/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const darkness = await loadDarkness();
        const { 
          goal, 
          conflictField, 
          ultimateDisaster,
          darkestMoment, 
          oneChance,
          doAndDie,
          attachment } = darkness;

        if (attachment) {
          darkness.attachmentURL = await Storage.vault.get(attachment);
        }

        setGoal(goal);
        setConflictField(conflictField);
        setUltimateDisaster(ultimateDisaster);
        setDarkestMoment(darkestMoment);
        setOneChance(oneChance);
        setDoAndDie(doAndDie);
        setDarkness(darkness);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return goal.length > 0 || conflictField.length > 0 || ultimateDisaster.length > 0 || darkestMoment.length > 0 || oneChance.length > 0 || doAndDie.length > 0;
  }
  
  // function formatFilename(str) {
  //   return str.replace(/^\w+-/, "");
  // }
  
  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }
  
  function saveDarkness(darkness) {
    return API.put("darknesss", `/darknesss/${props.match.params.id}`, {
      body: darkness
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
  
      await saveDarkness({
        goal,
        conflictField,
        ultimateDisaster,
        darkestMoment,
        oneChance,
        doAndDie,
        attachment: attachment || darkness.attachment
      });
      props.history.push("/scenebuilder");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteDarkness() {
    return API.del("darknesss", `/darknesss/${props.match.params.id}`);
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
      await deleteDarkness();
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
          New Darkness Scene
        </Breadcrumb.Item>
      </Breadcrumb>
      {darkness && (
        <form onSubmit={handleSubmit}>
          <h2>The Darkness Scene</h2>
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
      <Breadcrumb></Breadcrumb>
    </div>
  );
}