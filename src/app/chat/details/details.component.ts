import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	constructor(private chatService: ChatService) { }

	ngOnInit(): void {
	}

	onClose() {
		this.chatService.closeDetails.next();
	}
}
