import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";

const ApproveVolunteers = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState("");
  // Make request everytime component loads
  useEffect(() => {
    axios
      .get(`/adminactions/getallvolunteers`)
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

  // If no data yet return loading...
  // if (!data || data.length === 0) return <p>Loading...</p>;

  const handleApprove = (e) => {
    e.preventDefault();
    const id = e.target.value;
    console.log("handleaprove clicked!");
    console.log(id);
    // make request to backend with the ID.
    axios
      .post("/adminactions/volunteers/approve", {
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
      .post("/adminactions/volunteers/reject", {
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
        <h1 class="h2">Approve Volunteers</h1>
      </div>

      <h2>Volunteers awaiting approval</h2>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Province</th>
              <th>Country</th>
              <th>Skills</th>
              <th>Experience</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((row) => (
                <tr>
                  <td>{row.id}</td>
                  <td>{row.username}</td>
                  <td>{row.firstname}</td>
                  <td>{row.lastname}</td>
                  <td>{row.address}</td>
                  <td>{row.province}</td>
                  <td>{row.country}</td>
                  <td>{row.skills}</td>
                  <td>{row.experience}</td>
                  <td>
                    <button
                      value={row.id}
                      onClick={handleApprove}
                      className="btn btn-success mr-1"
                    >
                      Approve
                    </button>
                    <button
                      value={row.varietyID}
                      onClick={handleReject}
                      className="btn btn-danger ml-1"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>Loading</p>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ApproveVolunteers;
