import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ApproveVariety from "./ApproveVarietys";
import ApproveSpecies from "./ApproveSpecies";

const App = () => {
  return (
    <>
      <Router>
        <div class="container-fluid">
          <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
              <div class="sidebar-sticky">
                <ul class="nav flex-column">
                  <li class="nav-item bg-light">
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
                    <a class="nav-link" href="#">
                      Reports
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <span data-feather="layers"></span>
                      Integrations
                    </a>
                  </li>
                </ul>

                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Saved reports</span>
                  <a class="d-flex align-items-center text-muted" href="#">
                    <span data-feather="plus-circle"></span>
                  </a>
                </h6>
                <ul class="nav flex-column mb-2">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <span data-feather="file-text"></span>
                      Current month
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <span data-feather="file-text"></span>
                      Last quarter
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <span data-feather="file-text"></span>
                      Social engagement
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <span data-feather="file-text"></span>
                      Year-end sale
                    </a>
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
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};

export default hot(module)(App);
