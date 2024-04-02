import { PostExportInterface, PostInterface } from '@/interface/post.interface';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';

export class ChatRoomBase {
  id: string; // 예외적으로 허용
  post_key: number;
}

export class ChatRoomExportInterface extends ChatRoomBase {
  user: UserExportInterface;
  post: PostExportInterface;
  chat: ChatLogExportInterface[];
}

export class ChatRoomInterface extends ChatRoomExportInterface {
  version: number;
  user_id: string;
  user: UserInterface;
  post: PostInterface;
  chat: ChatLogInterface[];
}

export class ChatLogBase {
  id: string; // 예외적으로 허용
  chatroom_id: string;
  message: string;
  send_time: Date;
}

export class ChatLogExportInterface extends ChatLogBase {
  user: UserExportInterface;
}

export class ChatLogInterface extends ChatLogExportInterface {
  user_id: string;
  user: UserInterface;
  version: number;
}

export class ChatLoginDto {
  user_id: string;
}

export class ChatJoinRoomDto {
  user1: string;
  user2: string;
  postKey: number;
}

export class ChatSendMessageDto {
  message: string;
  room_id: string;
}

export class ChatGetLogDto {
  room_id: string;
}

export class ChatDeleteDto {
  chat_id: string;
}

export class ChatLeaveRoomDto {
  room_id: string;
}
