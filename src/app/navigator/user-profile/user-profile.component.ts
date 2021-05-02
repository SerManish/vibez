import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { User } from 'src/app/shared/user.model';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	user: User;
	constructor(private authenticationService: AuthenticationService) {
		this.user = this.authenticationService.currentUser;
	}

	ngOnInit(): void {
	}

	logout() {
		this.authenticationService.logout();
	}

}
