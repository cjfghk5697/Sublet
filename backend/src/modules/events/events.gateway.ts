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
  ChatLeaveRoomDto,
  ChatLogExportInterface,
  ChatLogInterface,
  ChatRoomExportInterface,
  ChatRoomInterface,
  ChatSendMessageDto,
} from '@/dto/chat.dto';
import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LoggedInGuard } from '@/guards/logged-in.guard';
import { User } from '@/user/user.decorator';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import { MongodbPostService } from '../mongodb/mongodb.post.service';
import { UserService } from '../user/user.service';
import { PostExportInterface } from '@/interface/post.interface';
import { PostService } from '../post/post.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly mongoDb: MongodbChatService,
    private readonly postDb: MongodbPostService,
  ) {}

  handleConnection(client: Socket) {
    if ((client.request as any).user) {
      console.log('user exist in ', client.id);
    } else {
      console.log('user not exist in ', client.id);
    }
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

  @UseGuards(LoggedInGuard)
  @SubscribeMessage('login')
  async handleLogin(@ConnectedSocket() client: Socket) {
    console.log('login in!');
    const user: UserInterface = (client.request as any).user;

    if (!user) {
      throw new UnauthorizedException();
    }

    console.log('user=', user.user_id);

    const roomsInfo = await this.mongoDb.getRoom(user.user_id);
    const roomsAsGuest = roomsInfo.map((room) => {
      return this.transformExportChatRoom(room);
    });
    const roomsAsGuestString = roomsInfo.map((room) => {
      return room.id;
    });
    await client.join(roomsAsGuestString);

    const roomsInfoAsHost = await this.mongoDb.getRoomAsHost(user.user_id);
    const roomsAsHost = roomsInfoAsHost.map((room) => {
      return this.transformExportChatRoom(room);
    });
    const roomsAsHostString = roomsInfoAsHost.map((room) => room.id);
    await client.join(roomsAsHostString);
    return { roomsAsGuest, roomsAsHost };
  }

  @UseGuards(LoggedInGuard)
  @SubscribeMessage('join_chatroom')
  async handleJoinChatroom(
    @MessageBody() postKey: number,
    @ConnectedSocket() client: Socket,
  ) {
    const user = (client.request as any).user;
    if (!user) throw new UnauthorizedException();

    const post = await this.postDb.getOnePost(postKey);

    if (user.user_id === post.postuser.user_id) {
      throw Error('same user tried to make room');
    }

    const room = await this.mongoDb.findRoom(user.id, postKey);
    if (room) throw Error('chatroom already exists');

    const result = await this.mongoDb.makeRoom(user.id, postKey);
    const resultExport = this.transformExportChatRoom(result);
    return resultExport;
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
    @ConnectedSocket() client: Socket,
  ) {
    if (!client.rooms.has(message.room_id)) throw new UnauthorizedException();

    const user: UserInterface | undefined = (client.request as any).user;
    if (!user) throw new UnauthorizedException();

    const ret = await this.mongoDb.addChatLog(
      message.room_id,
      user.user_id,
      message.message,
    );
    const retExport = this.transformExportChatLog(ret);
    this.server.to(message.room_id).emit('receive_message', retExport);

    return true;
  }

  @UseGuards(LoggedInGuard)
  @SubscribeMessage('get_chatlog')
  async getChatLog(
    @MessageBody() { room_id }: ChatGetLogDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('room_id: ', room_id, 'clinet.rooms=', client.rooms);
    if (!client.rooms.has(room_id)) throw new UnauthorizedException();
    console.log('passed!');
    const ret = await this.mongoDb.getChatLog(room_id);
    const retExport = ret.map((ele) => this.transformExportChatLog(ele));
    return retExport;
  }

  @UseGuards(LoggedInGuard)
  @SubscribeMessage('delete_message')
  async deleteChatLog(
    @MessageBody() { chat_id }: ChatDeleteDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user: UserInterface | undefined = (client.request as any).user;
      if (!user) throw new UnauthorizedException();
      const ret = await this.mongoDb.deleteChatLog(chat_id, user.user_id);
      this.server.to(ret.chatroom_id).emit('delete_message', { id: ret.id });
      const retExport = this.transformExportChatLog(ret);
      return retExport;
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

  transformExportChatRoom(
    chatroom: ChatRoomInterface,
  ): ChatRoomExportInterface {
    delete (chatroom as { version?: number }).version;
    delete (chatroom as { user_id?: string }).user_id;
    (chatroom as { user: UserExportInterface }).user =
      UserService.transformExport(chatroom.user);
    (chatroom as { post: PostExportInterface }).post =
      PostService.transformExport(chatroom.post);
    (chatroom as { chat: ChatLogExportInterface[] }).chat = chatroom.chat.map(
      (ele) => {
        return this.transformExportChatLog(ele);
      },
    );
    return chatroom;
  }

  transformExportChatLog(chatlog: ChatLogInterface): ChatLogExportInterface {
    delete (chatlog as { user_id?: string }).user_id;
    delete (chatlog as { version?: number }).version;
    (chatlog as { user: UserExportInterface }).user =
      UserService.transformExport(chatlog.user);
    return chatlog;
  }
}
