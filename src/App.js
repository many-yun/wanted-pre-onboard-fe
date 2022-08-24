/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Todo from './components/Todo';
import Main from './components/Main';

function App() {
   return (
      <div className="App">
         <Router>
            <Routes>
               <Route path="/" element={<Main />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/todo" element={<Todo />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
