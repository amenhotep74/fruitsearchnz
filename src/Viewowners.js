import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";

const ViewOwners = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState("");
  // Make request everytime component loads
  useEffect(() => {
    axios
      .get(`/adminactions/getallowners`)
      .then((response) => {
        console.log(response);
        // update state with data
        setData(response.data);
        console.log("Use effect triggered!");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  // If no data yet return loading...
  // if (!data || data.length === 0) return <p>Loading...</p>;

  return (
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <h2>Owners</h2>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>ownerID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((row) => (
                <tr>
                  <td>{row.ownerID}</td>
                  <td>{row.name}</td>
                  <td>{row.address}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                  <td>{row.website}</td>
                  <td>{row.createdAt}</td>
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

export default ViewOwners;
