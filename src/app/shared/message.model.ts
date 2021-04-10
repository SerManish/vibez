export class Message {
	constructor(
		public senderID: String,
		public chatID: String,
		public messageContent: String,
		public time: Date
	) { }
}