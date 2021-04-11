import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/chat.service';
import { Message } from 'src/app/shared/message.model';
import { LastChat } from '../../../shared/last-chat.model';

@Component({
	selector: 'app-last-chats',
	templateUrl: './last-chats.component.html',
	styleUrls: ['./last-chats.component.css']
})
export class LastChatsComponent implements OnInit, OnDestroy {

	lastChats: LastChat[];
	chatReceivedSubscription!: Subscription;
	lastChatUpdatedSubscription!: Subscription;

	constructor(private chatService: ChatService) {
		this.lastChats = [];
	}

	populateChats() {
		this.chatService.getLocalChat().forEach(chat => {
			this.lastChats.push(
				new LastChat(
					chat.id,
					chat.participants[0].profilePicture,
					chat.participants[0].name,
					chat.messages[chat.messages.length - 1].messageContent,
					chat.messages[chat.messages.length - 1].time
				)
			);
		});
	}

	ngOnInit(): void {
		this.populateChats();
		this.chatReceivedSubscription = this.chatService.chatsReceived.subscribe(() => {
			this.populateChats();
		});
		this.lastChatUpdatedSubscription = this.chatService.lastChatUpdated.subscribe((message: Message) => {
			let index = 0;
			for (let i = 0; i < this.lastChats.length; i++) {
				if (this.lastChats[i].chatId == message.chatID) {
					this.lastChats[i].lastMessage = message.messageContent;
					break;
				}
			}
		});
	}

	loadMessages(chatId: String) {
		this.chatService.chatSwitched.next(chatId);
	}

	ngOnDestroy(): void {
		this.chatReceivedSubscription.unsubscribe();
		this.lastChatUpdatedSubscription.unsubscribe();
	}

}
