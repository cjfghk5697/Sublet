import { Injectable } from '@nestjs/common';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import { UserCreateDto, UserFilterDto, UserUpdateDto } from '@/dto/user.dto';
import { createHash } from 'crypto';
import { writeFile } from 'fs/promises';
import { MongodbUserService } from '../mongodb/mongodb.user.service';
import { MongodbUserImageService } from '../mongodb/mongodb.userimage.service';

@Injectable()
export class UserService {
  constructor(
    private userdb: MongodbUserService,
    private userimagedb: MongodbUserImageService,
  ) {}

  async getAllUser() {
    const user = await this.userdb.getAllUser();
    const userExport = user.map((ele) => this.transformExport(ele));
    return userExport;
  }

  async getUserByKey(user_id: string) {
    const user = await this.userdb.getUserByKey(user_id);
    const exportUser = this.transformExport(user);
    return exportUser;
  }

  async getUserPostByKey(user_id: string) {
    const post = await this.userdb.getUserPostByKey(user_id);
    return post;
  }
  async validateUser(user_id: string, password: string) {
    const user = await this.userdb.validateUser(user_id, password);
    const exportUser = this.transformExport(user);
    return exportUser;
  }

  async createUser(user: UserCreateDto) {
    const res = await this.userdb.createUser({
      ...user,
    });
    const exportUser = this.transformExport(res);
    return exportUser;
  }

  async deleteOneUser(user_id: string) {
    const res = await this.userdb.deleteOneUser(user_id);
    return res;
  }
  async putOneUser(user_id: string, putUserBody: UserUpdateDto) {
    const user = await this.userdb.putOneUser(user_id, putUserBody);
    const exportUser = this.transformExport(user);
    return exportUser;
  }

  async filterUser(query: UserFilterDto) {
    const res = await this.userdb.filterUser(query);

    const ret = res.map((user) => this.transformExport(user));
    return ret;
  }

  async uploadProfile(user_id: string, file: Express.Multer.File) {
    // 파일들을 하나씩 업로드 하고 그 id를 저장
    const img_res = await this.uploadImage(file);
    const image_id = img_res.id;

    const res: UserInterface = await this.userimagedb.putUserImage(
      user_id,
      image_id,
    );
    const ret = this.transformExport(res);
    return ret;
  }

  calculateHash(buffer: Buffer) {
    const hash = createHash('sha256');
    hash.update(buffer);
    const res = hash.digest('hex');
    return res;
  }

  async findOrUploadImage(file: Express.Multer.File) {
    const image_hash = this.calculateHash(file.buffer);
    try {
      const res = await this.userimagedb.getUserImage(
        file.originalname,
        file.mimetype,
        image_hash,
      );
      return res;
    } catch (e) {
      console.log('[post.service:findOrUploadImage] getImage failed');
      const res = await this.uploadImage(file);
      return res;
    }
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file || file.mimetype !== 'image/jpeg') {
      throw new Error(
        '[user.service:uploadImage] file not exist or mimetype is not image/jpeg',
      );
    }
    const image_hash = this.calculateHash(file.buffer);
    const res = await this.userimagedb.saveUserImage(
      file.originalname,
      file.mimetype,
      image_hash,
    );
    const bytes = file.buffer;
    const buffer = Buffer.from(bytes);
    await writeFile(`./public_user/${res.id}.jpg`, buffer);
    return res;
  }

  transformExport(user: UserInterface): UserExportInterface {
    delete (user as { password?: string }).password;
    delete (user as { delete?: boolean }).delete;
    delete (user as { version?: number }).version;
    return user;
  }
}
