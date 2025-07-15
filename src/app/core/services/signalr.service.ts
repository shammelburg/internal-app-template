import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private fileWatcherSubject = new BehaviorSubject<string>('');
  fileWatcher$ = this.fileWatcherSubject.asObservable();

  private hubConnection: signalR.HubConnection | any;

  constructor() {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5183/folderhub') // URL of the SignalR hub
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection started'))
      .catch((err: any) =>
        console.log('Error establishing SignalR connection: ' + err)
      );
  };

  public addMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (file: any) => {
      console.log(file);
      this.fileWatcherSubject.next(file);
    });
  };

  public sendMessage = (user: string, message: string) => {
    this.hubConnection
      .invoke('SendMessage', user, message)
      .catch((err: any) => console.error(err));
  };

  public handleDisconnects = () => {
    this.hubConnection.onclose(() => {
      console.log('Connection lost. Attempting to reconnect...');
      setTimeout(() => this.startConnection(), 3000); // Try reconnecting after 3 seconds
    });
  };

  disconnect() {
    this.hubConnection.stop();
  }
}
