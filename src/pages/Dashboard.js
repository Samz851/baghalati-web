import React, { Component } from 'react';
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import Settings from './dashboard/Settings';

export default class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            contentIndex: 0
        }
    }

    handleTabClick(e){
        let index = e.target.value;
        this.setState({contentIndex: index});
    }

    renderMainContent(){
        if(this.state.contentIndex == 0){
            return <Settings />
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
        <Button>Dashboard</Button>
        <Button>Inventory</Button>
        <Button>Orders Feed</Button>
        <Button onClick={this.handleTabClick} value={0}>Settings</Button>
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
