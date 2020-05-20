import React, { Component } from 'react';
import {
  Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow,
  Paper, CircularProgress,
  Backdrop
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Inventory from '../../api/Inventory';
import Auth from '../../api/Auth';

export default class InventoryPOS extends Component {

  constructor(props){
    super(props)
    this.state = {
      page : 0,
      items: [],
      inProgress: true,
      id: ''
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  async componentDidMount(){
    const id = localStorage.getItem('JWBSID');
    this.setState({id: id});
    let api = new Inventory();
    try{
      let products = await api.fetchPOSProducts(this.state.page, id);
      if(!products.success){
        let auth = new Auth();
        let token = await auth.refreshToken(id);
        if(token.success){
          console.log(token);
          setTimeout(async()=>{
            products = await api.fetchPOSProducts(this.state.page, id);
            this.setState({items: products.result});
            this.setState({totalCount: products.total});
            this.setState({inProgress: false});
          }, 500)

        }

      }else{
        console.log(products);
        this.setState({items: products.result});
        this.setState({totalCount: products.total});
        this.setState({inProgress: false});
      }
    }catch(error){
      throw error;
    }
  }

  async handlePageChange(e, v){
    console.log(v);
    let api = new Inventory();
    await this.setState({page: v -1, items:[], inProgress: true});
    console.log(this.state.page);
    let products = await api.fetchPOSProducts(this.state.page, this.state.id);
    this.setState({items: products.result});
    this.setState({inProgress: false});

  }

  closeModal(){
    this.setState({inProgress: false})
  }

  render() {
    return (
      <div> 
        <Backdrop className="jwb-inventory-modal" open={this.state.inProgress} onClick={this.closeModal}>
          <CircularProgress color="inherit" />
           <h5> Loading Inventory</h5>
        </Backdrop>
        {!this.state.inProgress &&
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">SKU</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.items.map((item) => (
              <TableRow key={item.sku}>
                <TableCell component="th" scope="row">
                  {item.sku}
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.bran_name}</TableCell>
                <TableCell align="center">{item.product_outlets[0].price_ex_tax}</TableCell>
                <TableCell align="center">{item.product_outlets[0].available_inventory}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination count={Math.ceil(this.state.totalCount / 20)} page={this.state.page + 1} onChange={this.handlePageChange} />
      </TableContainer>}
    </div>
    );
  }
}
