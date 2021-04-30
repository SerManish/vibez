import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
	isSubmitted: boolean;
	isLoginSelected: boolean;
	submitSubscription!: Subscription;

	constructor(private authenticationService: AuthenticationService) {
		this.isSubmitted = false;
		this.isLoginSelected = true;
	}

	ngOnInit(): void {
		this.submitSubscription = this.authenticationService.authenticating.subscribe((res) => this.isSubmitted = res);
	}

	onLogin(form: NgForm) {
		this.authenticationService.authenticating.next(true);
		this.authenticationService.login(form.form.value);
	}

	onSignup(form: NgForm) {
		this.authenticationService.authenticating.next(true);
		this.authenticationService.signup(form.form.value);
	}

	selectLogin() {
		this.isLoginSelected = true;
	}

	selectSignup() {
		this.isLoginSelected = false;
	}

	ngOnDestroy(): void {
		this.submitSubscription.unsubscribe();
	}
}
