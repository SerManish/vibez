import { Component, OnInit } from '@angular/core';
import { Message } from '../../../shared/message.model';

@Component({
	selector: 'app-message-area',
	templateUrl: './message-area.component.html',
	styleUrls: ['./message-area.component.css']
})
export class MessageAreaComponent implements OnInit {
	messages: Message[];
	userID: String;
	constructor() {
		this.messages = [
			new Message('1', '2', 'h', '1:00'),
			new Message('1', '2', 'Some  sdlkjflk sd nsldf lsda flktext', '1:00'),
			new Message('2', '1', 'Some text', '1:00'),
			new Message('1', '2', 'Some text', '1:00'),
			new Message('1', '2', 'Some  sadlk fj text', '1:00'),
			new Message('1', '2', 'Some  skdljf text', '1:00'),
			new Message('2', '1', 'Some  sdlf lksajdflk jsdlkj flkjsadlkfj lkasdjf lkjasdlkfj lkajsskdjf kdask jkdsafk ksdfj kjasdkf jkasjfdkjtext', '1:00'),
			new Message('2', '1', 'Some text', '1:00'),
			new Message('2', '1', 'Some text', '1:00'),
			new Message('2', '1', 'Some text', '1:00'),
			new Message('1', '2', 'Some text', '1:00'),
			new Message('2', '1', 'Some text', '1:00'),
			new Message('2', '1', 'Some text', '1:00'),
			new Message('1', '2', 'Some text', '1:00'),
			new Message('2', '1', 'Some text', '1:00'),
			new Message('2', '1', 'Some text', '1:00')
		];
		this.userID = '1';
	}

	ngOnInit(): void {
	}

}
