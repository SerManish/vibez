import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthInterceptor } from './shared/auth-interceptor';
import { FindUserComponent } from './navigator/chat-features/add-friend/find-user/find-user.component';

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
    ChatHeadComponent,
    AuthenticationComponent,
    FindUserComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	FormsModule
  ],
  providers: [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
