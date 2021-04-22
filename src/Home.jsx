import React from "react";
import Listing from './Listing';
import Nav from './Nav'
import app from "./base.js";
const Home = () => {

  const [listings, setlistings] = React.useState([]);
  // const [newListingName, setNewListingName] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const db = app.firestore();
      db.collection('listings').onSnapshot(snapshot=>{
        const listingData=[];
        snapshot.forEach(doc => listingData.push({...doc.data(),id:doc.id}));
        setlistings(listingData)
      })
      // const data = await db.collection("listings").get();
      // setlistings(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  // const onCreate = () => {
  //   const db = firebase.firestore();
  //   db.collection("listings").add({ name: newListingName });
  // };


  return (
    <div>
    <Nav />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
          {
            listings.map((list)=>{
              return(
                <Listing key={list.id} id={list.id} image={list.images[0]} 
            name={list.name} address={list.address} price={`Rs. ${(list.price).toString()}`} />
              );
            })
          }


            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
