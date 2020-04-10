import React, { Component } from 'react';
import { Card, CardActions,
        CardContent, Button,
        Typography, Link} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Orders extends Component {
    constructor(props){
        super(props);
        this.state = {
            status : 'received'
        }
    }
  render() {
    return (
      <div>
        <Card className={ "jwb-order-card " + this.state.status}>
            <CardContent className="jwb-card-content">
                <div className="jwb-card-content-main">
                    <h3>"NAME"</h3>
                    <h4>"Phone Number"</h4>
                </div>
                <div className="jwb-card-content-detail">
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </div>
                <div className="jwb-card-content-actions">
                <p className="jwb-card-total">Total Amount: SAR 125</p>
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" className="jwb-order-status-btn onroute" onClick={()=>{this.setState({status: 'onroute'})}}>On Route</Button>
                <Button size="small" className="jwb-order-status-btn delivered" onClick={()=>{this.setState({status: 'delivered'})}}>Delivered</Button>
                <Button size="small" className="jwb-order-status-btn cancel">Cancel</Button>
                <Link href="http://www.google.com/maps/place/21.591231371585184,39.18988415971398" color="inherit" target="_blank" className="jwb-map-button">
                    "Find Location on Map"
                </Link>
            </CardActions>
        </Card>
    </div>
    );
  }
}
