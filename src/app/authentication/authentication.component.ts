import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

	constructor(private authenticationService: AuthenticationService) { }

	ngOnInit(): void {
	}
	
	login()
	{
		this.authenticationService.login();
	}

}
