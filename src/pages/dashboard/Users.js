import React, { Component } from 'react';
import { Paper, Button, 
    TextField, Select,
    MenuItem, InputLabel,
    Snackbar, Table, 
    Link, TableBody,
    TableCell, TableContainer,
    TableHead, TableRow } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import MuiAlert from '@material-ui/lab/Alert';
import Auth from '../../api/Auth';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Users extends Component {

  constructor(props){
    super(props);
     this.state = {
      user: {
        name: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        userType: 'admin',

      },
      success: false,
      failed: false,
      users: []
    }
  }

  componentDidMount = async (e) => {
    let auth = new Auth();
    let users = await auth.getUsers();
    if(users.success){
      this.setState({users: users.users});
    }
  }
  onChangeHandler = async (e) => {
      let user = this.state.user;
      user[e.target.id || e.target.name] = e.target.value;
      this.setState({
        user: user
      });
  }

submitHandler = async (e) => {
  e.preventDefault();
  let auth = new Auth();
  let user = await auth.register(this.state.user);
  if(user.success){
    this.setState({success: true});
    let users = await auth.getUsers();
    if(users.success){
      this.setState({users: users.users});
    }
  }else{
    this.setState({failed: true});
  }
}

handleClose = () => {
  this.setState({success: false});
}

deleteUser = async (id) => {
  let auth = new Auth();
  let remove = await auth.deleteUser(id);
  if(remove.success){
    this.setState({success: true});
    let users = await auth.getUsers();
    if(users.success){
      this.setState({users: users.users});
    }
  }else{
    this.setState({failed: true});
  }
}

 
  render() {
    return (
      <Paper elevation={1} className="jwb-dashboard-users" >
        <Snackbar open={this.state.success} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success">
            Operation Complete
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.failed} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error">
            Operation Failed
          </Alert>
        </Snackbar>
          <div className="jwb-dashboard-admin-registration">
              <h2>Register a New User</h2>
               <form className='jwb-login-form' noValidate autoComplete="off" onSubmit={this.submitHandler}>
                <TextField id="name" label="Name" style={{minWidth: '100%'}} onChange={this.onChangeHandler}/>
                <TextField id="username" label="Username" style={{minWidth: '100%'}} onChange={this.onChangeHandler}/>
                <TextField id="email" label="Email" style={{minWidth: '100%'}} onChange={this.onChangeHandler}/>
                <TextField id="phone" label="Phone" style={{minWidth: '100%'}} onChange={this.onChangeHandler}/>
                <TextField id="password" label="Password" type="password" style={{minWidth: '100%'}} onChange={this.onChangeHandler}/>
                <InputLabel id="select-user-type-label" style={{minWidth: '100%', paddingTop: 15}}>User Type</InputLabel>
                <Select labelId="select-user-type-label" id="userType" name="userType" value={this.state.user.userType} onChange={this.onChangeHandler} style={{minWidth: '100%'}}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'driver'}>Driver</MenuItem>
                </Select>
                <Button type="submit" variant="contained" color="primary" className='jwb-login-form-btn'>Register</Button>
               </form>
          </div>
          <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Created</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.phone}</TableCell>
                  <TableCell align="center">{user.createdAt}</TableCell>
                  <TableCell align="center">{user.userType}</TableCell>
                  <TableCell align="center">
                    {
                      user.userType == 'driver' &&
                      <Link href="#" onClick={()=>{this.deleteUser(user._id)}}>
                        Delete
                      </Link>
                    }

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination count={Math.ceil(this.state.totalCount / 20)} page={this.state.page + 1} onChange={this.handlePageChange} />
        </TableContainer>
      </Paper>
    );
  }
}
