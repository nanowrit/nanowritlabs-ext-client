import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import config from './config';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "beginnings",
        endpoint: config.apiSceneBuilder.URL,
        region: config.apiSceneBuilder.REGION
      },
      {
        name: "mirrors",
        endpoint: config.apiSceneBuilder.URL,
        region: config.apiSceneBuilder.REGION      
      },
      {
        name: "darknesss",
        endpoint: config.apiSceneBuilder.URL,
        region: config.apiSceneBuilder.REGION
      },
      {
        name: "fillers",
        endpoint: config.apiSceneBuilder.URL,
        region: config.apiSceneBuilder.REGION
      },
      {
        name: "recommitments",
        endpoint: config.apiSceneBuilder.URL,
        region: config.apiSceneBuilder.REGION
      },
      {
        name: "climaxs",
        endpoint: config.apiSceneBuilder.URL,
        region: config.apiSceneBuilder.REGION
      },
      {
        name: "classicStories",
        endpoint: config.apiLibrary.URL,
        region: config.apiLibrary.REGION
      },
      {
        name: "authors",
        endpoint: config.apiLibrary.URL,
        region: config.apiLibrary.REGION
      },
      {
        name: "premises",
        endpoint: config.apiPremiseBuilder.URL,
        region: config.apiPremiseBuilder.REGION
      }
    ]
  }
});

ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
