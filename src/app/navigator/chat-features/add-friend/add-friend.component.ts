import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-add-friend',
	templateUrl: './add-friend.component.html',
	styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

	showFindUser: boolean;
	constructor() {
		this.showFindUser = false;
	}

	ngOnInit(): void {
	}

}
