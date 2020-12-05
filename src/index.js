import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DOGS from './Breeds.json';

ReactDOM.render(<BrowserRouter><App dogs={DOGS}/></BrowserRouter>, document.getElementById('root')); 
// we need to add a 'root' section in our html
// also set the prop element for App