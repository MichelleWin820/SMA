import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';

export type Message<T = any> = {
  readonly event: string;
  readonly payload: T;
};

@Injectable()
export class SocketService {
  private socket?: Socket;

  readonly message$: Observable<Message>;

  constructor() {
    this.message$ = new Observable<Message>((observer) => {
      this.socket?.on('message', (msg: Message) => observer.next(msg));
    });
  }

  connect(): Observable<void> {
    return new Observable<void>((observer) => {
      const socket = io('', { transports: ['websocket'] });

      socket.on('connect', () => {
        observer.next();
      });

      this.socket = socket;
      return () => socket?.disconnect();
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
  }

  send(msg: Message) {
    this.socket?.emit('message', msg);
  }

  on(eventName: string): Observable<Message> {
    return this.message$.pipe(filter(({ event }) => event === eventName));
  }
}
