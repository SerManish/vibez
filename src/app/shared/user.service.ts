import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	currentUser: User;
	loadedRequestedUser: Subject<User>;
	constructor(private http: HttpClient) {
		this.currentUser = new User('','','','','','');
		this.loadedRequestedUser = new Subject();
	}

	getUserById(id: String) {
		return this.http.get(`/user/${id}`).toPromise();
	}
}
