import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { StringAnyMap } from '../typings/index.js';
import { allowRequest, checkSession } from './check-session.js';

export { createSocketServer, sendToSocket, Message };

let io: Server;
type Message<T = StringAnyMap> = { event: string; payload?: T };

const createSocketServer = (httpServer: http.Server): void => {
  io = new Server(httpServer, { transports: ['websocket'], allowRequest });

  io.use(checkSession).on('connection', (socket: Socket): void => {
    const room = socket.data?.user?.email;
    socket.join(room);
  });
};

const sendToSocket = <T>(room: string, msg: Message<T>): void => {
  io.to(room).emit('message', msg);
};
