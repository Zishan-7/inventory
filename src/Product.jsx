import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Carosuel from "./Carosuel";
import Nav from "./Nav";
import app from "./base.js";
const Product = () => {
  const [data, setData] = useState("");
  const { id } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const db = app.firestore();
      const snapshot = await db.collection("listings").doc(id).get();
      setData(snapshot.data());
      // console.log(data);
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Nav />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5  flex flex-wrap">
            {data.images == null ? null : <Carosuel img={data.images} />}

            <div className=" w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {data.name}
              </h1>

              <p className="leading-relaxed">
                {data.area}
              </p>
              <p>{data.address}</p>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {`Rs. ${data.price}`}
                </span>
                {
                //   <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                //   Button
                // </button>
              }
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Product;
