import React, { useState } from "react";
import { Auth } from "aws-amplify";
import FacebookButton from "../components/FacebookButton";

import {
  FormGroup,
  FormControl,
  FormLabel,
  Form
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleFbLogin() {
    props.userHasAuthenticated(true);
  };
  
  async function handleConfirmationSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
  
      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <FormLabel>Confirmation Code</FormLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text className="spanish-gray">Please check your email for the code.</Form.Text>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <div>
        <h4 className="spanish-gray center">Sign up with: </h4>
        <br />
        <FacebookButton onLogin={handleFbLogin} />
        <hr />
        <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel className="spanish-gray">Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel className="spanish-gray">Password</FormLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <FormLabel className="spanish-gray">Confirm Password</FormLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <br />
        <LoaderButton
          block
          className="dark-goldenrod"
          type="submit"
          size="lg"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
      </div>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}