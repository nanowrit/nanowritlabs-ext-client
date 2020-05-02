import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../../../components/LoaderButton";
import { s3Upload } from "../../../libs/awsLib";
import config from "../../../config";
import "../../../containers/Notes.css";

export default function Author(props) {
    const file = useRef(null);
    const [author, setAuthor] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [born, setBorn] = useState("");
    const [died, setDied] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadAuthor() {
      return API.get("authors", `/authors/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const author = await loadAuthor();
        const { 
            firstName,
            middleName,
            lastName,
            born,
            died,
          attachment } = author;

        if (attachment) {
          author.attachmentURL = await Storage.vault.get(attachment);
        }

        setFirstName(firstName);
        setMiddleName(middleName);
        setLastName(lastName);
        setBorn(born);
        setDied(died);
        setAuthor(author);
      } catch (e) {
        console.log(e);
        // alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return firstName.length > 0 || middleName.length > 0 || lastName.length > 0 || born.length > 0 || died.length > 0;
  }
  
  // function formatFilename(str) {
  //   return str.replace(/^\w+-/, "");
  // }
  
  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }
  
  function saveAuthor(author) {
    return API.put("authors", `/authors/${props.match.params.id}`, {
      body: author
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
  
      await saveAuthor({
        firstName,
        middleName,
        lastName,
        born,
        died,
        attachment: attachment || author.attachment
      });
      props.history.push("/classicStories");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteAuthor() {
    return API.del("authors", `/authors/${props.match.params.id}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this author?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteAuthor();
      props.history.push("/classicStories");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  function RenderAuthorStories() {
      return (
          <div className="Notes">
              {author && (
                  <h2>{author.firstName} {author.middleName} {author.lastName}'s Story Collection</h2>
              )}
          </div>
      )
  }

  function RenderUpdateAuthorForm() {
      return (
        <div className="Notes">
        {author && (
          <form onSubmit={handleSubmit}>
            <h2>Edit {author.firstName} {author.middleName} {author.lastName}'s Author Profile</h2>
                <FormGroup controlId="firstName">
                  <h4>First Name</h4>
                  <FormControl
                    value={firstName}
                    type="text"
                    onChange={e => setFirstName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId="middleName">
                  <h4>Middle Name</h4>
                  <FormControl
                    value={middleName}
                    type="text"
                    onChange={e => setMiddleName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId="lastName">
                    <h4>Last Name</h4>
                  <FormControl
                    value={lastName}
                    type="text"
                    onChange={e => setLastName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId="born">
                    <h4>Date of Birth</h4>
                  <FormControl
                    value={born}
                    type="text"
                    onChange={e => setBorn(e.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId="died">
                    <h4>Date of Death</h4>
                  <FormControl
                    value={died}
                    type="text"
                    onChange={e => setDied(e.target.value)}
                  />
                </FormGroup>
            {/* {beginning.attachment && (
              <FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={beginning.attachmentURL}
                  >
                    {formatFilename(beginning.attachment)}
                  </a>
                </FormControl.Static>
              </FormGroup>
            )} */}
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
      )
  }
  
  return (
    <div>
        <RenderAuthorStories />
        {/* The RenderUpdateForm should render conditionally for only the admin user */}
        <RenderUpdateAuthorForm />
    </div>
  );
}