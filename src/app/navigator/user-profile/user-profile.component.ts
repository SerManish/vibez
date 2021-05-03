import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	user: User;
	constructor(private authenticationService: AuthenticationService, private userService: UserService) {
		this.user = this.userService.currentUser;
	}

	ngOnInit(): void {
	}

	logout() {
		this.authenticationService.logout();
	}

}
