import { Message } from './message.model';
import { User } from './user.model';

export class Chat {
	constructor(
		public id: String,
		public type: String,
		public participants: User[],
		public messages: Message[]
	) { }
}