import { BadRequestException, Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { writeFile } from 'fs/promises';
import { PostCreateDto, PostGetAllQueryDto } from '@/dto/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly db: MongodbService) {}

  async getAllPosts(query: PostGetAllQueryDto) {
    return this.db.getAllPosts(query);
  }

  async createPost(files: Express.Multer.File[], post: PostCreateDto) {
    post['end_day'] = new Date(post['end_day']);
    post['start_day'] = new Date(post['start_day']);
    const images = [];
    for (const file of files) {
      const res = await this.uploadImage(file);
      images.push(res.id);
    }
    await this.db.createPost({
      ...post,
      images,
    });
    return { res: 'ok' };
  }

  async getOnePost(key: number) {
    return this.db.getOnePost(key);
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file || file.mimetype !== 'image/jpeg')
      throw new BadRequestException('invalid image type');
    const res = await this.db.saveImage(file.originalname, file.mimetype);
    const bytes = file.buffer;
    const buffer = Buffer.from(bytes);
    await writeFile(`./public/${res.id}.jpg`, buffer);
    return res;
  }
}
