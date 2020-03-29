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
  
  return (
    <div className="Settings">
      <LinkContainer to="/settings/email">
          <LoaderButton
            block
            bsSize="large"
          >
            Change Email
          </LoaderButton>
        </LinkContainer>
        <LinkContainer to="/settings/password">
          <LoaderButton
            block
            bsSize="large"
          >
            Change Password
          </LoaderButton>
        </LinkContainer>
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