import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/shared/chat.model';
import { ChatService } from 'src/app/shared/chat.service';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
	selector: 'app-chat-head',
	templateUrl: './chat-head.component.html',
	styleUrls: ['./chat-head.component.css']
})
export class ChatHeadComponent implements OnInit, OnDestroy {

	chat!: Chat;
	chatSwitchedSubscription!: Subscription;
	
	constructor(
		private chatService: ChatService,
		private userService: UserService
	) { }

	ngOnInit(): void {
		this.chat = new Chat('0', 'individual', [new User('0','vibez', '', '','','')], []);
		
		this.chatSwitchedSubscription = this.chatService.chatSwitched.subscribe((chat)=>{
			this.chat = chat;
		});
	}

	ngOnDestroy(): void {
		this.chatSwitchedSubscription.unsubscribe();
	}

	onDetailsOpen() {
		this.userService.loadPublicProfile(this.chat.participants[0]._id);
		this.chatService.openDetails.next();
	}

}
