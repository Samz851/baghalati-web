export default class Inventory {

    constructor(){
        // this.fetchPOSProductsURI = 'https://api.jubnawebaith.com/v1/pos/getProducts';
        // this.syncPOSProductsURI = 'https://api.jubnawebaith.com/v1/pos/syncPOS';
        // this.fetchDBProductsURI = 'https://api.jubnawebaith.com/v1/products/';
        // this.fetchActiveOrdersURI = 'https://api.jubnawebaith.com/v1/orders/activeOrders';
        // this.updateOrderStatusURI = 'https://api.jubnawebaith.com/v1/orders/updateOrderStatus';
        // this.updateProductInfoURI = 'https://api.jubnawebaith.com/v1/products/editProduct';
        // this.getProductByID = 'http://api.jubnawebaith.com/v1/products/';
        // this.fetchNewProductsURI = 'http://api.jubnawebaith.com/v1/pos/fetchNewProducts/';
        // this.updateLocalInventoryURI = 'https://api.jubnawebaith.com/v1/pos/updateLocalProducts/';
        // this.uploadFileImportURI = 'https://api.jubnawebaith.com/v1/products/importProducts';

        // DEV ENV
        this.fetchPOSProductsURI = 'http://localhost:3200/v1/pos/getProducts';
        this.syncPOSProductsURI = 'http://localhost:3200/v1/pos/syncPOS';
        this.fetchDBProductsURI = 'http://localhost:3200/v1/products/';
        this.fetchActiveOrdersURI = 'http://localhost:3200/v1/orders/activeOrders';
        this.updateOrderStatusURI = 'http://localhost:3200/v1/orders/updateOrderStatus';
        this.updateProductInfoURI = 'http://localhost:3200/v1/products/editProduct';
        this.getProductByID = 'http://localhost:3200/v1/products/'
        this.fetchNewProductsURI = 'http://localhost:3200/v1/pos/fetchNewProducts/'
        this.updateLocalInventoryURI = 'http://localhost:3200/v1/pos/updateLocalProducts/';
        this.uploadFileImportURI = 'http://localhost:3200/v1/products/importProducts';

        this.headers = {
            'content-type': 'application/json'
          }

    }

    async fetchPOSProducts(page, id){
        let request = await fetch(this.fetchPOSProductsURI + '?page=' + page + '&id=' + id, { method: 'GET' });
        let response = await request.json();
        return response;
    }

    async fetchSingleProduct(id){
        let request = await fetch(this.fetchDBProductsURI + id, { method: 'GET' });
        let response = await request.json();
        return response;
    }

    async syncProducts(id, override, password){
        override = true;
        let request = await fetch(this.syncPOSProductsURI, { method: 'POST', headers: this.headers, body: JSON.stringify({id: id, override: override, password: password}) });
        let response = await request.json();
        return response;
    }

    async fetchDBProducts(page, id){
        let offset = page == 0 ? 0 : 20 * page;
        let request = await fetch(this.fetchDBProductsURI + '?page=' + page + '&offset=' + offset +'&cat=all', { method: 'GET' });
        let response = await request.json();
        return response;
    }

    async fetchActiveOrders(){
        let request = await fetch(this.fetchActiveOrdersURI, { method: 'GET', headers: this.headers});
        let response = await request.json();
        return response;
    }

    async updateOrderStatus(id, status) {
        let request = await fetch(this.updateOrderStatusURI, { method: 'POST', headers: this.headers, body: JSON.stringify({id: id, status: status}) });
        // let response = await request.json();
        // return response;
    }

    async updateProductInfo(product){
        product.SID = localStorage.getItem('JWBSID');
        console.log(product);
        let update = await fetch(this.updateProductInfoURI, {method: 'POST', body: product});
        update = await update.json();
        console.log(update);
    };

    async fetchNewProducts(){
        let SID = localStorage.getItem('JWBSID');
        let update = await fetch(this.fetchNewProductsURI + SID, {method: 'GET'});
        update = await update.json();
        return update;
    }

    async updateLocalInventory(){
        let SID = localStorage.getItem('JWBSID');
        let update = await fetch(this.updateLocalInventoryURI + SID, {method: 'GET'});
        update = await update.json();
        return update;
    }

    async uploadFileImport(file, pass){
        file.SID = localStorage.getItem('JWBSID');
        let upload = await fetch(this.uploadFileImportURI, {method: 'POST', body: file});
        upload = await upload.json();
        return upload;
    }
}