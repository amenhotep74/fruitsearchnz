import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";

const UploadCSVS = () => {
  const [file, setFile] = useState("");
  const [refresh, setRefresh] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});
  // Make request everytime component loads
  //   useEffect(() => {}, []);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log("Handle Submit!");
    try {
      const res = await axios.post("/api/csv/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
    // const id = e.target.value;
    // console.log("handleaprove clicked!");
    // console.log(id);
    // // make request to backend with the ID.
    // axios
    //   .post("/adminactions/promotetoadmin", {
    //     id: id,
    //   })
    //   .then((response) => {
    //     // Trigger refresh?
    //     console.log("Then refresh");
    //     setRefresh(response);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 class="h2">Upload CSV'S</h1>
      </div>

      <h2>Users</h2>

      <div class="mb-3">
        <form onSubmit={onSubmit}>
          <label for="formFile" class="form-label">
            Upload Species CSV
          </label>
          <input
            onChange={onChange}
            class="form-control"
            type="file"
            id="customFile"
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default UploadCSVS;
