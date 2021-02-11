import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";

const ApproveSpecies = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState("");
  // Make request everytime component loads
  useEffect(() => {
    axios
      .get(`/adminactions/getallspecies`)
      .then((response) => {
        console.log(response);
        // update state with data
        setData(response.data);
        console.log("Use effect triggered!");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [refresh]);

  const handleApprove = (e) => {
    e.preventDefault();
    const id = e.target.value;
    console.log("handleaprove clicked!");
    console.log(id);
    // make request to backend with the ID.
    axios
      .post("/adminactions/species/approve", {
        id: id,
      })
      .then((response) => {
        // Trigger refresh?
        console.log("Then refresh");
        setRefresh(response);
      })
      .catch((err) => console.log(err));
  };

  const handleReject = (e) => {
    e.preventDefault();
    const id = e.target.value;
    console.log("handlereject clicked!");
    console.log(id);
    // make request to backend with the ID.
    axios
      .post("/adminactions/species/reject", {
        id: id,
      })
      .then((response) => {
        // Trigger refresh?
        console.log("Then refresh");
        setRefresh(response);
      })
      .catch((err) => console.log(err));
  };

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
              <th>Genus</th>
              <th>Submited</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((row) => (
                  <tr>
                    <td>{row.specieID}</td>
                    <td>{row.name}</td>
                    <td>{row.genus}</td>
                    <td>{row.createdAt}</td>
                    <td>
                      <button
                        value={row.specieID}
                        onClick={handleApprove}
                        class="btn btn-success mr-1"
                      >
                        Approve
                      </button>
                      <button
                        value={row.specieID}
                        onClick={handleReject}
                        class="btn btn-danger ml-1"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ApproveSpecies;
