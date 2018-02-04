import { Injectable, Inject } from "@angular/core";
import * as socketIo from "socket.io-client";

@Injectable()
export class SubscribeService {
  socket;
  constructor(
    @Inject("ServerUrl") private url) {
    if (!(<any>window).SERVER_SOCKET_IO) {
      this.connect();
    } else {
      this.socket = (<any>window).SERVER_SOCKET_IO;
    }
  }

  connect() {
    this.socket = socketIo.connect(this.url);
    (<any>window).SERVER_SOCKET_IO = this.socket;

    this.socket.on("authenticated", function() {
      console.log("User is authenticated");
    });
    this.socket.on("connectToRoom", function(m) {
      console.log(m);
    });
  }

  getSocket() {
    return this.socket;
  }
}
