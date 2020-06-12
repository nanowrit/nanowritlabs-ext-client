import React from "react";
import { Route, Switch } from "react-router-dom";
import SceneBuilder from "./containers/SceneBuilder";
import PremiseBuilder from "./containers/premiseBuilder/PremiseBuilder";
import Premises from "./containers/premiseBuilder/Premises";
import NewPremise from "./containers/premiseBuilder/NewPremise";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Beginnings from "./containers/beginnings/Beginnings";
import NewBeginning from "./containers/beginnings/NewBeginning";
import Mirrors from "./containers/mirrors/Mirrors";
import NewMirror from "./containers/mirrors/NewMirror";
import Darkness from "./containers/darknesss/Darknesss";
import NewDarkness from "./containers/darknesss/NewDarkness";
import Filler from "./containers/fillers/Fillers";
import NewFiller from "./containers/fillers/NewFiller";
import Recommitment from "./containers/recommitments/Recommitments";
import NewRecommitment from "./containers/recommitments/NewRecommitment";
import Climax from "./containers/climaxs/Climaxs";
import NewClimax from "./containers/climaxs/NewClimax";
import Settings from "./containers/Settings";
// import PatreonConnect from "./containers/PatreonConnect";
import ChangeEmail from "./containers/ChangeEmail";
import ResetPassword from "./containers/ResetPassword";
import ChangePassword from "./containers/ChangePassword";
import Library from "./containers/Library";
import Laboratory from "./containers/Laboratory";

import Instructionals from "./containers/library/instructionals/Instructionals";
import Instructional from "./containers/library/instructionals/Instructional";
import NewInstructional from "./containers/library/instructionals/NewInstructional";

import StorySeeds from "./containers/library/StorySeeds/StorySeeds";
import StorySeed from "./containers/library/StorySeeds/StorySeed";
import NewStorySeed from "./containers/library/StorySeeds/NewStorySeed";

import ClassicStories from "./containers/library/ClassicStories/ClassicStories";
import NewClassicStory from "./containers/library/ClassicStories/NewClassicStory";
import ClassicStory from "./containers/library/ClassicStories/ClassicStory";

import ModernStories from "./containers/library/ModernStories/ModernStories";
import NewModernStory from "./containers/library/ModernStories/NewModernStory";
import ModernStory from "./containers/library/ModernStories/ModernStory";

import NewAuthor from "./containers/library/Authors/NewAuthor";
import Authors from "./containers/library/Authors/Authors";

import TermsOfUse from "./containers/TermsOfUse";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import Lander from "./containers/Lander";

export default function Routes({ appProps }) {
  return (
    <Switch>
      {/* Home Route */}
      <AppliedRoute path="/" exact component={Lander} appProps={appProps} />
      <AppliedRoute path="/home" exact component={Lander} appProps={appProps} />

      {/* Admin Routes */}
      {/* <UnauthenticatedRoute path="/cookie-policy" exact component={CookiePolicy} appProps={appProps} />
      <UnauthenticatedRoute path="/privacy-policy" exact component={PrivacyPolicy} appProps={appProps} />
      <UnauthenticatedRoute path="/terms-of-use" exact component={TermsOfUse} appProps={appProps} /> */}


      {/* Login and Settings routes */}
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
      <AuthenticatedRoute path="/settings/email" exact component={ChangeEmail} appProps={appProps} />
      <UnauthenticatedRoute path="/login/reset" exact component={ResetPassword} appProps={appProps} />
      <AuthenticatedRoute path="/settings/password" exact component={ChangePassword} appProps={appProps} />

      {/* Lobby Routes */}
      <Route path="/library" exact component={Library} appProps={appProps} />
      <AppliedRoute path="/laboratory" exact component={Laboratory} appProps={appProps} />

      {/* Laboratory Routes */}
      <AuthenticatedRoute path="/scenebuilder" exact component={SceneBuilder} appProps={appProps} />

      {/* Library Routes */}
      <AppliedRoute path="/classicStories" exact component={ClassicStories} appProps={appProps} />
      <AuthenticatedRoute path="/classicStories/new" exact component={NewClassicStory} appProps={appProps} />
      <AppliedRoute path="/classicStories/:id" exact component={ClassicStory} appProps={appProps} />

      <AppliedRoute path="/modernStories" exact component={ModernStories} appProps={appProps} />
      <AuthenticatedRoute path="/modernStories/new" exact component={NewModernStory} appProps={appProps} />
      <AppliedRoute path="/modernStories/:id" exact component={ModernStory} appProps={appProps} />

      <AppliedRoute path="/the-craft" exact component={Instructionals} appProps={appProps} />
      <AppliedRoute path="/the-craft/new" exact component={NewInstructional} appProps={appProps} />
      <AppliedRoute path="/the-craft/:id" exact component={Instructional} appProps={appProps} />

      <AppliedRoute path="/storyseeds" exact component={StorySeeds} appProps={appProps} />
      <AuthenticatedRoute path="/storyseeds/new" exact component={NewStorySeed} appProps={appProps} />
      <AppliedRoute path="/storyseeds/:id" exact component={StorySeed} appProps={appProps} />

      <AuthenticatedRoute path="/authors/new" exact component={NewAuthor} appProps={appProps} />
      <AuthenticatedRoute path="/authors/:id" exact component={Authors} appProps={appProps} />

      {/* PremiseBuilder Routes */}
      <AuthenticatedRoute path="/premisebuilder" exact component={PremiseBuilder} appProps={appProps} />
      <AuthenticatedRoute path="/premises/new" exact component={NewPremise} appProps={appProps} />
      <AuthenticatedRoute path="/premises/:id" exact component={Premises} appProps={appProps} />

      {/* SceneBuilder Routes */}
      <AuthenticatedRoute path="/scenebuilder" exact component={SceneBuilder} appProps={appProps} />
      <AuthenticatedRoute path="/beginnings/new" exact component={NewBeginning} appProps={appProps} />
      <AuthenticatedRoute path="/beginnings/:id" exact component={Beginnings} appProps={appProps} />
      <AuthenticatedRoute path="/mirrors/new" exact component={NewMirror} appProps={appProps} />
      <AuthenticatedRoute path="/mirrors/:id" exact component={Mirrors} appProps={appProps} />
      <AuthenticatedRoute path="/darknesss/new" exact component={NewDarkness} appProps={appProps} />
      <AuthenticatedRoute path="/darknesss/:id" exact component={Darkness} appProps={appProps} />
      <AuthenticatedRoute path="/fillers/new" exact component={NewFiller} appProps={appProps} />
      <AuthenticatedRoute path="/fillers/:id" exact component={Filler} appProps={appProps} />
      <AuthenticatedRoute path="/recommitments/new" exact component={NewRecommitment} appProps={appProps} />
      <AuthenticatedRoute path="/recommitments/:id" exact component={Recommitment} appProps={appProps} />
      <AuthenticatedRoute path="/climaxs/new" exact component={NewClimax} appProps={appProps} />
      <AuthenticatedRoute path="/climaxs/:id" exact component={Climax} appProps={appProps} />

      {/* API Redirect Routes */}
      {/* <AuthenticatedRoute path="/patreon-connect" exact component={PatreonConnect} appProps={appProps} /> */}
      {/* <AuthenticatedRoute path="/patreon-connect/:code" exact component={PatreonCode} appProps={appProps} /> */}

      {/* Utility Routes */}
      <Route path="/terms-of-use" exact component={TermsOfUse} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}