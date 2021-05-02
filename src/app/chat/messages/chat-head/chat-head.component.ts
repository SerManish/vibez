import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/shared/chat.model';
import { ChatService } from 'src/app/shared/chat.service';
import { User } from 'src/app/shared/user.model';

@Component({
	selector: 'app-chat-head',
	templateUrl: './chat-head.component.html',
	styleUrls: ['./chat-head.component.css']
})
export class ChatHeadComponent implements OnInit, OnDestroy {

	chat!: Chat;
	chatSwitchedSubscription!: Subscription;
	
	constructor(private chatService: ChatService) { }

	ngOnInit(): void {
		this.chat = new Chat('0', 'individual', [new User('0','vibez', '', '','','')], []);
		this.chatSwitchedSubscription = this.chatService.chatSwitched.subscribe((id)=>{
			const receivedChat = this.chatService.getChatByChatId(id)
			if(receivedChat != undefined) {
				this.chat = receivedChat;
			}
		});
	}

	ngOnDestroy(): void {
		this.chatSwitchedSubscription.unsubscribe();
	}

	onDetailsOpen() {
		this.chatService.openDetails.next();
	}

}
