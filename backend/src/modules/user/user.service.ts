import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import {
  UserContactDto,
  UserCreateDto,
  UserFilterDto,
  UserLoginDto,
  UserTokenVerifyUpdateDto,
  UserUpdateDto,
  UserVerifyUpdateDto,
} from '@/dto/user.dto';
import { createHash } from 'crypto';
import { writeFile } from 'fs/promises';
import { MongodbUserService } from '../mongodb/mongodb.user.service';
import { MongodbUserImageService } from '../mongodb/mongodb.userimage.service';
import { env } from 'process';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as nodemailer from 'nodemailer';
import { MongodbPostService } from '../mongodb/mongodb.post.service';

@Injectable()
export class UserService {
  constructor(
    private userdb: MongodbUserService,
    private postdb: MongodbPostService,
    private userimagedb: MongodbUserImageService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getAllUser() {
    const user = await this.userdb.getAllUser();
    const userExport = user.map((ele) => UserService.transformExport(ele));
    return userExport;
  }

  async getUserByKey(user_id: string) {
    const user = await this.userdb.getUserByKey(user_id);
    const exportUser = UserService.transformExport(user);
    return exportUser;
  }

  async getUserPostByKey(user_id: string) {
    const post = await this.postdb.getUserPostByKey(user_id);
    return post;
  }
  async validateUser(user_id: string, password: string) {
    const user = await this.userdb.validateUser(user_id, password);
    const exportUser = UserService.transformExport(user);
    return exportUser;
  }

  async createUser(user: UserCreateDto) {
    const res = await this.userdb.createUser({
      ...user,
    });
    const exportUser = UserService.transformExport(res);
    return exportUser;
  }

  async deleteOneUser(user_id: string) {
    const res = await this.userdb.deleteOneUser(user_id);
    return res;
  }
  async putOneUser(user_id: string, putUserBody: UserUpdateDto) {
    const user = await this.userdb.putOneUser(user_id, putUserBody);
    const exportUser = UserService.transformExport(user);
    return exportUser;
  }
  async putChangePassword(putUserBody: UserLoginDto) {
    const user = await this.userdb.putChangePassword(putUserBody);
    const exportUser = UserService.transformExport(user);
    return exportUser;
  }
  async putVerifyUser(user_id: string, putUserBody: UserVerifyUpdateDto) {
    const user = await this.userdb.putOneUser(user_id, putUserBody);
    const exportUser = UserService.transformExport(user);
    return exportUser;
  }
  async filterUser(query: UserFilterDto) {
    const res = await this.userdb.filterUser(query);

    const ret = res.map((user) => UserService.transformExport(user));
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
    const ret = UserService.transformExport(res);
    return ret;
  }

  async verifyTokenEmail(email: string) {
    //https://4sii.tistory.com/437#google_vignette
    const user_email = email; //받아온 email user_email에 초기화
    let number = Math.floor(Math.random() * 1000000) + 100000;
    if (number > 1000000) {
      number = number - 100000;
    }

    await this.cacheManager.set(user_email, number, 0); //cache 생성, 자동 삭제 안됨

    const transporter = nodemailer.createTransport({
      service: 'gmail', //사용하고자 하는 서비스
      auth: {
        user: env.EMAIL_ADDRESS, //gmail주소입력
        pass: env.EMAIL_PASSWORD, //gmail패스워드 입력
      },
    });

    await transporter.sendMail({
      from: env.EMAIL_ADDRESS, //보내는 주소 입력
      to: user_email, //위에서 선언해준 받는사람 이메일
      subject: 'ItHome 인증번호입니다', //메일 제목
      text: String(number), //내용
    });
  }
  async contactEmail(data: UserContactDto) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', //사용하고자 하는 서비스
      auth: {
        user: env.EMAIL_ADDRESS, //gmail주소입력
        pass: env.EMAIL_PASSWORD, //gmail패스워드 입력
      },
    });

    await transporter.sendMail({
      from: env.EMAIL_ADDRESS, //보내는 주소 입력
      to: data.user_contact, //위에서 선언해준 받는사람 이메일
      subject: data.title + '방에 관심을 가지신분이 있어요!', //메일 제목
      text: '어떤 분이 이 방에 문의를 주셨어요! 연락처:' + String(data.contact), //내용
    });
  }

  async verifyUser(user_id: string, putUserBody: UserTokenVerifyUpdateDto) {
    const cache_verifyToken = await this.cacheManager.get(putUserBody.tokenKey); // cache-manager를 통해 확인

    if (cache_verifyToken !== putUserBody.verifyToken) {
      throw new UnauthorizedException('인증번호가 일치하지 않습니다.');
    } else {
      await this.cacheManager.del(putUserBody.tokenKey); // 인증이 완료되면 del을 통해 삭제
      await this.userdb.verifyUser(user_id, putUserBody);
    }
    return true;
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

  static transformExport(user: UserInterface): UserExportInterface {
    delete (user as { id?: string }).id;
    delete (user as { like_post_id?: string[] }).like_post_id;
    delete (user as { chat_id?: string[] }).chat_id;
    delete (user as { password?: string }).password;
    delete (user as { delete?: boolean }).delete;
    delete (user as { version?: number }).version;
    return user;
  }
}
