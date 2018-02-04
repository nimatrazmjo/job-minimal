import { Router } from '@angular/router';
import { TokenService } from './../../routes/authentication/token.service';
import { ThreadService } from './../../routes/inbox/thread/thread.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { configuration } from '../../../../environments/.env.example';
const screenfull = require('screenfull');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ThreadService, TokenService]
})

export class HeaderComponent implements OnInit {
  authUser;
  threads = [];
  socket: any;
  authUserId;
  baseUrl = configuration.API_BASE_URL + '/';

  constructor ( private threadService: ThreadService,
    private tokenService: TokenService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.authUserId = this.tokenService.getCurrentUserId();
    this.socket = (<any>window).SERVER_SOCKET_IO;

    this.socket.on("send_message_notification" + this.authUserId, thread => {
      this.getThreads();
    });

    this.socket.on('new_thread_' + this.authUserId, thread => {
      this.getThreads();
    });

    this.getThreads();
  }

  private getThreads() {
    //let filter = '{"$or": [{"owner.userId": "' + this.authUserId+ '"}, {"participants.userId": "' + this.authUserId + '"}]}';
    this.threadService.getThreads().subscribe(threads => {
      threads.forEach(thread => {
        if (thread.messages[thread.messages.length-1].seenByMembers.indexOf(this.authUserId) == -1){
          var t = this.threads.find(t => t._id == thread._id);
          if (!t){
            this.threads.push(thread);
          }
          else{
            t.messages = thread.messages;
          }
        }
      });
    });
  }

  read(thread): void {
    if (thread.messages[thread.messages.length-1].seenByMembers.indexOf(this.authUserId) == -1){
      this.threadService.updateSeenByMembers({threadId: thread._id, messageId: thread.messages[thread.messages.length-1]._id}).subscribe(updatedThread => {
        var index = this.threads.indexOf(thread);
        this.threads.splice(index, 1);
        this.router.navigate(['/employer/inbox/messaging/thread', thread._id]);
      });
    }
  }
}
