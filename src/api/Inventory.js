export default class Inventory {

    constructor(){
        this.fetchPOSProductsURI = 'https://api.jubnawebaith.com/v1/pos/getProducts';
        this.syncPOSProductsURI = 'https://api.jubnawebaith.com/v1/pos/syncPOS';
        this.fetchDBProductsURI = 'https://api.jubnawebaith.com/v1/products/';
        this.fetchActiveOrdersURI = 'https://api.jubnawebaith.com/v1/orders/activeOrders';
        this.updateOrderStatusURI = 'https://api.jubnawebaith.com/v1/orders/updateOrderStatus';
        this.headers = {
            'content-type': 'application/json'
          }

    }

    async fetchPOSProducts(page, id){
        let request = await fetch(this.fetchPOSProductsURI + '?page=' + page + '&id=' + id, { method: 'GET' });
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
        let request = await fetch(this.fetchDBProductsURI + '?page=' + page + '&offset=' + offset, { method: 'GET' });
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
}