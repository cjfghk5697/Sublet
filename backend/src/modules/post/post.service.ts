import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { writeFile } from 'fs/promises';
import {
  PostCreateDto,
  PostGetAllQueryDto,
  PostUpdateDto,
} from '@/dto/post.dto';
import { PostInterface } from '@/interface/post.interface';
import { UserInterface } from '@/interface/user.interface';
import { createHash } from 'crypto';

@Injectable()
export class PostService {
  constructor(private readonly db: MongodbService) {}

  // GET /POST
  async getAllPosts(query: PostGetAllQueryDto) {
    return this.db.getAllPosts(query);
  }

  // POST /POST
  async createPost(
    files: Express.Multer.File[],
    post: PostCreateDto,
    user: UserInterface,
  ) {
    post['end_day'] = new Date(post['end_day']);
    post['start_day'] = new Date(post['start_day']);

    const image_id: string[] = [];
    for (const file of files) {
      // 파일들을 하나씩 업로드 하고 그 id를 저장
      const res = await this.uploadImage(file);
      image_id.push(res.id);
    }

    // PrismaPostCreateDto 형식에 맞도록 변경하여 createPost에 전달
    const res: PostInterface = await this.db.createPost(
      {
        ...post,
        image_id,
      },
      user,
    );
    return res;
  }

  // GET /POST/:postKey
  async getOnePost(key: number) {
    return this.db.getOnePost(key);
  }

  // PUT /POST/:postKey
  async putOnePost(
    key: number,
    files: Express.Multer.File[],
    postUpdateInput: PostUpdateDto,
  ) {
    postUpdateInput['end_day'] &&= new Date(postUpdateInput['end_day']);
    postUpdateInput['start_day'] &&= new Date(postUpdateInput['start_day']);

    const image_id: string[] = [];
    for (const file of files) {
      // 파일들을 하나씩 업로드 하고 그 id를 저장
      const res = await this.findOrUploadImage(file);
      image_id.push(res.id);
    }
    postUpdateInput.image_id = image_id;

    const res: PostInterface = await this.db.putOnePost(key, postUpdateInput);
    return res;
  }

  // DELETE /POST/:postKey
  async deleteOnePost(key: number, user: UserInterface) {
    const res: PostInterface = await this.db.deleteOnePost(key, user);
    return res;
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
      const res = await this.db.getImage(
        file.originalname,
        file.mimetype,
        image_hash,
      );
      return res;
    } catch (e) {
      return await this.uploadImage(file);
    }
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file || file.mimetype !== 'image/jpeg')
      throw new Error(
        'post.service:uploadImage, file not exist or mimetype is not image/jpeg',
      );
    const image_hash = this.calculateHash(file.buffer);
    const res = await this.db.saveImage(
      file.originalname,
      file.mimetype,
      image_hash,
    );
    const bytes = file.buffer;
    const buffer = Buffer.from(bytes);
    await writeFile(`./public/${res.id}.jpg`, buffer);
    return res;
  }
}
