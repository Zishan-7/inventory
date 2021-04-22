import React from "react";
import {NavLink} from 'react-router-dom';
import app from "./base";



const Nav = () => {
  return (
    <div>
    <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
      <NavLink exact to='/' className="flex title-font font-medium items-center hover:text-gray-900 text-gray-900 mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-red-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span className="ml-3 text-xl">Inventory Management</span>
      </NavLink>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <NavLink to='/add' className="mr-5 text-gray-900 hover:text-gray-900">Add Listing</NavLink>
        <NavLink to='/search' className="mr-5 text-gray-900 hover:text-gray-900">Search</NavLink>
      </nav>
      <NavLink to='/login'>
      <button onClick={() => app.auth().signOut()} className="inline-flex text-white items-center bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-black  rounded text-base mt-0 md:mt-0">Logout  
      </button></NavLink>
    </div>
  </header>
  
    </div>
  );
};

export default Nav;
