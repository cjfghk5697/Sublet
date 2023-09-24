import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { writeFile } from 'fs/promises';
import { PostCreateDto, PostGetAllQueryDto } from '@/dto/post.dto';
import { PostInterface } from '@/interface/post.interface';

@Injectable()
export class PostService {
  constructor(private readonly db: MongodbService) {}

  async getAllPosts(query: PostGetAllQueryDto) {
    return this.db.getAllPosts(query);
  }

  async createPost(files: Express.Multer.File[], post: PostCreateDto) {
    post['end_day'] = new Date(post['end_day']);
    post['start_day'] = new Date(post['start_day']);

    const images: string[] = [];
    for (const file of files) {
      // 파일들을 하나씩 업로드 하고 그 id를 저장
      const res = await this.uploadImage(file);
      images.push(res.id);
    }

    // PrismaPostCreateDto 형식에 맞도록 변경하여 createPost에 전달
    const res: PostInterface = await this.db.createPost({
      ...post,
      images,
    });
    return res;
  }

  async getOnePost(key: number) {
    return this.db.getOnePost(key);
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file || file.mimetype !== 'image/jpeg')
      throw new Error(
        'post.service:uploadImage, file not exist or mimetype is not image/jpeg',
      );
    const res = await this.db.saveImage(file.originalname, file.mimetype);
    const bytes = file.buffer;
    const buffer = Buffer.from(bytes);
    await writeFile(`./public/${res.id}.jpg`, buffer);
    return res;
  }

  async putOnePost(key: number) {
    const res: PostInterface = await this.db.putOnePost(key);
    return res;
  }
}
