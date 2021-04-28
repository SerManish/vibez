import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/shared/chat.model';
import { ChatService } from 'src/app/shared/chat.service';

@Component({
	selector: 'app-chat-head',
	templateUrl: './chat-head.component.html',
	styleUrls: ['./chat-head.component.css']
})
export class ChatHeadComponent implements OnInit, OnDestroy {

	chat!: Chat;
	chatSwitchedSubscription: Subscription;
	
	constructor(private chatService: ChatService) {
		this.chatSwitchedSubscription = this.chatService.chatSwitched.subscribe((id)=>{
			this.chat = this.chatService.getChatByChatId(id);
		});
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.chatSwitchedSubscription.unsubscribe();
	}

	onDetailsOpen() {
		this.chatService.openDetails.next();
	}

}
