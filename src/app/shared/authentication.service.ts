import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { UserService } from './user.service';
import { ChatService } from './chat.service';
import { User } from './user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	authenticating = new Subject<boolean>();
	loginStatus = new Subject<boolean>();
	tryingAutoLogin = new Subject<boolean>();

	constructor(
		private http: HttpClient, 
		private userService: UserService, 
		private chatService: ChatService
	) { }

	autoLogin() {
		this.tryingAutoLogin.next(true);
		const token = localStorage.getItem('token')?.toString();

		// check if a token is stored in localStorage
		if(token != null && token != undefined && token!='undefined'){
			const decodedToken: any = jwt_decode(token);
			const currentTime = new Date().getTime();

			// check if token has expired
			//if expired then remove the token from localStorage
			if(decodedToken.exp*1000 > currentTime){
				// this.userService.loadCurrentUserData(decodedToken._id);
				this.userService.getUserById(decodedToken._id)
				.then((user: any) => {
					this.userService.currentUser = new User(
						user._id,
						user.name,
						'',
						user.status,
						user.email,
						user.handle
					);
					this.chatService.loadLastChats();
					this.loginStatus.next(true);
					this.authenticating.next(false);
					this.tryingAutoLogin.next(false);

				}).catch((err) => {
					console.log('error: ', err);
					localStorage.removeItem('token');
					this.authenticating.next(false);
					this.tryingAutoLogin.next(false);
				})
			}
			else {
				localStorage.removeItem('token');
				this.tryingAutoLogin.next(false);
			}
		}
		else this.tryingAutoLogin.next(false);
	}

	signup(user: any) {
		const signupURL = '/signup';
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
			this.chatService.clearChatData();
			this.loginStatus.next(false);
		}, 1000);
	}

	onAuthSuccess(res: any) {
		this.userService.currentUser = res.user;
		localStorage.setItem('token', res.token);
		this.chatService.loadLastChats();
		this.loginStatus.next(true);
		this.authenticating.next(false);
	}

	onAuthFailure(err: any) {
		console.log(`Error: ${err.error.error}`);
		this.authenticating.next(false);
	}

}
