import React from "react";
// import { API } from "aws-amplify";
// import { Elements, StripeProvider } from "react-stripe-elements";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
// import BillingForm from "../components/BillingForm";
// import config from "../config";
import "./Settings.css";

export default function Settings(props) {
  // const [isLoading, setIsLoading] = useState(false);

  // function billUser(details) {
  //   return API.post("notes", "/billing", {
  //     body: details
  //   });
  // }

  // async function handleFormSubmit(storage, { token, error }) {
  //   if (error) {
  //     alert(error);
  //     return;
  //   }
  
  //   // setIsLoading(true);
  
  //   try {
  //     await billUser({
  //       storage,
  //       source: token.id
  //     });
  
  //     alert("Your card has been charged successfully!");
  //     props.history.push("/");
  //   } catch (e) {
  //     alert(e);
  //     // setIsLoading(false);
  //   }
  // }

  // async function handleSubmit(event) {
  //   event.preventDefault();

  //   setIsLoading(true);

  //   try {
  //     fetch("www.patreon.com/oauth2/authorize?response_type=code&client_id=vayh2G_7h1Qlxh0epJx3fr-P39UQtAE11DDC2hfKVU4Qm2HcaNfeEBHsuKKOwUff&redirect_uri=http://localhost:3000&scope=<optional list of requested scopes>&state=<optional string>")
  //     // await Auth.signIn(fields.email, fields.password);
  //     // props.userHasAuthenticated(true);
  //   } catch (e) {
  //     alert(e.message);
  //     setIsLoading(false);
  //   }
  // }
  
  return (
    <div className="Settings">
      <LinkContainer to="/settings/email">
        <LoaderButton
          block
          size="lg"
        >
          Change Email
        </LoaderButton>
      </LinkContainer>
      <LinkContainer to="/settings/password">
        <LoaderButton
          block
          size="lg"
        >
          Change Password
        </LoaderButton>
      </LinkContainer>
      {/* <a  href="https://www.patreon.com/oauth2/authorize?response_type=code&client_id=vayh2G_7h1Qlxh0epJx3fr-P39UQtAE11DDC2hfKVU4Qm2HcaNfeEBHsuKKOwUff&redirect_uri=http://localhost:3000/patreon-connect&scope=users+my-campaign">
        <LoaderButton
          block
          size="lg"
          variant="danger"
        >
          Connect with Patreon
        </LoaderButton>
      </a> */}
      {/* <StripeProvider apiKey={config.STRIPE_KEY}>
        <Elements>
          <BillingForm
            isLoading={isLoading}
            onSubmit={handleFormSubmit}
          />
        </Elements>
      </StripeProvider> */}
    </div>
  );
}