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
			new User('6092ff22550c743818ae7d1e', 'shivam', '', '', '', ''),
			new User('6092ff35550c743818ae7d20', 'manish', '', '', '', ''),
			new User('6092ff4c550c743818ae7d22', 'axay', '', '', '', '')
		];
	}

	ngOnInit(): void {
	}

	createNewChat(user: User) {
		this.chatService.newChat(user);
	}

}
