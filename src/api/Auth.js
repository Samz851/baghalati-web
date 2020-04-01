export default class Auth {
    
    constructor(){
        // this.headers = {
        //     'content-type': 'application/json'
        //   },
        // this.registerURI = 'https://api.baghalati.com/api/admin/register/';
        // this.loginURI = 'https://api.baghalati.com/api/admin/login/';
    }
    registerURI = 'https://api.baghalati.com/api/admin/register/';
    loginURI = 'https://api.baghalati.com/api/admin/login';
    sidURI = 'https://api.baghalati.com/api/admin/sid'
    headers = {
        'content-type': 'application/json'
      }

    async login(data){
        let request = await fetch(this.loginURI, { method: 'POST', headers: this.headers, body: JSON.stringify(data)});
        let response = await request.json();
        if(response.success){
            localStorage.setItem('JWBSID', response.session);
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

    // async logOut(){
    //   let remove;
    //   try{
    //     remove = await AsyncStorage.removeItem(USER_KEY);
    //   }catch(err){
    //     throw err;
    //   }
    //   return ({success: true})
    // }

    // async login(data){
    //   let status = '';
    //     let request = await fetch(this.loginURI, { method: 'POST', headers: this.headers, body: JSON.stringify(data) });
    //     let response = await request.json();
    //     if(response.success){
    //       let token = await JWT.decode(response.token, JWT_KEY);
    //       let user = await AsyncStorage.setItem(USER_KEY, response.token);
    //       return { user: token, success: true, id: token.payload.ID };
    //     }else{
    //       return { success: false, message: response.message}
    //     }
    // }

    // async register(data){
    //   console.log('Auth Data:::');
    //   console.log(data);
    //   let request, response;
    //   try{
    //     request = await fetch(this.userURI, { method: 'POST', headers: this.headers, body: data });
    //   }catch(err){
    //     console.log('error in request::');
    //     console.log(err);
    //   }
    //   try{
    //     response = await request.json();
    //   }catch(error){
    //     console.log('error in response::');
    //     console.log(error);
    //   }
    //   if(response.success){
    //     console.log('RESPONSE:::::::::::::::::::::::');
    //     console.log(response);
    //     let token = await JWT.decode(response.token, JWT_KEY);
    //     let user = await AsyncStorage.setItem(USER_KEY, response.token);
    //     return { user: token, success: true, id: token.payload.ID };
    //   }else{
    //     return { success: false, message: response.message}
    //   }
    // }
    // async getUser(id){
    //   let request = await fetch(this.userURI + id, { method: 'GET', headers: this.headers });
    //   let response = await request.json();
    //   if(response.success){
    //     let token = await JWT.decode(response.token, JWT_KEY);
    //     let user = await AsyncStorage.setItem(USER_KEY, response.token);
    //     return { user: token, success: true };
    //   }else{
    //     return { success: false, message: response.message}
    //   }
    // }

    // async pushAddress(id, address){
    //   let request = await fetch(this.addressURI + id, { method: 'POST', headers: this.headers, body: JSON.stringify(address) });
    //   let response = await request.json();
    //   if(response.success){
    //         return {success: true}

    //   }
    //   return response;
    // }

    // async deleteAddress(id, address){
    //   console.log(this.addressURI + id + '/' + address);
    //   let request = await fetch(this.addressURI + id + '/' + address, { method: 'DELETE'});
    //   let response = await request.json();
    //   if(response.success){
    //     let token = await AsyncStorage.getItem(USER_KEY);
    //     token = await JWT.decode(token, JWT_KEY);
    //     token.payload.address= token.payload.address.filter(add => {return add._id !== address});
    //     token = await JWT.sign(token.payload, JWT_KEY,{ alg: "HS256"});
    //     try{
    //       await AsyncStorage.setItem(USER_KEY, token);
    //       return {success: true}
    //     }catch(err){
    //       return {success: false, message: "failed to save new token", error: err}
    //     }
    //   }
    //   return response;
    // }

    // async getAddresses(id){
    //   let request = await fetch(this.userURI + id, { method: 'GET' });
    //   let response = await request.json();
    //   if(response.success){
    //     let token = await JWT.decode(response.token, JWT_KEY);
    //     return {success: true, payload: token.payload, token: response.token};
    //   }else{
    //     return {success:false, message: "Failed to retrieve user"}
    //   }
    // }
    
}