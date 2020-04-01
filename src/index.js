import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter } from 'react-router-dom'
import PrimarySearchAppBar from './Header';

import App from './App'
const routs = (
   
   < BrowserRouter >
         <PrimarySearchAppBar />
      <div>
         <Route exact path="/" component={App} />

      </div>
   </ BrowserRouter >
);
ReactDOM.render(routs, document.getElementById('root'))

