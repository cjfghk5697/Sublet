import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatLogInterface, ChatRoomInterface } from '@/dto/chat.dto';

@Injectable()
export class MongodbChatService {
  constructor(private prisma: PrismaService) {}

  async makeRoom(user_id1: string, user_id2: string, post_key: number) {
    const result: ChatRoomInterface = await this.prisma.chatRoom.create({
      data: {
        user_id: [user_id1, user_id2],
        post_key: post_key,
      },
    });
    return result;
  }

  async getRoom(user_id: string) {
    const result: ChatRoomInterface[] = await this.prisma.chatRoom.findMany({
      where: {
        user_id: {
          has: user_id,
        },
      },
    });
    return result;
  }

  async findRoom(user_id1: string, user_id2: string, post_key: number) {
    const result: ChatRoomInterface | null =
      await this.prisma.chatRoom.findFirst({
        where: {
          user_id: {
            hasEvery: [user_id1, user_id2],
          },
          post_key: post_key,
        },
      });
    return result;
  }

  async addChatLog(room_id: string, user_id: string, message: string) {
    const ret: ChatLogInterface = await this.prisma.chat.create({
      data: {
        user: {
          connect: {
            id: user_id,
          },
        },
        chatroom: {
          connect: {
            id: room_id,
          },
        },
        message: message,
      },
      include: {
        user: true,
        chatroom: true,
      },
    });
    return ret;
  }

  async getChatLog(room_id: string) {
    const result: ChatLogInterface[] = await this.prisma.chat.findMany({
      where: {
        chatroom: {
          id: room_id,
        },
      },
      include: {
        chatroom: true,
        user: true,
      },
    });
    return result;
  }

  async deleteChatLog(chat_id: string, user_id: string) {
    const ret: ChatLogInterface = await this.prisma.chat.delete({
      where: {
        id: chat_id,
        user: {
          user_id: user_id,
        },
      },
      include: {
        user: true,
        chatroom: true,
      },
    });
    return ret;
  }

  async leaveChatRoom(room_id: string, user_id: string) {
    const ret = await this.prisma.chat.deleteMany({
      where: {
        chatroom: {
          id: room_id,
        },
        user: {
          id: user_id,
        },
      },
    });
    return ret;
  }
}
