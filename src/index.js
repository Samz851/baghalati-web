import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import PrimarySearchAppBar from './Header';
import App from './App'
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
       main: '#377499'
    },
  },
});

const routs = (
   <ThemeProvider theme={theme}>
      < BrowserRouter >
            <PrimarySearchAppBar />
         <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/dashboard" component={Dashboard} />

         </Switch>
      </ BrowserRouter >
   </ThemeProvider>
);
ReactDOM.render(routs, document.getElementById('root'))

