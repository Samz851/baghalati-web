import React, { Component } from 'react';
import {
  Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow,
  Paper, CircularProgress,
  Backdrop, Link,
  Button, Input,
  InputAdornment, IconButton,
  FormControl, FormLabel,
  RadioGroup, FormControlLabel,
  Radio, Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Auth from '../../api/Auth';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class Coupons extends Component {
  constructor(props){
    super(props)
    this.state = {
      page : 0,
      coupons: [],
      inProgress: true,
      id: '',
      editing: false,
      productID: '',
      api: new Auth(),
      openAlert: false,
      placeholder : {
        name: 'Name for the coupon',
        code: 'Coupon Code',
        start_datetime: 'Date Coupon Starts',
        end_datetime: 'Date Coupon Ends',
        rate: 'Discount Percentage'
      },
      coupon : {
        name: '',
        code: '',
        start_datetime: '',
        end_datetime: '',
        rate: '',
        coupon_type: 'single'
      },
      alertStatus: 'error',
      alertMsg: '',
      createCoupon: false
    }
    // this.handlePageChange = this.handlePageChange.bind(this)
  }

  async componentDidMount(){
    const id = localStorage.getItem('JWBSID');
    this.setState({id: id});
    let api = this.state.api;
    try{
      let coupons = await api.fetchCoupons();
        this.setState({coupons: coupons.data});
        this.setState({inProgress: false});
    }catch(error){
      throw error;
    }
  }

async handleInputChange(input, val){
  if(val !== ''){
    let coupon = {...this.state.coupon}
    coupon[input] = val;
    await this.setState({
      coupon: coupon
    });
  }

}
async submitNewCoupon(){
  let allowSubmit = true;
  console.log(this.state.coupon);
  Object.keys(this.state.coupon).map(i => {
    if(this.state.coupon[i] == ''){
      allowSubmit = false
    }
  });
  if(allowSubmit){
    let api = this.state.api;
    let result = await api.createCoupon(this.state.coupon);
    if(result.success){
      this.setState({alertMsg: 'Coupon saved successfully', alertStatus: 'success', openAlert: true});
      try{
        let coupons = await api.fetchCoupons();
          this.setState({coupons: coupons.data});
          this.setState({inProgress: false});
      }catch(error){
        throw error;
      }
    }else{
      this.setState({alertMsg: 'Failed to create coupon!', alertStatus: 'error', openAlert: true});
    }
  }
}

generateCode(){
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let couponCode = '';
  for (let i = 0; i < 8; i++) {
    couponCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  let coupon = {...this.state.coupon};
  let coupon_placeholder = {...this.state.placeholder};
  coupon.code = couponCode;
  coupon_placeholder.code = couponCode;
  this.setState({coupon: coupon, placeholder: coupon_placeholder});
}

  // async handlePageChange(e, v){
  //   console.log(v);
  //   let api = new Inventory();
  //   await this.setState({page: v -1, items:[], inProgress: true});
  //   console.log(this.state.page);
  //   let products = await api.fetchCoupons(this.state.page, this.state.id);
  //   this.setState({items: products.result});
  //   this.setState({inProgress: false});

  // }

  renderModalContent(){
    return(
      <form noValidate autoComplete="off" className="jwb-coupon-form">
        <div><label>Name: </label><Input id="filled-basic" label="Name" variant="filled" placeholder={ this.state.placeholder.name} onChange={(e)=>{this.handleInputChange('name',e.target.value)}} /></div>
        <div><label>Code: </label><Input id="filled-basic" label="Code" variant="filled" placeholder={ this.state.placeholder.code} onChange={(e)=>{this.handleInputChange('code',e.target.value)}} value={this.state.coupon.code} endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Generate Code"
                  onClick={()=>{this.generateCode()}}
                >
                  <AutorenewIcon />
                </IconButton>
              </InputAdornment>
            }/></div>
          <div><label>Start Date/Time: </label><Input
            id="Start-Datetime"
            label="Start Date/Time"
            type="date"
            defaultValue={ this.state.coupon.start_datetime}
            onChange={(e)=>{this.handleInputChange('start_datetime',e.target.value)}}
          /></div>
          <div><label>End Date/Time: </label>
          <Input
            id="End-Datetime"
            label="End Date/Time"
            type="date"
            defaultValue={ this.state.coupon.end_datetime}
            onChange={(e)=>{this.handleInputChange('end_datetime',e.target.value)}}
          /></div>
        <div><label>Rate: </label><Input id="filled-basic" type="number" max="100" label="Code" variant="filled" placeholder={ this.state.placeholder.rate} onChange={(e)=>{this.handleInputChange('rate',e.target.value)}} endAdornment={<InputAdornment position="end">%</InputAdornment>}/></div>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Coupon Use Type</FormLabel>
            <RadioGroup row aria-label="position" name="coupon_type" defaultValue="single" onChange={(e)=>{this.handleInputChange('coupon_type', e.target.value)}}>
              <FormControlLabel
                value="single"
                control={<Radio color="primary" />}
                label="Single Use"
                labelPlacement="start"
              />
              <FormControlLabel
                value="multiple"
                control={<Radio color="primary" />}
                label="Multiple Use"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </div>
        
        <div><Button size="medium" variant="contained" color="secondary" onClick={()=>{this.setState({inProgress: false, createCoupon: false, editing: false})}}>Cancel</Button> <Button size="medium" variant="contained" color="primary" onClick={()=>{this.submitNewCoupon()}}>Submit</Button></div> 
      </form>
    )
  }

  closeModal(){
    this.setState({inProgress: false, editing: false});
  }

  handleCloseAlert(e){
    this.setState({openAlert: !this.state.openAlert});
  }

  async revokeCoupon( id ){
    let api = this.state.api;
    let result = await api.revokeCoupon(id);
    console.log(result);
    if(result.success){
      this.setState({alertMsg: 'Coupon deleted successfully', alertStatus: 'success', openAlert: true});
      try{
        let coupons = await api.fetchCoupons();
          this.setState({coupons: coupons.data});
          this.setState({inProgress: false});
      }catch(error){
        throw error;
      }
    }else{
      this.setState({alertMsg: 'Failed to delete coupon!', alertStatus: 'error', openAlert: true});
    }
  }

  render() {
    return (
      <div>
        <Snackbar open={this.state.openAlert} autoHideDuration={6000} onClose={()=>{this.handleCloseAlert()}}>
          <Alert severity={this.state.alertStatus}>
              { this.state.alertMsg }
          </Alert>
        </Snackbar>
        <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {this.setState({inProgress: true, createCoupon: true, editing: true})}}
        >
        Add Coupon
        </Button>
        <Backdrop className="jwb-inventory-modal" open={this.state.inProgress}>
          {!this.state.editing &&
                  <div>
                    <CircularProgress color="inherit" />
                    <h5> Loading Inventory</h5>
                  </div>
          }

          {this.state.createCoupon &&

          this.renderModalContent()

          }

        </Backdrop>
        {!this.state.inProgress &&
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Code</TableCell>
                <TableCell align="center">Rate</TableCell>
                <TableCell align="center">Start Datetime</TableCell>
                <TableCell align="center">End Datetime</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Use Type</TableCell>
                <TableCell align="center">Times Used</TableCell>
                <TableCell align="center">Revoke?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.coupons.map((item) => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.code}</TableCell>
                  <TableCell align="center">{item.rate}%</TableCell>
                  <TableCell align="center">{new Date(item.start_datetime).toISOString().split("T")[0]}</TableCell>
                  <TableCell align="center">{new Date(item.end_datetime).toISOString().split("T")[0]}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center">{item.coupon_type}</TableCell>
                  <TableCell align="center">{item.use_count}</TableCell>
                  <TableCell align="center">
                    <Link href="#" onClick={()=>{this.revokeCoupon(item._id)}}>
                      Revoke
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
      </div>
    );
  }
}
