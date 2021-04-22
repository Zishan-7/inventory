import React, { useState } from "react";
import FileUploader from "react-firebase-file-uploader";
import app from "./base.js";
import { ProgressBar } from "react-bootstrap";
import Nav from "./Nav";

// Setup Firebase

const Add = () => {
  const [state, setstate] = useState({
    filenames: [],
    downloadURLs: [],
    isUploading: false,
    uploadProgress: 0,
  });
  const [data, setData] = useState({
    pname: "",
    address: "",
    price: "",
  });

  const [url, seturl] = useState([]);

  const handleUploadStart = () => {
    setstate((prev) => {
      return { ...prev, isUploading: true, uploadProgress: 0 };
    });
  };

  const handleProgress = (progress) => {
    setstate((prev) => {
      return { ...prev, uploadProgress: progress };
    });
  };
  const handleUploadError = (error) => {
    setstate((prev) => {
      return { ...prev, isUploading: false };

      // Todo: handle error
    });
    console.error(error);
  };

  const handleUploadSuccess = async (filename) => {
    const downloadURL = await app
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();

    setstate((prev) => {
      return {
        ...prev,

        uploadProgress: 100,
        isUploading: false,
      };
    });

    seturl((prev) => {
      return [...prev, downloadURL];
    });
  };

  const showUrl = () => {
    console.log(url);
  };

  const inputData = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const db = app.firestore();
    db.collection("listings").add({
      name: data.pname,
      price: data.price,
      address: data.address,
      images: [...url],
    });
    // alert("Upload Complete!!!");
    // console.log(fileUrl);
  };

  return (
    <div>
      <Nav />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={submit}>
          <input
            type="text"
            name="pname"
            placeholder="Property Name"
            onChange={inputData}
            required={true}
          />
          <br />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={inputData}
            required={true}
          />
          <input
            type="text"
            name="area"
            placeholder="Area"
            onChange={inputData}
            required={true}
          />
          <br />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={inputData}
            required={true}
          />
          <br />
          <input type='submit'/>
        </form>

        <FileUploader
          accept="image/*"
          name="image-uploader-multiple"
          randomizeFilename
          storageRef={app.storage().ref("images")}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          onProgress={handleProgress}
          multiple
        />

        <p>{`Progress: ${state.uploadProgress}%`}</p>
        <div style={{ width: "50%" }}>
          <ProgressBar now={state.uploadProgress} />
        </div>

        <p>Filenames: {state.filenames.join(", ")}</p>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {url.map((downloadURL, i) => {
            return (
              <img
                style={{ margin: "20px", width: "200px" }}
                key={i}
                alt={`img ${i}`}
                src={downloadURL}
              />
            );
          })}
        </div>
        <button onClick={showUrl}>show</button>
      </div>
    </div>
  );
};

export default Add;

// nect
