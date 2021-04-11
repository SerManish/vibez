import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../shared/chat.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
	isActiveDetails: boolean;
	detailOpenSubscription: Subscription;
	detailCloseSubscription: Subscription;
	constructor(private chatService: ChatService) {
		this.isActiveDetails = false;

		this.detailCloseSubscription = this.chatService.closeDetails.subscribe(()=>{
			this.isActiveDetails = false;
		});
		
		this.detailOpenSubscription = this.chatService.openDetails.subscribe(()=>{
			this.isActiveDetails = true;
		});
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.detailCloseSubscription.unsubscribe();
		this.detailOpenSubscription.unsubscribe();
	}
}
