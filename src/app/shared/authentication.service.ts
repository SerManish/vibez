import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';
import jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	loggedIn: boolean;
	authenticating = new Subject<boolean>();
	loginStatus = new Subject<boolean>();
	tryingAutoLogin = new Subject<boolean>();
	currentUser: User;

	constructor(private http: HttpClient) {
		this.loggedIn = false;
		this.currentUser = new User('','','','','','');
	}

	autoLogin() {
		this.tryingAutoLogin.next(true);
		const token = localStorage.getItem('token')?.toString();

		// check if a token is stored in localStorage
		if(token != null && token != undefined){
			const decodedToken: any = jwt_decode(token);
			const currentTime = new Date().getTime();

			// console.log(`Current Time : ${currentTime}, Expire Time: ${decodedToken.exp*1000}`);
			// check if token has expired
			//if expired then remove the token from localStorage
			if(decodedToken.exp*1000 > currentTime){
				this.loginStatus.next(true);
			}
			else {
				localStorage.removeItem('token');
			}
		}
		this.tryingAutoLogin.next(false);
	}

	signup(user: any) {
		const signupURL = '/signup';
		// console.log('andar ', user);
		const { name, handle, email, password } = user; 
		this.http.post(
			signupURL,
			{
				name,
				handle,
				email,
				password
			}
		).subscribe((res) => {
			this.onAuthSuccess(res);
		}, (err) => {
			this.onAuthFailure(err);
		});
	}

	login(user: any) {
		const loginURL = '/login';
		const { handle, password } = user;
		this.http.post(
			loginURL,
			{
				handle,
				password
			}
		).subscribe((res) => {
			this.onAuthSuccess(res);
		}, (err) => {
			this.onAuthFailure(err);
		});
	}

	logout() {
		setTimeout(() => {
			localStorage.removeItem('token');
			this.loggedIn = false;
			this.loginStatus.next(this.loggedIn);
		}, 1000);
	}

	onAuthSuccess(res: any) {
		this.currentUser = res.user;
		localStorage.setItem('token', res.token);
		this.loggedIn = true;
		this.loginStatus.next(this.loggedIn);
		this.authenticating.next(false);
	}

	onAuthFailure(err: any) {
		console.log(`Error: ${err.error.error}`);
		this.authenticating.next(false);
	}

}
