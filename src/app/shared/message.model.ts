export class Message {
    senderID: String;
    receiverID: String;
    messageContent: String;
    time: String;
    
    constructor(senderID: String, receiverID: String, messageContent: String, time: String){
        this.senderID = senderID;
        this.receiverID = receiverID;
        this. messageContent = messageContent;
        this.time = time;
    }
}