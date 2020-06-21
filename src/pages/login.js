import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import {Snackbar, TextField, Button, Select, MenuItem, InputLabel} from '@material-ui/core';
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
      alertMsg: '',
      userType: ''
     };
  }

  submitHandler = async (e) => {
    e.preventDefault();
    let data = {username: this.state.username, password: this.state.password, secret: this.state.secret, type: this.state.userType};
    let api = new Auth();
    let login = await api.login(data);
    if(login.success){
      console.log(login);
      this.props.history.push('/dashboard');
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

  onChangeTypeHandler = (event) => {
    this.setState({
      userType: event.target.value
    })
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
          <InputLabel id="select-user-type-label" style={{minWidth: '100%', paddingTop: 15}}>User Type</InputLabel>
          <Select labelId="select-user-type-label" id="userType" value={this.state.userType} onChange={this.onChangeTypeHandler} style={{minWidth: '100%'}}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'driver'}>Driver</MenuItem>
          </Select>
          <Button type="submit" variant="contained" color="primary" className='jwb-login-form-btn'>Login</Button>
        </form>
      </div>
    );
  }
}