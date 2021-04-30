import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './shared/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
	title = 'vibez';
	loggedIn = false;
	loginStatusSubscription: Subscription;

	constructor(private authenticationService: AuthenticationService) {
		this.loginStatusSubscription = authenticationService.loginStatus.subscribe((status) => {
			this.loggedIn = status;
		});
	}

	ngOnDestroy(): void {
		this.loginStatusSubscription.unsubscribe();
	}
}
