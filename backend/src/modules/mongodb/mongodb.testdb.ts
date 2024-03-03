import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MongodbTestDBService {
  constructor(private prisma: PrismaService) {}
  async getChatDB() {
    const ret = await this.prisma.chat.findMany();
    return ret;
  }

  async getChatRoomDB() {
    const ret = await this.prisma.chatRoom.findMany();
    return ret;
  }

  async getImageDB() {
    const ret = await this.prisma.image.findMany();
    return ret;
  }

  async getPostDB() {
    const ret = await this.prisma.post.findMany();
    return ret;
  }

  async getProfileImageDB() {
    const ret = await this.prisma.profileImage.findMany();
    return ret;
  }

  async getRequestFormDB() {
    const ret = await this.prisma.requestForm.findMany();
    return ret;
  }

  async getReservationDB() {
    const ret = await this.prisma.reservation.findMany();
    return ret;
  }

  async getUserDB() {
    const ret = await this.prisma.user.findMany();
    return ret;
  }

  async deleteChatDB(id: string) {
    const ret = await this.prisma.chat.delete({
      where: { id: id },
    });
    return ret;
  }
  async deleteChatRoomDB(id: string) {
    const ret = await this.prisma.chatRoom.delete({
      where: { id: id },
    });
    return ret;
  }
  async deleteImageDB(id: string) {
    const ret = await this.prisma.image.delete({
      where: { id: id },
    });
    return ret;
  }
  async deletePostDB(id: string) {
    const ret = await this.prisma.post.delete({
      where: { id: id },
    });
    return ret;
  }
  async deleteProfileImageDB(id: string) {
    const ret = await this.prisma.profileImage.delete({
      where: { id: id },
    });
    return ret;
  }
  async deleteRequestFormDB(id: string) {
    const ret = await this.prisma.requestForm.delete({
      where: { id: id },
    });
    return ret;
  }
  async deleteReservationDB(id: string) {
    const ret = await this.prisma.reservation.delete({
      where: { id: id },
    });
    return ret;
  }
  async deleteUserDB(id: string) {
    const ret = await this.prisma.user.delete({
      where: { id: id },
    });
    return ret;
  }
}
