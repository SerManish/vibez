export class LastChat {
	constructor(
		public chatId:String,
		public profilePicture: String,
		public name: String,
		public lastMessage: String,
		public lastTime: Date
	) { }
}