import React, { Component } from 'react';
import { 
    Tabs, Tab, 
    TableHead, TableRow, 
    TableCell, Paper, 
    Button, Snackbar,
    TableBody, IconButton } from '@material-ui/core';
import InventoryPos from './InventoryPos';
import InventoryLocal from './InventoryLocal';

export default class Inventory extends Component {

    constructor(props){
        super(props)
        this.state = {
            tabIndex : 1
        }

        this.handleTabsChange = this.handleTabsChange.bind(this);
    }

    renderClass(i){
        if(i == this.state.tabIndex){
            return 'jwb-inventory-tabs checked'
        }else{
            return 'jwb-inventory-tabs'
        }
    }

    handleTabsChange(e, value){
        this.setState({tabIndex: parseInt(value)})
    }

    renderTabContent(){
        if(this.state.tabIndex == 0){
            return (<InventoryPos />)
        }
        else if(this.state.tabIndex == 1){
            return (<InventoryLocal />)
        }
    }

  render() {
    return (
        
        <div>
            <Tabs aria-label="simple tabs example" onChange={this.handleTabsChange} value={this.state.tabIndex.toString()}>
                <Tab label="Hikeup Database" id={`wrapped-tab-${0}`} className={ this.renderClass(0)} value="0"/>
                <Tab label="Local Database" id={`wrapped-tab-${1}`} className={ this.renderClass(1)} value="1"/>
            </Tabs>
            <Paper elevation={1} className="jwb-dashboard-settings" >
            {this.renderTabContent()}
            </Paper>
        </div>
    );
  }
}
