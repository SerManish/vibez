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

	loadPublicProfile(id: String) {
		this.http.get(`/user/${id}`).subscribe((user: any) => {
			this.loadedRequestedUser.next(
				new User(
					user._id,
					user.name,
					'',
					user.status,
					user.email,
					user.handle
				)
			);
		});
	}

	getUserById(id: String) {
		return this.http.get(`/user/${id}`).toPromise();
	}
}
