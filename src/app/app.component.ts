import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './shared/authentication.service';
import { ChatService } from './shared/chat.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'vibez';

	genericWelcome: boolean;
	loggedIn: boolean;
	tryingAutoLogin: boolean;
	loginStatusSubscription: Subscription;
	tryingLoginSubscription: Subscription;
	chatChangedSubscription: Subscription;

	constructor(private authenticationService: AuthenticationService, private chatService: ChatService) {
		this.genericWelcome = true;
		this.tryingAutoLogin = false;
		this.loggedIn = false;

		this.loginStatusSubscription = this.authenticationService.loginStatus.subscribe((status) => {
			this.genericWelcome = true;
			this.loggedIn = status;
		});

		this.chatChangedSubscription = this.chatService.chatSwitched.subscribe(() => {
			this.genericWelcome = false;
		});

		this.tryingLoginSubscription = this.authenticationService.tryingAutoLogin.subscribe((res) => {
			this.tryingAutoLogin = res;
		});
	}

	ngOnInit(): void {
		this.authenticationService.autoLogin();
	}

	ngOnDestroy(): void {
		this.loginStatusSubscription.unsubscribe();
		this.chatChangedSubscription.unsubscribe();
		this.tryingLoginSubscription.unsubscribe();
	}
}
