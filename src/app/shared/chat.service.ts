import { Injectable } from '@angular/core';
import { Chat } from './chat.model';
import { Message } from './message.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { LastChat } from './last-chat.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	lastChatsReceived = new Subject<any>();
	chatSwitched = new Subject<Chat>();
	lastChatUpdated = new Subject<Message>();
	closeDetails = new Subject<any>();
	openDetails = new Subject<any>();

	private localLastChats: Map<String, LastChat>;
	private localChats: Map<String, Chat>;

	constructor(
		private http: HttpClient,
		private userService: UserService
	) {
		this.localChats = new Map();
		this.localLastChats = new Map();
	}

	loadLastChats(): void {
		this.http.get<Array<any>>('/chat/all').subscribe(async (lastChats) => {
			await Promise.all(lastChats.map(async (lastChat) => {
				const user0 = lastChat.participants[0];
				const user1 = lastChat.participants[1];
				if (user0 == this.userService.currentUser._id)
					[lastChat.participants[0], lastChat.participants[1]] = [user1, user0];
				const userID = lastChat.participants[0];

				await (this.userService.getUserById(userID)
					.then((user: any) => {
						const lastMessage = lastChat.messages.length == 0 ? 'No messages in Chat' : lastChat.messages[lastChat.messages.length - 1];
						this.localLastChats.set(
							lastChat._id,
							//change krna hai last message aur date backend se
							new LastChat(lastChat._id, '', user.name, lastMessage.messageContent, new Date(lastMessage.time || '0'))
						);
					}).catch((err) => {
						console.log('Error: ', err);
					}));
			}));
			this.lastChatsReceived.next(this.localLastChats);
		});
	}

	newChat(user: User) {
		// console.log('creating new chat with user :', user);
		this.http.post(
			'/chat/create',
			{
				"type": "individual",
				"participants": [
					user._id,
					this.userService.currentUser._id
				],
				"messages": []
			}
		).subscribe((newChat: any) => {
			this.localLastChats.set(
				newChat._id,
				new LastChat(
					newChat._id,
					user.profilePicture,
					user.name,
					'Start of Chat',
					new Date()
				)
			);
		});
	}

	loadChatByChatId(lastChat: LastChat): void {
		if(this.localChats.has(lastChat.chatId))  this.chatSwitched.next(this.localChats.get(lastChat.chatId));
		else {
			this.http.get(`/chat/${lastChat.chatId}`).subscribe((chat: any) => {
				this.localChats.set(
					lastChat.chatId,
					new Chat(
						lastChat.chatId,
						chat.type,
						[
							new User(
								chat.participants[0],
								lastChat.name,
								lastChat.profilePicture,
								'',
								'',
								''
							),
							this.userService.currentUser
						],
						chat.messages
					)
				);
				this.chatSwitched.next(this.localChats.get(lastChat.chatId));
			}, (err) => {
				console.log("Error", err);
			})
		}
	}


	storeMessage(message: Message) {
		this.localChats.get(message.chatID)?.messages.push(message);
		this.lastChatUpdated.next(message);
	}

	clearChatData() {
		this.localChats.clear();
		this.localLastChats.clear();
	}

}
