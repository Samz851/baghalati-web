export default class Inventory {

    constructor(){
        this.fetchPOSProductsURI = 'https://api.baghalati.com/api/pos/getProducts';
    }

    async fetchPOSProducts(page, id){
        let request = await fetch(this.fetchPOSProductsURI + '?page=' + page + '&id=' + id, { method: 'GET' });
        let response = await request.json();
        return response;
    }
}