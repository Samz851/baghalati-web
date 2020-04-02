import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import PrimarySearchAppBar from './Header';

import App from './App'
import Dashboard from './pages/Dashboard';
const routs = (
   
   < BrowserRouter >
         <PrimarySearchAppBar />
      <Switch>
         <Route exact path="/" component={App} />
         <Route exact path="/dashboard" component={Dashboard} />

      </Switch>
   </ BrowserRouter >
);
ReactDOM.render(routs, document.getElementById('root'))

