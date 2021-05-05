import { KeyValue } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/chat.service';
import { Message } from 'src/app/shared/message.model';
import { LastChat } from '../../../shared/last-chat.model';

@Component({
	selector: 'app-last-chats',
	templateUrl: './last-chats.component.html',
	styleUrls: ['./last-chats.component.css']
})
export class LastChatsComponent implements OnInit, OnDestroy {

	lastChats: Map<String, LastChat>;
	lastChatReceivedSubscription!: Subscription;
	lastChatUpdatedSubscription!: Subscription;
	selectedChatId: String;

	constructor(private chatService: ChatService) {
		this.lastChats = new Map();
		this.selectedChatId = '';
	}

	// keeps last chats sorted according to their lastTime
	lastChatsComparator = (a: KeyValue<String, LastChat> , b: KeyValue<String, LastChat>) => {
		const x = a.value.lastTime ? a.value.lastTime.getTime():0;
		const y = b.value.lastTime ? b.value.lastTime.getTime():0;
		return (x!=y) ? (x>y ? -1 : 1) : 0; 
	}

	ngOnInit(): void {
		this.lastChatReceivedSubscription = this.chatService.lastChatsReceived.subscribe((lastChats) => {
			this.lastChats = lastChats;
		});
		
		this.lastChatUpdatedSubscription = this.chatService.lastChatUpdated.subscribe((message: Message) => {
			const refLastChat = this.lastChats.get(message.chatID);
			const newLastChat = new LastChat(refLastChat!.chatId, refLastChat!.profilePicture, refLastChat!.name, message.messageContent, message.time);
			
			// delete and then add a new LastChat object to get the comparator running
			this.lastChats.delete(message.chatID);
			this.lastChats.set(message.chatID, newLastChat);
		});
	}

	loadMessages(lastChat: LastChat) {
		this.selectedChatId = lastChat.chatId;
		this.chatService.loadChatByChatId(lastChat);
		this.chatService.closeDetails.next();
	}

	ngOnDestroy(): void {
		this.lastChatReceivedSubscription.unsubscribe();
		this.lastChatUpdatedSubscription.unsubscribe();
	}

}
