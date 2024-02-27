import { UserInterface } from '@/interface/user.interface';

export class ChatRoomBase {
  id: string;
  version: number;
  user_id: string[];
  post_key: number;
}

export class ChatRoomInterface extends ChatRoomBase {}

export class ChatLogBase {
  id: string;
  version: number;
  user_id: string;
  user: UserInterface;
  chatroom_id: string;
  chatroom: ChatRoomInterface;
  message: string;
  send_time: Date;
}

export class ChatLogInterface extends ChatLogBase {}

export class ChatLoginDto {
  user_id: string;
}

export class ChatJoinRoomDto {
  user1: string;
  user2: string;
  postKey: number;
}

export class ChatSendMessageDto {
  user_id: string;
  user_custom_id: string;
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
  user_id: string;
}
