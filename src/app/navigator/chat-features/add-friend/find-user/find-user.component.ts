import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
	selector: 'app-find-user',
	templateUrl: './find-user.component.html',
	styleUrls: ['./find-user.component.css']
})
export class FindUserComponent implements OnInit {

	results: User[];
	constructor(
		private chatService: ChatService,
		private userService: UserService
	) {
		this.results = [
			new User('609ae5a205b67d2288604ca0', 'shivam', '', '', '', ''),
			new User('609ae5f705b67d2288604ca2', 'manish', '', '', '', ''),
			new User('609afc3de753921f541df995', 'axay', '', '', '', '')
		];
	}

	ngOnInit(): void {
	}

	createNewChat(user: User) {
		this.chatService.newChat(user);
	}

}
