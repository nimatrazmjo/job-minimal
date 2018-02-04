import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'userDetails'})
export class UserDetailsPipe implements PipeTransform {
  transform(liveChat: any, args: any[]): any {
    if (!liveChat) return liveChat;

    if (args == undefined){
        return liveChat.participants.find(p => p.type !== 'admin');        
    }
    else {
        return liveChat.participants.find(p => p.userId == args[0]);
    }

  }
}