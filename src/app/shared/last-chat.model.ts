export class LastChat {
    dpURL: String;
    name: String;
    lastMessage: String;
    lastTime: String;
    
    constructor(dpURL: String, name: String, lastMessage: String, lastTime: String){
        this.dpURL = dpURL;
        this.name = name;
        this. lastMessage = lastMessage;
        this.lastTime = lastTime;
    }
}