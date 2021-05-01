import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	loggedIn: boolean;
	authenticating = new Subject<boolean>();
	loginStatus = new Subject<boolean>();

	constructor(private http: HttpClient) {
		this.loggedIn = false;
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
			console.log(res);
			this.loggedIn = true;
			this.loginStatus.next(this.loggedIn);
			this.authenticating.next(false);
		}, (error) => {
			console.log('error ', error);
			this.authenticating.next(false);
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
			console.log(res);
			this.loggedIn = true;
			this.loginStatus.next(this.loggedIn);
			this.authenticating.next(false);
		}, (error) => {
			console.log('error ', error.error.error);
			this.authenticating.next(false);
		});
	}

	logout() {
		setTimeout(() => {
			this.loggedIn = false;
			this.loginStatus.next(this.loggedIn);
		}, 1000);
	}

}
