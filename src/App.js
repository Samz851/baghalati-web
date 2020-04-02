import React, { useEffect, useState } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import LoginForm from './pages/login';
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


function App( props ) {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const classes = useStyles();
  
  useEffect( () =>{
    async function checkSession(){
      let session = await localStorage.getItem('JWBSID');
      if(session){
        let api = new Auth();
        let response = await api.verifySID(session);
        if(response.success){
          // setIsLoggedIn(true);
          props.history.push('/dashboard');

        }
      }
    }
    checkSession();

  },[])
  const styles = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"

    >
      <div className={styles.loginStyles}>
        <LoginForm history={props.history}></LoginForm>
      </div>
    </Grid>
  );
}

export default App;
