import { Message } from "./message.model";
import { User } from "./user.model";

export class LastChat {
	constructor(
		public chatId:String,
		public lastMessage: Message,
		public type: String,
		public participants: User[]
	) { }
}