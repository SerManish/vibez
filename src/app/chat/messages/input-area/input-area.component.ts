import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/chat.service';
import { Message } from 'src/app/shared/message.model';
import { MessagingService } from 'src/app/shared/messaging.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
	selector: 'app-input-area',
	templateUrl: './input-area.component.html',
	styleUrls: ['./input-area.component.css']
})
export class InputAreaComponent implements OnInit, OnDestroy {
	chatSwitchedSubscription: Subscription;
	chatId: String;
	@ViewChild('messageTextArea', { static: true })
	textArea!: ElementRef;

	constructor(
		private chatService: ChatService,
		private userService: UserService,
		private messagingService: MessagingService
	) {
		this.chatId = '';
		this.chatSwitchedSubscription = this.chatService.chatSwitched.subscribe((chat) => {
			this.chatId = chat.id;
			this.textArea.nativeElement.value = '';
			this.textArea.nativeElement.focus();
		});
	}

	ngOnInit(): void {
	}

	onEnter() {
		this.textArea.nativeElement.value = this.textArea.nativeElement.value.slice(0, -1);
		this.sendMessage();
	}

	sendMessage() {
		let val = this.textArea.nativeElement.value.trim();
		if (val.length > 0)
			this.messagingService.sendMessage(new Message(this.userService.currentUser._id, this.chatId, val, new Date()));
		this.textArea.nativeElement.value = '';
	}

	ngOnDestroy(): void {
		this.chatSwitchedSubscription.unsubscribe();
	}

}
