import React, { Component } from 'react';
import { Card, CardActions,
        CardContent, Button,
        Typography, Link} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import update from 'react-addons-update';
import Inventory from '../../api/Inventory';

export default class Orders extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                {
                    customer_name: 'Name',
                    phone_number: 'Phone Number',
                    total: '12',
                    status: 'received',
                    items: [
                        {
                            name: 'Item',
                            quantity: 1
                        }
                    ],
                    delivery_address: {
                        geolocation: {
                            latitude: 21.591231371585184,
                            longitude: 39.18988415971398
                        }
                    }
                },
            ],
            status : 'received',
            feedOn: false,
            startingFeed: false,
        }
        this.Inventory = new Inventory()
    }

    async componentDidMount(){
        let orders = await this.Inventory.fetchActiveOrders();
        // console.log('Orders are coming:!!!!!');
        // console.log(orders.data[0])
        let data = orders.data.map((order, i) => {
            let obj = {
                customer_name : order.customer_id.full_name,
                phone_number : order.customer_id.contact_no,
                total: order.amount_total['$numberDecimal'],
                status: order.status,
                id: order._id,
                items: order.checkout_items.map((item, index)=>{
                    return {
                        name: item.item.name,
                        quantity: item.quantity
                    }
                }),
                delivery_address: {
                    geolocation: {
                        latitude: order.delivery_address.geolocation.latitude,
                        longitude: order.delivery_address.geolocation.longitude
                    }
                }
            }
            return obj
        });
        this.setState({data: data});
        console.log(data);

        // this.eventSource.onmessage = e => {
        //     this.updateOrders(JSON.parse(e.data));
        // }
    }

    async toggleFeed(){
        this.eventSource = new EventSource("http://localhost:3001/v1/orders/ordersFeed");
        await this.setState({feedOn: !this.state.feedOn});
        if( this.state.feedOn ){
            this.eventSource.addEventListener('new-order', async (e) => {
                let order = JSON.parse(e.data);
                console.log('ORDER FEED IS COMMING');
                console.log(JSON.parse(e.data));
                let orders = [...this.state.data];
                let obj = {
                    customer_name : order.customer_id.full_name,
                    phone_number : order.customer_id.contact_no,
                    total: order.amount_total['$numberDecimal'],
                    status: order.status,
                    id: order._id,
                    items: order.checkout_items.map((item, index)=>{
                        return {
                            name: item.item.name_ar,
                            quantity: item.quantity
                        }
                    }),
                    delivery_address: {
                        geolocation: {
                            latitude: order.delivery_address.geolocation.latitude,
                            longitude: order.delivery_address.geolocation.longitude
                        }
                    }
                }
                // console.log('ORDER DATA IS COMING');
                orders.push(obj);
                // console.log(orders);
                await this.setState({data: orders});

                // this.updateOrders(JSON.parse(e.data));
            })
        }else{
            this.eventSource.close();
        }
    }

    async updateOrderStatus(status, index){
        this.setState({
            data: update(this.state.data, {[index]: {status: {$set: status}}})
        });
        let st = await this.Inventory.updateOrderStatus(this.state.data[index].id, status);
    }

  render() {
    return (
      <div>
          <Button variant="contained" color="primary" onClick={() => this.toggleFeed()}> {this.state.feedOn ? 'Stop Feed' : 'Start Feed'}</Button>
          <div>
              { 
              this.state.data.map((item, index) => (
                <Card className={ "jwb-order-card " + this.state.data[index].status} key={index}>
                    <CardContent className="jwb-card-content">
                        <div className="jwb-card-content-main">
                            <h3>{ item.customer_name }</h3>
                            <h4>{ item.phone_number }</h4>
                        </div>
                        <div className="jwb-card-content-detail">
                            <ul>
                                {
                                    item.items.map((product, i) => (
                                        <li key={i}> { product.name } <span> { product.quantity } </span></li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="jwb-card-content-actions">
                            <p className="jwb-card-total">Total Amount: SAR { item.total }</p>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small" className="jwb-order-status-btn onroute" onClick={()=>{ this.updateOrderStatus('onroute', index) }}>On Route</Button>
                        <Button size="small" className="jwb-order-status-btn delivered" onClick={()=>{ this.updateOrderStatus('delivered', index)}}>Delivered</Button>
                        <Button size="small" className="jwb-order-status-btn cancel">Cancel</Button>
                        <Link href={ `http://www.google.com/maps/place/${item.delivery_address.geolocation.latitude},${item.delivery_address.geolocation.longitude}` } color="inherit" target="_blank" className="jwb-map-button">
                            "Find Location on Map"
                        </Link>
                    </CardActions>
                </Card>
              ))
              }
          </div>
        
    </div>
    );
  }
}
