import React, { useState } from "react";
import { FormGroup, FormControl, Container, Col } from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "../../../components/LoaderButton";
// import config from "../../config";
import "../../../containers/NewNote.css";

export default function NewAuthor(props) {
//   const file = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [born, setBorn] = useState("");
  const [died, setDied] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return firstName.length > 0 && lastName.length > 0;
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
    //   const attachment = file.current
    //     ? await s3Upload(file.current)
    //     : null;
  
      await createAuthor(
        { 
          firstName,
          middleName,
          lastName,
          born,
          died
        });
      props.history.push("/classicStories");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createAuthor(author) {
    return API.post("authors", "/authors", {
      body: author
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <h2>Input New Author</h2>
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

            <Container>
                <Col  md={6}>
                    <FormGroup controlId="born">
                        <h4>Date of Birth</h4>
                            <FormControl
                                value={born}
                                type="date"
                                onChange={e => setBorn(e.target.value)}
                            />
                    </FormGroup>
                </Col>
                <Col  md={6}>
                    <FormGroup controlId="died">
                        <h4>Date of Death</h4>
                            <FormControl
                                value={died}
                                type="date"
                                onChange={e => setDied(e.target.value)}
                            />
                    </FormGroup>
                </Col>
            </Container>

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