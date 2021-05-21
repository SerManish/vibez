import { KeyValue } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/chat.service';
import { Message } from 'src/app/shared/message.model';
import { MessagingService } from 'src/app/shared/messaging.service';
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

	constructor(private chatService: ChatService, private messagingService: MessagingService) {
		this.lastChats = new Map();
		this.selectedChatId = '';
	}

	// keeps last chats sorted according to their lastTime
	lastChatsComparator = (a: KeyValue<String, LastChat> , b: KeyValue<String, LastChat>) => {
		const x = a.value.lastMessage.time? a.value.lastMessage.time.getTime():0;
		const y = b.value.lastMessage.time? b.value.lastMessage.time.getTime():0;
		return (x!=y) ? (x>y ? -1 : 1) : 0;
	}

	ngOnInit(): void {
		this.lastChatReceivedSubscription = this.chatService.lastChatsReceived.subscribe((lastChats : Map<String,LastChat>) => {
			lastChats.forEach((value, key) => {
				this.messagingService.join(value.chatId);
			})

			this.lastChats = lastChats;
		});
		
		this.lastChatUpdatedSubscription = this.chatService.lastChatUpdated.subscribe((newMessage) => {
			const refLastChat = this.lastChats.get(newMessage.chatId);
			const newLastChat = new LastChat(refLastChat!.chatId, newMessage.message, refLastChat!.type, refLastChat!.participants);
			
			// delete and then add a new LastChat object to get the comparator running
			this.lastChats.delete(newMessage.chatId);
			this.lastChats.set(newMessage.chatId, newLastChat);
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
