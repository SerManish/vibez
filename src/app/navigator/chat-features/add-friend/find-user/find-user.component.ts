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
			new User('60a7f8fc0d51622358ba3b4b', 'shivam', '', '', '', ''),
			new User('60a7f8f80d51622358ba3b49', 'manish', '', '', '', '')
		];
	}

	ngOnInit(): void {
	}

	createNewChat(user: User) {
		this.chatService.newChat(user);
	}

}
