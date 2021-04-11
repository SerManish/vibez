import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
  	loggedIn :boolean
	loginStatus = new Subject<boolean>();

  	constructor() {
    this.loggedIn = false;
   	}

	login()
	{
		setTimeout(()=>{
			this.loggedIn = true;
			this.loginStatus.next(true);
		},4000);
	}

	logout()
	{
		setTimeout(()=>{
			this.loggedIn = false;
			this.loginStatus.next(false);
		},4000);
	}

}
