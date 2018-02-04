import { NgForm } from '@angular/forms';
import { configuration } from './../../../../environments/.env';
import { FileUploader } from 'ng2-file-upload';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { LiveChatService } from './live-chat.service';
import { TokenService } from '../../routes/authentication/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector:"live-chat",
    templateUrl:"./live-chat.component.html",
    styleUrls:["./live-chat.component.css"],
    providers: [LiveChatService, ToastrService]
})

export class LiveChatComponent{
    
    private isVisible: boolean = false;
    private attachment;
    private authUserId;
    private liveChats = [];
    private fileUploaderUrl = configuration.API_BASE_URL + "/uploadFile/jobPostingAttachments";      
    private uploader: FileUploader = new FileUploader({ url: this.fileUploaderUrl, isHTML5: true,
        allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'application/pdf', 'application/xls', 'application/xlsx'],
        maxFileSize: 10*1024*1024,
        authToken: 'Bearer ' + this.tokenService.getToken()});
    private liveChat;
    private socket;
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    private timeout;
    private typingMessage = "";
    private baseUrl = configuration.API_BASE_URL + '/';
    
    constructor(
        private liveChatService: LiveChatService,
        private tokenService: TokenService,
        private toastr: ToastrService
    ){}

    async ngOnInit() {
        this.socket = (<any>window).SERVER_SOCKET_IO;
        
        this.authUserId = this.tokenService.getCurrentUserId();
        this.liveChats = await this.getLiveChats();
        this.liveChat = await this.liveChats[0];

        this.socket.on('start_live_message_' + this.authUserId, liveChat => {
            this.liveChat = liveChat;
            setTimeout(()=> this.scrollToBottom(), 50);
        });

        this.socket.on("typing_" + this.authUserId, data => {
            this.typingMessage = data.text;
        });

        this.socket.on('remove_liveChat_' + this.authUserId,async res => {
            this.liveChat = undefined;   
        });
    }

    ngAfterContentInit(){
        this.scrollToBottom();
    }
    
    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }

    toggleChatBox(element){
        this.isVisible = !this.isVisible;
        this.read(this.liveChat);
    }

    getLiveChats(): Promise<any> {
        return new Promise((resolve, reject) => {
          let filter = '{"participants.userId": "' + this.authUserId + '"}';
          this.liveChatService.getLiveChats(filter).subscribe(threads => {
            resolve(threads);
          }, error => reject(error));
        });
      }

    async create(form: NgForm, event) {
        if (form.invalid)
            return;
        
        var formData = form.value;

        if (event.target.name == 'file') {
          await this.uploadFiles(event);
        }
    
        let data =  formData;
    
        let message;
        if(this.attachment != null) {
          message = {
          "owner": {
            "userId": this.authUserId
          },
          "attachment": this.attachment
          }
        } else {
          message = {
            "text": data.text,
            "owner": {
              "userId": this.authUserId
            }
          }
        }
    
        let chatData = {
          "messages": message
        }
    
       this.liveChatService.createLiveChat(chatData).subscribe(res => {
           this.resetFormData(event, form);
       }, error => {
           this.toastr.error('Failed to send message.', 'Error', {progressBar: true, closeButton: true});
       });

      }
    
    uploadFiles(event) {
    return new Promise((resolve, reject) => {
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item, file, status, header) => {
        let uploadedFile = JSON.parse(file);
    
        if (status === 200) {
            this.attachment = {
            "container": uploadedFile.container,
            "fileName": uploadedFile.filename,
            "originalName": uploadedFile.originalname,
            "mime": uploadedFile.mimetype,
            "size": uploadedFile.size
            };
            resolve();
        }
        };
    });
    }

    keyUp() {
        var authUser = this.getParticipantDetails(this.authUserId);
        if (authUser){
            this.socket.emit(
                "typing", {"text": authUser.firstName + " " + authUser.lastName + " is Typing ...", "liveChat": this.liveChat}
              );
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                this.socket.emit("typing", {"text": "", "liveChat": this.liveChat});
              }, 1000);
        }
      }

    getParticipantDetails(userId){
        if (this.liveChat){
            var p = this.liveChat.participants.find(p => p.userId === userId);
            return p;
        }
    }

    read(livechat): void {
        if (this.liveChat){
            if (livechat.messages[livechat.messages.length-1].seenByMembers.indexOf(this.authUserId) == -1){
                this.liveChatService.updateSeenByMembers({liveChatId: livechat._id, messageId: livechat.messages[livechat.messages.length-1]._id})
                .subscribe(updatedLiveChat => {
                  this.liveChat = updatedLiveChat;
                });
            }
        }
    }

    private resetFormData($event, form: NgForm) {
        form.reset();
    
        if (this.attachment) {
          this.attachment = null;
          this.uploader.clearQueue();
        }
      }
}