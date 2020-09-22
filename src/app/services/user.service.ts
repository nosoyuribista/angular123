import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from'rxjs/Observable';
import { GlOBAL } from './global';

@Injectable()
export class UserService{

	public url: string;
	public identity;
	public token;

	constructor(private _http: Http){
		this.url = GlOBAL.url;
	}

	signup(user_to_login){
		let json = JSON.stringify(user_to_login);
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'/login',params,{headers: headers})
						 .map(res => res.json());

	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));
		if(identity != "undefined"){
			this.identity = identity;

		}else{
			this.identity = null;
		}
		return this.identity;
	}

	getToken(){
		let token = JSON.parse(localStorage.getItem('token'));
		if(token != "undefined"){
			this.token = token;

		}else{
			this.token = null;
		}
		return this.token;
	}

	register(user_to_register){
		let json = JSON.stringify(user_to_register);
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+'/user/new',params,{headers: headers})
							.map(res => res.json());
	}
	update_user(user_to_update){
		let json = JSON.stringify(user_to_update);
		let params = "json="+json+'&autorization='+this.getToken();
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+'/user/edit',params,{headers: headers})
							.map(res => res.json());
	}





}