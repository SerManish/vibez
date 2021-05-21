import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/chat.service';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

	openDetailsSubscription: Subscription;
	user: User;
	constructor(
		private chatService: ChatService
	) {
		this.user = new User('','','','','','');
		this.openDetailsSubscription = this.chatService.openDetails.subscribe(user => {
			this.user = user;
		})
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.openDetailsSubscription.unsubscribe();
	}

	onClose() {
		this.chatService.closeDetails.next();
	}
}
