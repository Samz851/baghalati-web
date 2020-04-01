import React, { useEffect, useState } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './pages/login';
import Dashboard from './pages/Dashboard';
import Auth from './api/Auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  login: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: '300px',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sidebar: {
    backgroundColor: 'red',
    height: "100vh"
  }
}));

function Content(props){
  const { isLoggedIn, loginStyles } = props;
    if(isLoggedIn){
      return <Dashboard />
    }else{
      return(
        <div className={loginStyles}>
          <LoginForm></LoginForm>
        </div>
      )
    }
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const classes = useStyles();
  
  useEffect( () =>{
    async function checkSession(){
      let session = await localStorage.getItem('JWBSID');
      if(session){
        let api = new Auth();
        let response = await api.verifySID(session);
        if(response.success){
          setIsLoggedIn(true);
        }
      }
    }
    checkSession();

  },[])

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"

    >        <Grid item xs={12}>
          <Content isLoggedIn={isLoggedIn} loginStyles={classes.login}/>
        </Grid>
    </Grid>
  );
}

export default App;
