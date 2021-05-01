import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './shared/authentication.service';
import { ChatService } from './shared/chat.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
	title = 'vibez';

	genericWelcome: boolean;
	loggedIn = false;
	loginStatusSubscription: Subscription;
	chatChangedSubscription: Subscription;

	constructor(private authenticationService: AuthenticationService, private chatService: ChatService) {
		this.genericWelcome = true;
		this.loginStatusSubscription = this.authenticationService.loginStatus.subscribe((status) => {
			this.genericWelcome = true;
			this.loggedIn = status;
		});
		this.chatChangedSubscription = this.chatService.chatSwitched.subscribe((id) => {
			this.genericWelcome = false;
		})
	}

	ngOnDestroy(): void {
		this.loginStatusSubscription.unsubscribe();
		this.chatChangedSubscription.unsubscribe();
	}
}
