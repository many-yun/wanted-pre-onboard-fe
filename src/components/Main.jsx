/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Main = () => {
   return (
      <div className="Background">
         <div className="Main">
            <h1>&lt; Welcome to TodoList /&gt;</h1>
            <div>
               <Link to="/login">Login</Link>
               <Link to="/signup">Sign up</Link>
            </div>
         </div>
      </div>
   );
};

export default Main;
