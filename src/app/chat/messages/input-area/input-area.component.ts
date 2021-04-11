import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/chat.service';
import { Message } from 'src/app/shared/message.model';

@Component({
	selector: 'app-input-area',
	templateUrl: './input-area.component.html',
	styleUrls: ['./input-area.component.css']
})
export class InputAreaComponent implements OnInit,OnDestroy {
	chatSwitchedSubscription: Subscription;
	chatId : String;
	@ViewChild('messageTextArea', { static: true })
	textArea!: ElementRef;

	constructor(private chatService : ChatService) {
		this.chatId = '';
		this.chatSwitchedSubscription = this.chatService.chatSwitched.subscribe((id) => {
			this.chatId = id;
			this.textArea.nativeElement.focus();
		});
	 }

	ngOnInit(): void {
	}

	sendMessage(){
		if(this.textArea.nativeElement.value != '')
		{
			this.chatService.sendMessage(new Message('1',this.chatId,this.textArea.nativeElement.value,new Date()));
			this.textArea.nativeElement.value = '';
		}
	}

	ngOnDestroy(): void {
		this.chatSwitchedSubscription.unsubscribe();
	}

}
