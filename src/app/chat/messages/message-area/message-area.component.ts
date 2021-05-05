import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/chat.service';
import { UserService } from 'src/app/shared/user.service';
import { Message } from '../../../shared/message.model';

@Component({
	selector: 'app-message-area',
	templateUrl: './message-area.component.html',
	styleUrls: ['./message-area.component.css']
})
export class MessageAreaComponent implements OnInit, OnDestroy {
	messages: Message[];
	userID: String;
	chatSwitchedSubscription: Subscription;

	constructor(
		private chatService: ChatService,
		private userService: UserService
	) {
		this.messages = [];
		this.userID = '';
		this.chatSwitchedSubscription = this.chatService.chatSwitched.subscribe((chat) => {
			this.userID = this.userService.currentUser._id;
			if(chat != undefined) {
				this.messages = chat.messages;
			}
		});
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.chatSwitchedSubscription.unsubscribe();
	}

}
