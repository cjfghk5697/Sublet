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
