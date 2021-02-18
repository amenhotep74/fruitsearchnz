import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ApproveVariety from "./ApproveVarietys";
import ApproveSpecies from "./ApproveSpecies";
import ViewOwners from "./ViewOwners";
import ViewUsers from "./ViewUsers";
import CurrentAdmins from "./CurrentAdmins";
import ApproveVolunteers from "./ApproveVolunteers";

const App = () => {
  return (
    <>
      <Router>
        <div class="container-fluid">
          <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
              <div class="sidebar-sticky d-flex">
                <ul class="nav flex-column justify-content-center d-flex">
                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      activeClassName="nav-link secondary text-dark"
                      to="/dashboard"
                    >
                      Approve Varietys <span class="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      activeClassName="nav-link secondary text-dark"
                      class="nav-link"
                      to="/dashboard/approvespecies"
                    >
                      Approve Species
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      activeClassName="nav-link secondary text-dark"
                      class="nav-link"
                      to="/dashboard/viewowners"
                    >
                      View Owners
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/dashboard/currentadmins">
                      Current Admins
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/dashboard/viewusers">
                      View Users
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/dashboard/approvevolunteers">
                      Approve Volunteers
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            {/* Columns here */}
            {/* Nav controls */}
            <Switch>
              <Route exact path="/dashboard">
                <ApproveVariety />
              </Route>
              <Route path="/dashboard/approvespecies">
                <ApproveSpecies />
              </Route>
              <Route path="/dashboard/viewowners">
                <ViewOwners />
              </Route>
              <Route path="/dashboard/viewusers">
                <ViewUsers />
              </Route>
              <Route path="/dashboard/currentadmins">
                <CurrentAdmins />
              </Route>
              <Route path="/dashboard/approvevolunteers">
                <ApproveVolunteers />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};

export default hot(module)(App);
