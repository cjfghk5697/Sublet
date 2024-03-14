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
import {
  ChatDeleteDto,
  ChatGetLogDto,
  ChatJoinRoomDto,
  ChatLeaveRoomDto,
  ChatLoginDto,
  ChatSendMessageDto,
} from '@/dto/chat.dto';
import { UseGuards } from '@nestjs/common';
import { LoggedInGuard } from '@/guards/logged-in.guard';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
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

  @UseGuards(LoggedInGuard)
  @SubscribeMessage('testing')
  handleTesting(@MessageBody() data: string): string {
    console.log('Testing message: data', data);
    return data;
  }

  @SubscribeMessage('login')
  async handleLogin(
    @MessageBody() { user_id }: ChatLoginDto,
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
  async handleJoinChatroom(@MessageBody() chatInfo: ChatJoinRoomDto) {
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
  async sendMessage(@MessageBody() message: ChatSendMessageDto) {
    const ret = await this.mongoDb.addChatLog(
      message.room_id,
      message.user_id,
      message.message,
    );
    this.server.to(message.room_id).emit('receive_message', ret);

    return true;
  }

  @SubscribeMessage('get_chatlog')
  async getChatLog(@MessageBody() { room_id }: ChatGetLogDto) {
    const ret = await this.mongoDb.getChatLog(room_id);
    return ret;
  }

  @SubscribeMessage('delete_message')
  async deleteChatLog(@MessageBody() { chat_id }: ChatDeleteDto) {
    const ret = await this.mongoDb.deleteChatLog(chat_id);
    this.server.to(ret.chatroom_id).emit('delete_message', { id: ret.id });
    return ret;
  }

  @SubscribeMessage('leave_chatroom')
  async leaveChatRoom(
    @MessageBody() { room_id, user_id }: ChatLeaveRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(room_id);
    const ret = await this.mongoDb.leaveChatRoom(room_id, user_id);
    return ret;
  }
}
