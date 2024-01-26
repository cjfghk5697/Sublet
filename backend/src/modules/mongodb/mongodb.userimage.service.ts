import { ImageInterface } from '@/interface/image.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MongodbUserService } from './mongodb.user.service';

@Injectable()
export class MongodbUserImageService {
  USERIMAGE_VERSION = 1;
  constructor(
    private prisma: PrismaService,
    private mongodbUserService: MongodbUserService,
  ) {}
  async getUserImage(filename: string, filetype: string, image_hash: string) {
    const res: ImageInterface | null = await this.prisma.profileImage.findFirst(
      {
        where: {
          version: {
            gte: this.USERIMAGE_VERSION,
          },
          filename,
          filetype,
          image_hash,
        },
      },
    );
    if (!res) {
      throw new Error("[mongodb.service:getImage] image doesn't exist");
    }
    return res;
  }

  async saveUserImage(filename: string, filetype: string, image_hash: string) {
    const res: ImageInterface = await this.prisma.profileImage.create({
      data: {
        filename,
        filetype,
        image_hash,
        version: this.USERIMAGE_VERSION,
      },
    });
    return res;
  }

  async putUserImage(user_id: string, image_id: string) {
    const res = await this.mongodbUserService.putOneUser(user_id, {
      image_id,
    });
    return res;
  }
}
