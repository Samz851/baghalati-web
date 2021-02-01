import React, { Component } from 'react';
import { Paper, Button, 
        TextField, Checkbox,
        Snackbar, ButtonGroup, 
        CircularProgress, Backdrop } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Auth from '../../api/Auth';
import Inventory from '../../api/Inventory';
const imgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAAAjCAYAAADR94eaAAAFT0lEQVRoge1azYrjRhDWI/gR9AJZ13RPYJOTDksuuZg9JZAFP4IfwW+gYw7JokNCCOSgQAiyWuquzSQQ2Iv3lA2EQYSZS2YPegTnIMmjn6pWS7Zv0yAWxu1S99dffV91eT3vaTyN9vgYEYTWW2nMXhpTSGPwGjEERP9iLwXEBSgFMk9XkCXB2eIqBZAlAWDik5+d4Z1C641EjGWerwBx4XmeB4i+0HojjSkkYtT8/awDsiQQOj20H5mnq9nxEBdCp3E3ZrJuzxE6LTrvM+l+6nuE1luh9dY2RyJG0pji7MAJvdv0QRM6LefHUxER79BeuNBpOZyz23AxVxgvXmAcBPhL4HmeJ/N8dY0YuqxHGoPSGJy7H3K4bHJaPAqQ9NCkISgF1OdCq6gfa43R4uVvP4afv/lp/9mbn+MAf42eY1pI1M5pB4gLacxB5vns7KE2GdOgDbXIZYE0II+gyTxdMXMGzPni5vvoJf6wWWF8BOhTVDAVgGvEUBqzF1pvqrT+fQv45+T9HUdfX05PTzJe8fg5KQcD3Xt183r9JX43AOcTTFdTswAQfWlMKY1BiRhL88de6LeHK/MOAd/7kzYImPjUBuYI8zFmz1ikSfegFDSfc8zum8+rm9drKv5znOe2faBBvQWh38Wg3x8g+8c9JuWcnL5MXaDM0xUoBf3FMkwcyMFXN9+SKRic2QlB/x2Cvi0BC390sufZUoV3slMHo2dFe84av/bX+E1wqTX0B+jbeJnfuTks55yn1GnWxTHOeWXUeUuCqevCYrHM7w4f5f+N73vMOSFLApEl2xrcuPq3K9jdl1e3C+4mMMU5q3iJX2dDKLJka3P0RhIG6x353vH7+j5c5g/jssQ5Z1U60Cw8ijuhLVdGoc1QXJ2zNXdQ8/WvXXWZE1Jzp+g0ZHfBs/zBXjVwzlkDSYr1mMPS33vUR1fnFDpZ8yA8AmyfN10GnuUPB8CSNxreOd2fdinBV/ppbAe165x1HAaI1gFkyXbeunl5WeYPe1AlcJ9bUmXCkyXbJp6LXnHMPgJWsZ9jeeiydmnSfc1oLs7xEGeApiIbjZsaq2bk6ALG9GrMOQFx0ddECrAaWIqJ5TDNSTnolDcD0JLSt4BG64vQaTwsSJM1PfdRXMfKlzEm8utRUa9D4qSL3Lptt51l/mC/CXHsaetUM1xSj2NJo1c2JnL61HfpKR0Sz2N1j0xPUPewzD+wqTv5zulSKjCH0Lqo0wzhwKbKGg5c6qBZZ23pcAeT7N+ttbideuccSz2XSp9jNvMUVEFKxWgfdEuDQz7usL4ELBZLfW8vbKfeOTmWNBs7wTmZZ3h4tl5dzaixeq2kGOl5ngf6dgPqnnfNagN25hCgjaTePOesywNyk32mWerA0efKKOSuUpD/tXJqDY0xpxOU0b9e6tHxHLq1fOnTZduMYrys9HK34ZqWgHvfuQnJMIe8d1kWG47Ec3JOa4u8dYg88CqqwE/D6j27DdXHO2m4MKcLsJNzUnoy6pwNEy2F9rEE4EGz9/7OAp4Lc9pjrnOKCXdOK9tq8ebn2LsXQquI68o4jyntmXrDl3LOovse5nBaJQXD6EG7yPMakDsx2euTA2h25hCgUSw52Tn7cmBjW7M2231Z6DSsCtpkLZj+2my2jTGnu5HTnZO/tw7lwNLuKceAdXjKU0CzMqcD2oWdc3hIuODiNYJvkQMrYLY+mnVwJ3Vu5+zpkJWJgzVW6UwBVzroKLm3k38oqtKlqmfadQ25geMPG735nVYNEa8FSAVCP8b4qVfAdL837JftNsSFv2wakdUPPBf4r1ZPgx7/A2x793GV3E6BAAAAAElFTkSuQmCC';
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Settings extends Component {

  constructor(props){
    super(props)
    this.state = {
      is_synched: this.props.syncStatus || false,
      deliveryFee: 0,
      deliveryID: '',
      override: false,
      password: '',
      openAlert: false,
      alertStatus: 'error',
      alertMsg: '',
      file: '',
      autoHide: null
    }
    this.handleDeliveryChange = this.handleDeliveryChange.bind(this);
    this.updateDelivery = this.updateDelivery.bind(this);
    this.syncRecords = this.syncRecords.bind(this);
    this.onPassChangeHandler = this.onPassChangeHandler.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
  }
  async componentDidMount(){
    console.log(this.props.syncStatus);
    let storeStatus = localStorage.getItem('JWBSTORESTATUS');
    this.setState({is_synched: storeStatus});
    let api = new Auth();
    let dFee = await api.getDeliveryFee();
    // console.log(dFee);
    this.setState({deliveryID: dFee.option._id})
    this.setState({deliveryFee: dFee.option.option_value})
  }

  async fetchNewProducts(){
    let api = new Inventory();
    let fetch = await api.fetchNewProducts();
    if(fetch.success){
      await this.setState({
        alertStatus: 'success',
        alertMsg: fetch.message,
        autoHide: 6000
      })
    }else{
      await this.setState({
        alertStatus: 'error',
        alertMsg: 'Failed to fetch new products!',
        autoHide: 6000
      })
    }
    this.setState({openAlert: true});
  }

  async updateLocalInventory(){
    let api = new Inventory();
    let fetch = await api.updateLocalInventory();
    if(fetch.success){
      await this.setState({
        alertStatus: 'success',
        alertMsg: fetch.message,
        autoHide: 6000
      })
    }else{
      await this.setState({
        alertStatus: 'error',
        alertMsg: 'Failed to fetch new products!',
        autoHide: 6000
      })
    }
    this.setState({openAlert: true});
  }

  connectStore(e){
    let session = localStorage.getItem('JWBSID');
    e.preventDefault();
    window.location.href=`https://api.jubnawebaith.com/v1/pos/hikeup-authorize?user_token=${session}`;
  }

  async syncRecords(e){
    //Show alert
    this.setState({
      openAlert: true,
      autoHide: null,
      alertStatus: 'info',
      alertMsg: 'Processing Request...'
    })
    e.preventDefault();
    let session = localStorage.getItem('JWBSID');
    let POS = new Inventory();
    let syncReq = await POS.syncProducts(session, this.state.override, this.state.password);
    if(syncReq.success){
      this.setState({
        alertStatus: 'success',
        alertMsg: 'Sync Completed Successfully!',
        autoHide: 6000
      })
    }else{
      this.setState({
        alertStatus: 'error',
        alertMsg: 'Failed to Sync Products!',
        autoHide: 6000
      })
    }
    console.log(`Session is: ${session} and Override is: ${this.state.override}`);


  }

  onPassChangeHandler(e){
    this.setState({
      password: e.target.value
    });
  }

  renderSyncContent(){
    if(this.props.syncStatus){
      return (
      <div>
        <h4>Your Store is Connected <small>You can start syncing your products now</small></h4>
        <div>
          <label>Check this box to override everything in the database <small>"Password required"</small></label>
          <Checkbox
          checked={this.state.override}
          onChange={(event)=>{ this.setState({override: event.target.checked})}}
          inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          {this.state.override && 
            <TextField id="password" label="Password" type="password" onChange={this.onPassChangeHandler} style={{maxWidth: 400, display: 'block', textAlign: 'center', margin: 'auto', marginBottom: 20}}/>
          }
        </div>
        <div className="jwb-settings-sync-btn">
          <Button variant="contained" color="primary" onClick={this.syncRecords} className="JWB-settings-btn">Sync</Button></div>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button onClick={()=> this.fetchNewProducts()}>Fetch new products</Button>
          <Button onClick={this.updateLocalInventory}>Update local inventory</Button>
        </ButtonGroup>
      </div>
      )
    }else{
      return (
        <div>
          <h4>Your Store is not connected <small>Please connect your store first</small></h4>
          <Button variant="contained" color="primary" onClick={this.connectStore}>Connect Store</Button>
        </div>
      )
    }
  }

  handleFileUpload(e){
    this.setState({
      file: e.target.files[0]
    });
  }

  async uploadFile(){
    if(this.state.password !== ''){
      this.setState({
        openAlert: true,
        autoHide: null,
        alertStatus: 'info',
        alertMsg: 'Processing Request...'
      })
      let data = new FormData();
      data.append('file', this.state.file);
      // for (const key in finalProduct) {
      //     console.log(key);
      //     console.log(finalProduct[key]);
      //     data.append(key, finalProduct[key]);
      // }
      let inventory = new Inventory();
      let upload = await inventory.uploadFileImport(data, this.state.password);
      console.log(upload);
      if(upload.success){
        this.setState({
          alertStatus: 'success',
          alertMsg: 'File Imported Successfully!',
          autoHide: 6000,
          // file: ''
        });
        // this.refs.fileInput = '';
      }else{
        this.setState({
          alertStatus: 'error',
          alertMsg: 'Failed to Import File!',
          autoHide: 6000
        })
      }
    }else{
      this.setState({
        alertStatus: 'error',
        alertMsg: 'Password Required',
        autoHide: 6000
      })
    }
  }

  async handleDeliveryChange(event){
    this.setState({deliveryFee: event.target.value});
  }
  async updateDelivery(){
    let api = new Auth();
    let updateResponse = await api.updateDeliveryFee(this.state.deliveryFee, this.state.deliveryID);
    console.log(updateResponse);
  }

  handleCloseAlert(e){
    this.setState({openAlert: !this.state.openAlert});
  }

  render() {
    return (
      <Paper elevation={1} className="jwb-dashboard-settings" >
        <Snackbar open={this.state.openAlert} autoHideDuration={this.state.autoHide} onClose={this.handleCloseAlert}>
          <Alert severity={this.state.alertStatus}>
              { this.state.alertMsg }
          </Alert>
        </Snackbar>
        <div>
          <h4> Settings </h4>
        </div>
        <div className="jwb-dashboard-settings-hikeup">

          <img src={imgSrc} alt="hikeup" />
          <p> HikeUp is your system of records, to sync your database with HikeUp please click the button below</p>
          { 
            this.renderSyncContent()
          }
        </div>
        <div className="jwb-dashboard-settings-delivery">
          <h5>Delivery Fee</h5>
          <div> (SAR) 
            <TextField
              id="outlined-number"
              label="Delivery Fee"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={this.state.deliveryFee}
              onChange={this.handleDeliveryChange}
            />
            <Button variant="contained" color="primary" onClick={this.updateDelivery} className="jwb-update-delivery-btn">Update Fee</Button>
          </div>
        </div>
        <div className="jwb-dashboard-settings-delivery">
          <h5>Import Inventory</h5>
          <div> 
            <p>Upload XLS file</p> 
            <input accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" ref="fileInput" className='' id="inventory-file" type="file" onChange={(e)=> this.handleFileUpload(e)}/>

            <Button variant="contained" color="primary" onClick={()=> this.uploadFile()} className="jwb-update-delivery-btn">Upload File</Button>
            <TextField id="password" label="Password" type="password" onChange={this.onPassChangeHandler} style={{maxWidth: 400, display: 'block', textAlign: 'center', margin: 'auto', marginBottom: 20}}/>
            <p>This will <span style={{color: 'red'}}> override </span>the database. Password required!</p>
          </div>
        </div>
          
      </Paper>
    );
  }
}
