import React, { Component } from 'react';
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import Settings from './dashboard/Settings';
import Campaigns from './dashboard/campaigns';

export default class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            contentIndex: "Settings",
            menue: ["Dashboard", "Campaigns", "Inventory", "Orders", "Settings"],
            syncStatus: new URLSearchParams(this.props.location.search).get("synched")
        }
    }

    componentDidMount(){
      // let query = new URLSearchParams(this.props.location.search).get("synched");
      // console.log(query);
      // if(query){
      //   this.setState({syncStatus: query});
      // }
    }
    
    handleTabClick(e){
      // e.persist();
        console.log(e);
        let index = e;
        console.log(e);
        this.setState({contentIndex: index});
        console.log(this.state.contentIndex)
    }

    renderMainContent(){
        if(this.state.contentIndex == "Settings"){
            return <Settings syncStatus={this.state.syncStatus}/>
        }
        else if(this.state.contentIndex == "Campaigns"){
          return <Campaigns />
        }
    }
  render() {
    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
  
      > 
      <Grid item xs={2} className="jwb-admin-sidebar">
        <div>
            <h4>Jubna We Baid</h4>
            <h5>Jeddah, KSA</h5>
        </div>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="contained"
        size="large"
        fullWidth={true}
      >
        {this.state.menue.map((item, i) => {
          return (<Button onClick={(e)=>{this.handleTabClick(item)}} key={i}> {item} </Button>)
        })}
      </ButtonGroup>
      </Grid>
      <Grid item xs={10} className="jwb-admin-content">
          {
              this.renderMainContent()
          }
      </Grid>
      </Grid>
    );
  }
}
