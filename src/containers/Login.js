import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import FacebookButton from "../components/FacebookButton";
import "./Login.css";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleFbLogin() {
    props.userHasAuthenticated(true);
  };

  return (
    <div className="Login">
      <h4 className="pale-silver center">Log in with: </h4>
      <br />
      <FacebookButton className="FacebookButton" onLogin={handleFbLogin} />
      <hr />
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" size="lg">
          <FormLabel className="pale-silver">Email</FormLabel>
          <FormControl
            autoFocus
            type="email" 
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel className="pale-silver">Password</FormLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <Link className="spanish-gray" to="/login/reset">Forgot password?</Link>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}