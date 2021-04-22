import React from 'react'
import {NavLink} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import app from "./base.js";



const Listing = (props) => {
  const onDelete = () => {
    const db = app.firestore()
    db.collection('listings').doc(props.id).delete()
  }
    return (
        
        <div className="lg:w-1/3 md:w-1/2 p-4 w-full">
        <NavLink to={`/product/${props.id}`} className="block relative h-48 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={props.image}
          />
        </NavLink>
        <div className="mt-4">
          <h3 className="text-gray-500 text-lg tracking-widest title-font mb-1">
          {props.name}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {props.address}
          </h2>
          
          <p style={{'display':'inline-block'}} className="mt-1">{props.price}</p>
          <IconButton><DeleteIcon style={{'color':'red','marginLeft':'160px'}} onClick={onDelete}/></IconButton>
          
        </div>
      </div>
       
    )
}

export default Listing
