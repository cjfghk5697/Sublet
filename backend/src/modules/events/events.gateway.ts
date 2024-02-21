import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MongodbChatService } from '../mongodb/mongodb.chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly mongoDb: MongodbChatService) {}

  handleConnection(client: Socket) {
    console.log('connect, ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect, ', client.id);
  }

  @SubscribeMessage('connection')
  handleConnect(): string {
    console.log('wow!');
    return 'Hello World!!!!';
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): string {
    console.log('data', data);
    return 'Hello world!';
  }

  @SubscribeMessage('testing')
  handleTesting(@MessageBody() data: string): string {
    console.log('Testing message: data', data);
    return data;
  }

  @SubscribeMessage('login')
  async handleLogin(
    @MessageBody() user_id: string,
    @ConnectedSocket() client: Socket,
  ) {
    const roomsInfo = await this.mongoDb.getRoom(user_id);
    const rooms = roomsInfo.map((room) => {
      return room.id;
    });
    client.join(rooms);
    return rooms;
  }

  @SubscribeMessage('join_chatroom')
  async handleJoinChatroom(
    @MessageBody() chatInfo: { user1: string; user2: string; postKey: number },
    @ConnectedSocket() client: Socket,
  ) {
    if (chatInfo.user1 === chatInfo.user2) {
      throw Error('same user tried to make room');
    }
    const room = await this.mongoDb.findRoom(
      chatInfo.user1,
      chatInfo.user2,
      chatInfo.postKey,
    );
    if (room) {
      throw Error('room already exists');
    }
    console.log('user1', chatInfo);

    console.log(this.server.sockets.adapter.rooms);
    console.log('client', client.id);
    const result = await this.mongoDb.makeRoom(
      chatInfo.user1,
      chatInfo.user2,
      chatInfo.postKey,
    );
    return result;
  }

  @SubscribeMessage('logout')
  async handleLogout() {
    return true;
  }

  @SubscribeMessage('send_message')
  async sendMessage(
    @MessageBody()
    message: {
      user_id: string;
      user_custom_id: string;
      message: string;
      room_id: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const ret = await this.mongoDb.addChatLog(
      message.room_id,
      message.user_id,
      message.message,
    );
    this.server.to(message.room_id).emit('receive_message', ret);

    return true;
  }

  @SubscribeMessage('get_chatlog')
  async getChatLog(@MessageBody() room_id: string) {
    const ret = await this.mongoDb.getChatLog(room_id);
    return ret;
  }

  @SubscribeMessage('delete_message')
  async deleteChatLog(@MessageBody() chat_id: string) {
    const ret = await this.mongoDb.deleteChatLog(chat_id);
    this.server.to(ret.chatroom_id).emit('delete_message', ret.id);
    return ret;
  }
}
