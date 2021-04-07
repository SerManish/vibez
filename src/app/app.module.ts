import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { BrandingComponent } from './navigator/branding/branding.component';
import { ChatFeaturesComponent } from './navigator/chat-features/chat-features.component';
import { UserProfileComponent } from './navigator/user-profile/user-profile.component';
import { SearchComponent } from './navigator/chat-features/search/search.component';
import { AddFriendComponent } from './navigator/chat-features/add-friend/add-friend.component';
import { LastChatsComponent } from './navigator/chat-features/last-chats/last-chats.component';
import { ChatComponent } from './chat/chat.component';
import { DetailsComponent } from './chat/details/details.component';
import { MessagesComponent } from './chat/messages/messages.component';
import { MessageAreaComponent } from './chat/messages/message-area/message-area.component';
import { InputAreaComponent } from './chat/messages/input-area/input-area.component';
import { ChatHeadComponent } from './chat/messages/chat-head/chat-head.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    BrandingComponent,
    ChatFeaturesComponent,
    UserProfileComponent,
    SearchComponent,
    AddFriendComponent,
    LastChatsComponent,
    ChatComponent,
    DetailsComponent,
    MessagesComponent,
    MessageAreaComponent,
    InputAreaComponent,
    ChatHeadComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
