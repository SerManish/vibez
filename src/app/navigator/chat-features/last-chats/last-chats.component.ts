import { Component, OnInit } from '@angular/core';
import { LastChat } from '../../../shared/last-chat.model';

@Component({
    selector: 'app-last-chats',
    templateUrl: './last-chats.component.html',
    styleUrls: ['./last-chats.component.css']
})
export class LastChatsComponent implements OnInit {

    lastChats:LastChat[];
    constructor() {
        this.lastChats = [
            {
                dpURL : '../../assets/images/default-avatar.png',
                name : 'Axay',
                lastMessage : 'Kuch to bata zindagi',
                lastTime: '1:00'
            },
            {
                dpURL : '../../assets/images/default-avatar.png',
                name : 'Manish Kumar Giri',
                lastMessage : 'Karde, easy hai!!',
                lastTime: '15:24'
            },
            {
                dpURL : '../../assets/images/default-avatar.png',
                name : 'Axay',
                lastMessage : 'Kuch to bata zindagi',
                lastTime: '21:00'
            },
            {
                dpURL : '../../assets/images/default-avatar.png',
                name : 'Axay',
                lastMessage : 'Kuch to bata zindagi',
                lastTime: '22:00'
            },
            {
                dpURL : '../../assets/images/default-avatar.png',
                name : 'Axay',
                lastMessage : 'Kuch to bata zindagi',
                lastTime: '1:00'
            },
            {
                dpURL : '../../assets/images/default-avatar.png',
                name : 'Axay',
                lastMessage : 'Kuch to bata zindagi',
                lastTime: '1:00'
            },
            {
                dpURL : '../../assets/images/default-avatar.png',
                name : 'Axay',
                lastMessage : 'Kuch to bata zindagi',
                lastTime: '1:00'
            },
            {
                dpURL : '../../assets/images/default-avatar.png',
                name : 'Axay',
                lastMessage : 'Kuch to bata zindagi',
                lastTime: '1:00'
            },
            {
                dpURL : '../../assets/images/default-avatar.png',
                name : 'Axay',
                lastMessage : 'Kuch to bata zindagi',
                lastTime: '1:00'
            }
        ]
    }

    ngOnInit(): void {
    }

}
