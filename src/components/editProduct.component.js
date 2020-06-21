import React, { Component } from 'react';
import { Card, CardActions,
    CardContent, Button,
    Input, Link,
    Avatar,TextField,
    CardActionArea, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import imageToBase64 from 'image-to-base64';

export default class EditProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: {},
            product_img: '',
            edited: false,
            edited_product: {}
        }
    }

    async componentDidMount(){
        this.forceUpdate();
        let product = await this.props.inventory.fetchSingleProduct(this.props.productID);
        console.log(product);
        let product_img = await imageToBase64(product.product.primary_image);
        // console.log(product_img);
        await this.setState({edited_product: {_id: product.product._id}, product: product.product, product_img: `data:image/jpg;base64,${product_img}`});
    }

    async uploadImage(val){
        let self = this;
        console.log('The VAL IS:::')
        console.log(val);
        let reader = new FileReader();
        reader.onload = function(upload) {
            console.log(upload.target.result);
            self.setState({
                product_img: upload.target.result,
                new_image_file: val
            });
        };
        reader.readAsDataURL(val);
        this.setState({edited: true})
    }

    async handleInputChange(input, val){
        console.log(`${input} : ${val}`);
        if(val == ''){
            let reset = this.state.product;
            let product = this.state.edited_product;
            console.log(`this is : ${product[input]} :: ${reset[input]}`)
            product[input] = reset[input];

            this.setState({
                edited_product: product
            })
        }
        let product = this.state.edited_product;
        product[input] = val;
        this.setState({
            edited_product: product
        })
        console.log(this.state.edited_product);

    }

    async submitEditedProduct(){
        let finalProduct = this.state.edited_product
        finalProduct.file = this.state.product_img !== '' ? this.state.new_image_file : null;
        console.log(typeof this.state.new_image_file);
        // console.log(Object.keys(this.state.new_image_file));
        console.log(this.state.new_image_file);
        await this.setState({product: this.state.edited_product});
        let data = new FormData();
        for (const key in finalProduct) {
            console.log(key);
            console.log(finalProduct[key]);
            data.append(key, finalProduct[key]);
        }
        let update = await this.props.inventory.updateProductInfo(data);
        console.log(finalProduct);
    }


  render() {
    return (
        <div> 
          <Card className="jwb-product-card">
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={this.props.close}>
            <CloseIcon/>
          </IconButton>
            <h3>{this.state.product.name + ' ' + this.state.product.bran_name}</h3>
            <CardContent>
                <img src={this.state.product_img} width={120} height={120}/>
                <div>
                {/* <Box width={'100%'} height={100} style={{ backgroundImage: url(`data:image/jpg;base64,${this.state.product_img}`) }} /> */}
                    {/* <Avatar className="jwb-product-avatar" alt={this.state.product.name} src={{uri: `data:image/jpg;base64,${this.state.product_img}`}}/> */}
                    <input accept="image/jpeg" className='' id="icon-button-file" type="file" onChange={(e)=>this.uploadImage(e.target.files[0])} hidden/>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                        </IconButton>
                    </label>
                </div>
                <form noValidate autoComplete="off">
                    <div><Input id="filled-basic" label="Name" variant="filled" placeholder={ this.state.product.name} onChange={(e)=>{this.handleInputChange('name',e.target.value)}} /></div>
                    <div><Input id="filled-basic" label="Arabic Name" variant="filled" placeholder={ this.state.product.name_ar} onChange={(e)=>{this.handleInputChange('name_ar',e.target.value)}} /></div>
                    <div><Input id="filled-basic" label="Description" variant="filled" placeholder={ this.state.product.description} onChange={(e)=>{this.handleInputChange('description',e.target.value)}} /></div>
                    
                </form>
            </CardContent>
            <CardActions>
                <Button size="small" className="jwb-edit-product-btn" onClick={ () => { this.submitEditedProduct() } }>Submit</Button>
            </CardActions>
          </Card>
        </div>
    );
  }
}
