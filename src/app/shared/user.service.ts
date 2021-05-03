import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	currentUser: User;
	constructor() {
		this.currentUser = new User('','','','','','');
	}
}
