import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/chat.service';
import { LastChat } from '../../../shared/last-chat.model';

@Component({
	selector: 'app-last-chats',
	templateUrl: './last-chats.component.html',
	styleUrls: ['./last-chats.component.css']
})
export class LastChatsComponent implements OnInit, OnDestroy {

	lastChats: LastChat[];
	chatReceivedSubscription: Subscription;

	constructor(private chatService: ChatService) {
		this.lastChats = [];
		this.chatReceivedSubscription = chatService.chatsReceived.subscribe(()=>{
            this.populateChats();
        });
	}

    populateChats ()
    {
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

	}

    loadMessages(chatId : String)
    {
        this.chatService.chatSwitched.next(chatId);
    }

    ngOnDestroy():void{
        this.chatReceivedSubscription.unsubscribe();
    }

}
