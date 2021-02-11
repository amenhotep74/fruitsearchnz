import React from "react";

const ApproveSpecies = () => {
  return (
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 class="h2">Aprrove Species</h1>
      </div>

      <h2>Species</h2>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Characteristics</th>
              <th>Submited</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button class="btn btn-success mr-1">Approve</button>
                <button class="btn btn-danger ml-1">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ApproveSpecies;
