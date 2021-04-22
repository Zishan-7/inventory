import React,{useState} from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import Listing from './Listing';
import Nav from './Nav'
import app from "./base.js";



const Search = () => {
  const [query, setQuery] = useState('')
  const [listings, setlistings] = React.useState([]);

  const inputEvent=(e)=>{
    setQuery(e.target.value)
  }


  const onSearch=(e)=>{
    e.preventDefault();
    // console.log(query)
    const fetchData = async () => {
      const db = app.firestore();
      db.collection('listings').where('area', '==', query).onSnapshot(snapshot=>{
        const listingData=[];
        snapshot.forEach(doc => listingData.push({...doc.data(),id:doc.id}));
        setlistings(listingData)
      })
      // const data = await db.collection("listings").get();
      // setlistings(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData().then(()=>{console.log(listings);})
    
  }


  return (
    <div style={{ margin: "0px 100px" }}>
    <Nav />
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          value={query}
          onChange={inputEvent}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={onSearch} >Search</Button>
        </InputGroup.Append>
      </InputGroup>
      <div style={{'display':'flex','flexWrap':'wrap'}} >
      {
        listings==null?null:
        listings.map((list)=>{
          return(
            <Listing key={list.id} id={list.id} image={list.images[0]} 
        name={list.name} address={list.address} price={`Rs. ${(list.price).toString()}`} />
          );
        })
      }</div>
    </div>
  );
};

export default Search;
