import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Snackbar, TextField, Button} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Auth from '../api/Auth';


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      username: '',
      password: '',
      secret: 'Freaky',
      openAlert: false,
      alertMsg: ''
     };
  }

  submitHandler = async (e) => {
    e.preventDefault();
    let data = {username: this.state.username, password: this.state.password, secret: this.state.secret};
    let api = new Auth();
    let login = await api.login(data);
    if(login.success){
      //SUCCESS
    }else{
      this.setState({alertMsg: login.message});
      this.setState({openAlert: true})
    }
    // console.log(data);
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleCloseAlert = (e) => {
    this.setState({openAlert: !this.state.openAlert});
  }
  render(){
    return (
      <div>
        <Snackbar open={this.state.openAlert} autoHideDuration={6000} onClose={this.handleCloseAlert}>
          <Alert severity="error">
            { this.state.alertMsg }
          </Alert>
        </Snackbar>
        <h4>Please Login</h4>
        <form className='jwb-login-form' noValidate autoComplete="off" onSubmit={this.submitHandler}>
          <TextField id="username" label="Username" style={{minWidth: '100%'}} onChange={this.onChangeHandler}/>
          <TextField id="password" label="Password" type="password" style={{minWidth: '100%'}} onChange={this.onChangeHandler}/>
          <Button type="submit" variant="contained" color="primary" className='jwb-login-form-btn'>Login</Button>
        </form>
      </div>
    );
  }
}