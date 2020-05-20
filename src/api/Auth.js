export default class Auth {
    
    constructor(){
    }
    registerURI = 'https://api.jubnawebaith.com/v1/admin/register/';
    loginURI = 'https://api.jubnawebaith.com/v1/admin/login';
    sidURI = 'https://api.jubnawebaith.com/v1/admin/sid';
    optionsURI = 'https://api.jubnawebaith.com/v1/admin/pushBanner';
    getBannersURI = 'https://api.jubnawebaith.com/v1/admin/getBanners';
    deleteBannersURI = 'https://api.jubnawebaith.com/v1/admin/deleteBanners/';
    refreshTokenURI = 'https://api.jubnawebaith.com/v1/pos/refreshToken';
    deliveryFeeURI = 'https://api.jubnawebaith.com/v1/admin/deliveryFee';
    // registerURI = 'http://localhost:3210/api/admin/register/';
    // loginURI = 'http://localhost:3210/api/admin/login';
    // sidURI = 'http://localhost:3210/api/admin/sid';
    // optionsURI = 'http://localhost:3210/api/admin/pushBanner';
    headers = {
        'content-type': 'application/json'
      }

    async login(data){
        let request = await fetch(this.loginURI, { method: 'POST', headers: this.headers, body: JSON.stringify(data)});
        let response = await request.json();
        if(response.success){
            localStorage.setItem('JWBSID', response.session);
            localStorage.setItem('JWBSTORESTATUS', response.is_connected);
            return {success: true};
        }else{
            return {success: false, message: response.message}
        }
    }

    async verifySID(sid){
        let request = await fetch(this.sidURI, { method: 'POST', headers: this.headers, body: JSON.stringify({sid:sid})});
        let response = await request.json();
        if(response.success){
            localStorage.setItem('JWBSID', response.session);
            return {success: true};
        }else{
            return {success: false, message: response.message}
        }
    }

    async pushBanner(data){
        let formData = new FormData();
        formData.append('banner', data);
        console.log(formData)

        let request = await fetch(this.optionsURI, { method: 'POST', body: data});
        let response = await request.json().catch((error)=>{
            console.log('PARSE ERROR');
            console.log(error);
        });

        if(response.success){
            return {success: true, banners: response.banners};
        }else{
            return {success: false, message: 'Failed to fetch banners'};
        }
    }

    async getBanners(){
        let request = await fetch(this.getBannersURI, {method: 'GET'});
        let response = await request.json();
        if(response.success){
            return {success: true, banners: response.banners}
        }else{
            return {success: true, message: 'Failed to fetch banners'};
        }
    }

    async deleteBanners(id){
        let request = await fetch(this.deleteBannersURI+ '?id=' + id, { method: 'GET' });
        let response = await request.json();
        return {success: response.success};
    }

    async refreshToken(id){
        let request = await fetch(this.refreshTokenURI + '?id=' + id, { method: 'GET' });
        let response = await request.json();
        return {
            success: response.success
        }
    }

    async updateDeliveryFee(fee, id){
        try{
            let request = await fetch(this.deliveryFeeURI, { method: 'POST', headers: this.headers, body: JSON.stringify({fee: fee, id: id}) });
            let response = await request.json();
            return {
                success: response.success,
                option: response.result
            }
        }catch(error){
            console.log(error);
        }

    }

    async getDeliveryFee(){
        try{
            let request = await fetch(this.deliveryFeeURI, { method: 'GET' });
            let response = await request.json();
            return {
                success: response.success,
                option: response.option
            }
        }catch(error){
            console.log(error);
        }
    }
    
}