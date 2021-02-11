import React, { useState, useEffect } from "react";
import axios from "axios";

const ApproveVariety = () => {
  const [data, setData] = useState([]);
  // Make request everytime component loads
  useEffect(() => {
    axios
      .get(`/adminactions/getallvarietys`)
      .then((response) => {
        console.log(response);
        // update state with data
        setData(response.data);
        console.log(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  // If no data yet return loading...
  if (!data || data.length === 0) return <p>Loading...</p>;

  return (
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 class="h2">Aprrove Varietys</h1>
      </div>

      <h2>Varieties</h2>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Characteristics</th>
              <th>Submited</th>
              <th>Species</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((row) => (
                  <tr>
                    <td>{row.varietyID}</td>
                    <td>{row.name}</td>
                    <td>{row.characteristics}</td>
                    <td>{row.createdAt}</td>
                    <td>{row.Specie.name}</td>
                    <td>
                      <button class="btn btn-success mr-1">Approve</button>
                      <button class="btn btn-danger ml-1">Reject</button>
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

export default ApproveVariety;
