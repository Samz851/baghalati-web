import React, { Component } from 'react';
import {
  Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow,
  Paper, CircularProgress,
  Backdrop, Link
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Inventory from '../../api/Inventory';
import Auth from '../../api/Auth';
import EditProduct from '../../components/editProduct.component';

export default class InventoryLocal extends Component {
  constructor(props){
    super(props)
    this.state = {
      page : 0,
      items: [],
      inProgress: true,
      id: '',
      editing: false,
      productID: '',
      api: new Inventory()
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  async componentDidMount(){
    const id = localStorage.getItem('JWBSID');
    this.setState({id: id});
    let api = this.state.api;
    try{
      let products = await api.fetchDBProducts(this.state.page, id);
      console.log(products)
        this.setState({items: products.result});
        this.setState({totalCount: products.total});
        this.setState({inProgress: false});
    }catch(error){
      throw error;
    }
  }

  async handlePageChange(e, v){
    console.log(v);
    let api = new Inventory();
    await this.setState({page: v -1, items:[], inProgress: true});
    console.log(this.state.page);
    let products = await api.fetchDBProducts(this.state.page, this.state.id);
    this.setState({items: products.result});
    this.setState({inProgress: false});

  }

  editProduct(id){
    this.setState({inProgress: true, editing: true, productID: id});
  }

  closeModal(){
    this.setState({inProgress: false, editing: false});
  }

  render() {
    return (
      <div> 
        <Backdrop className="jwb-inventory-modal" open={this.state.inProgress}>
          {!this.state.editing &&
                  <div>
                    <CircularProgress color="inherit" />
                    <h5> Loading Inventory</h5>
                  </div>
          }

          {this.state.editing &&

          <EditProduct productID={this.state.productID} inventory={this.state.api} close={this.closeModal.bind(this)}/>

          }

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
                <TableCell align="center">Actions</TableCell>
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
                  <TableCell align="center">{item.price.price_ex_tax.$numberDecimal}</TableCell>
                  <TableCell align="center">0</TableCell>
                  <TableCell align="center">
                    <Link href="#" onClick={()=>{this.editProduct(item._id)}}>
                      Edit
                    </Link>
                  </TableCell>
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
