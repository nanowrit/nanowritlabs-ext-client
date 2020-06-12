const dev = {
  STRIPE_KEY: "pk_test_mFOTEjCRlK8aWZYn2OBtz5PD00C6giAjRT",
  s3: {
    REGION: "us-west-2",
    BUCKET: "nanowritlabs-app-ext-scenebuider-uploads-s3bucket-ydu69bnunnjv"
  },
  apiSceneBuilder: {
    REGION: "us-west-2",
    URL: "https://k9qztc7af6.execute-api.us-west-2.amazonaws.com/dev"
  },
  apiPremiseBuilder: {
    REGION: "us-west-2",
    URL: "https://rp8f1mn6w1.execute-api.us-west-2.amazonaws.com/dev"
  },
  apiLibrary: {
    REGION: "us-west-2",
    URL: "https://3spu9eivs9.execute-api.us-west-2.amazonaws.com/dev"
  },
  apiPatreonOAuth: {
    REGION: "us-west-2",
    URL: "efbfbdeb"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_QokOSpn4n",
    APP_CLIENT_ID: "6ic5b6g580i81e3gn8hbiedps2",
    IDENTITY_POOL_ID: "us-west-2:3aef7dda-25d5-4d13-b007-1aedb9bc819b"
  },
  social: {
    FB: "891073078019739",
    Patreon: ""
  },
  instructions: {
    instructionsUsersname: "SBInstructionsAdmin@nanowritlabs.com",
    instructionUsersPassword: "kanriv-nodfIc-6fujjo" 
  }
};

const prod = {
  STRIPE_KEY: "pk_test_mFOTEjCRlK8aWZYn2OBtz5PD00C6giAjRT",
  s3: {
    REGION: "us-west-2",
    BUCKET: "scenebuilder-app-api-dev-attachmentsbucket-1ul2thctht74v"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://rl1hl9t5z8.execute-api.us-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_Xff92vaow",
    APP_CLIENT_ID: "2efvaf28f81fn6c0ij0oi6892b",
    IDENTITY_POOL_ID: "us-west-2:0b3e359e-a56d-47e5-afdf-bd35f67f068f"
  },
  social: {
    FB: "891073078019739"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};