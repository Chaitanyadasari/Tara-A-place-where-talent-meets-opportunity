import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/SignIn";
import Landing from "./components/Landing";
import TalentHome from "./components/Talent/Home";
import RecruiterHome from "./components/Recruiter/Home";
import UpdateProfile from "./components/Talent/UpdateProfile";
import CreateJob from "./components/Recruiter/CreateJob";
import JobDetail from "./components/Talent/JobDetail";
import TalentDetail from "./components/Recruiter/TalentDetail";
import Map from "./components/Talent/Map";
import UpdateRecruiterProfile from "./components/Recruiter/UpdateProfile";

import Matches from  "./components/Talent/Matches";
import RMatches from  "./components/Recruiter/Matches";

class Main extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <Route path="/" exact component={Landing} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={TalentHome} />
        <Route path="/recruiterhome" component={RecruiterHome} />
        <Route path="/updateprofile" component={UpdateProfile} />
        <Route path="/createjob" component={CreateJob} />
        <Route path="/matchedjobs" />
        <Route path="/jobdetail/:id" component={JobDetail} />
        <Route path="/talentdetail/:id" component={TalentDetail} />
        <Route path="/map" component={Map} />
        <Route path="/matches" component={Matches} />
        <Route path="/recruiterupdateprofile" component={UpdateRecruiterProfile} />
        <Route path="/rmatches/:id" component={RMatches} />




      </div>
    );
  }
}

export default Main;
