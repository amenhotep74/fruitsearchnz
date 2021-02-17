import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";

const CurrentAdmins = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState("");
  // Make request everytime component loads
  useEffect(() => {
    axios
      .get(`/adminactions/getalladmins`)
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
      .post("/adminactions/promotetoadmin", {
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
        <h1 class="h2">Current Admins</h1>
      </div>

      <h2>Users</h2>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>username</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((row) => (
                  <tr>
                    <td>{row.id}</td>
                    <td>{row.username}</td>
                    <td>{row.email}</td>
                    <td>{row.isAdmin == 1 && "Yes"}</td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default CurrentAdmins;
