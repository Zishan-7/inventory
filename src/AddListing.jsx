import React, { useState } from "react";
import FileUploader from "react-firebase-file-uploader";
import app from "./base.js";
import { ProgressBar } from "react-bootstrap";
import Nav from "./Nav";
import {Button} from 'react-bootstrap'


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
    area:''
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
      area:data.area,
    });
    // alert("Upload Complete!!!");
    // console.log(fileUrl);
  };

  const formStyles={'width':'70%',
  'border':'1px solid black',
  'padding':'10px',
  'margin':'5px',
  'outline':'none',
  'borderRadius':'7px',
  
}

  return (
    <div>
      <Nav />

      <div
        style={{
          "display": "flex",
          "flexDirection": "column",
         " justifyContent": "center",
          "alignItems": "center",
        }}
      >
        <form style={{'width':'50%',"display": "flex","flexDirection": "column",
        " justifyContent": "center",
        "alignItems": "center",}}  onSubmit={submit}>
          <input style={formStyles}
            type="text"
            name="pname"
            placeholder="Property Name"
            onChange={inputData}
            required={true}
          />
          <br />
          <input style={formStyles}
            type="text"
            name="address"
            placeholder="Address"
            onChange={inputData}
            required={true}
          />
          <br />
          <input style={formStyles}
            type="text"
            name="area"
            placeholder="Area"
            onChange={inputData}
            required={true}
          />
          <br />
          <input style={formStyles}
            type="number"
            name="price"
            placeholder="Price"
            onChange={inputData}
            required={true}
          />
          <br />
          <Button type='submit' variant="danger">Submit</Button> 
        </form>
        <label style={{backgroundColor: 'steelblue',margin:'10px',  color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
        Choose your images
        <FileUploader
            hidden
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
        </label>

        <p>{`Progress: ${state.uploadProgress}%`}  </p>
        <div style={{ width: "50%" }}>
          <ProgressBar animated now={state.uploadProgress} />
          <br/>
        </div>

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
      </div>
    </div>
  );
};

export default Add;

// nect
