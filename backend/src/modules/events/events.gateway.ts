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
import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LoggedInGuard } from '@/guards/logged-in.guard';
import { User } from '@/user/user.decorator';
import { UserInterface } from '@/interface/user.interface';

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

  @UseGuards(LoggedInGuard)
  @SubscribeMessage('join_chatroom')
  async handleJoinChatroom(
    @MessageBody() chatInfo: ChatJoinRoomDto,
    @User() user: UserInterface,
  ) {
    if (user.id === chatInfo.user2) {
      throw Error('same user tried to make room');
    }
    const room = await this.mongoDb.findRoom(
      user.id,
      chatInfo.user2,
      chatInfo.postKey,
    );
    if (room) {
      throw Error('room already exists');
    }
    const result = await this.mongoDb.makeRoom(
      user.id,
      chatInfo.user2,
      chatInfo.postKey,
    );
    return result;
  }

  @UseGuards(LoggedInGuard)
  @SubscribeMessage('logout')
  async handleLogout(@ConnectedSocket() client: Socket) {
    client.disconnect();
    return true;
  }

  @UseGuards(LoggedInGuard)
  @SubscribeMessage('send_message')
  async sendMessage(
    @MessageBody() message: ChatSendMessageDto,
    @User() user: UserInterface,
    @ConnectedSocket() client: Socket,
  ) {
    if (user.user_id != message.user_id) throw new UnauthorizedException();
    if (!(message.room_id in client.rooms)) throw new UnauthorizedException();

    const ret = await this.mongoDb.addChatLog(
      message.room_id,
      message.user_id,
      message.message,
    );
    this.server.to(message.room_id).emit('receive_message', ret);

    return true;
  }

  @UseGuards(LoggedInGuard)
  @SubscribeMessage('get_chatlog')
  async getChatLog(
    @MessageBody() { room_id }: ChatGetLogDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!(room_id in client.rooms)) throw new UnauthorizedException();
    const ret = await this.mongoDb.getChatLog(room_id);
    return ret;
  }

  @UseGuards(LoggedInGuard)
  @SubscribeMessage('delete_message')
  async deleteChatLog(
    @MessageBody() { chat_id }: ChatDeleteDto,
    @User() user: UserInterface,
  ) {
    try {
      const ret = await this.mongoDb.deleteChatLog(chat_id, user.user_id);
      this.server.to(ret.chatroom_id).emit('delete_message', { id: ret.id });
      return ret;
    } catch (e) {
      console.log('delete_message error', e);
      throw new BadRequestException();
    }
  }

  @UseGuards(LoggedInGuard)
  @SubscribeMessage('leave_chatroom')
  async leaveChatRoom(
    @MessageBody() { room_id }: ChatLeaveRoomDto,
    @ConnectedSocket() client: Socket,
    @User() user: UserInterface,
  ) {
    if (!(room_id in client.rooms)) throw new UnauthorizedException();

    client.leave(room_id);
    const ret = await this.mongoDb.leaveChatRoom(room_id, user.id);
    return ret;
  }
}
