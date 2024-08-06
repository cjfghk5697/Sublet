import {
  PostCreateDto,
  PostFilterQueryDto,
  PostGetAllQueryDto,
  PostUpdateDto,
} from '@/dto/post.dto';
import { PostExportInterface, PostInterface } from '@/interface/post.interface';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { writeFile } from 'fs/promises';
import * as sharp from 'sharp';
import { MongodbPostService } from '../mongodb/mongodb.post.service';
import { MongodbPostImageService } from '../mongodb/mongodb.postimage.service';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postdb: MongodbPostService,
    private readonly postimagedb: MongodbPostImageService,
  ) {}

  isPositiveInt(val: number, defaultVal: number) {
    if (typeof val !== 'number') return defaultVal;
    if (!Number.isInteger(val)) return defaultVal;
    if (val <= 0) return defaultVal;
    return val;
  }

  // GET /POST
  async getAllPosts(query: PostGetAllQueryDto) {
    query.maxPost = this.isPositiveInt(query.maxPost, 6);
    if (query.maxPost > 50) query.maxPost = 6;

    query.page = this.isPositiveInt(query.page, 1);
    const result = await this.postdb.getAllPosts(query);

    const ret = result.map((post) => PostService.transformExport(post));
    return ret;
  }

  async getMyPosts(user_id: string) {
    const res = await this.postdb.getUserPostByKey(user_id);
    const ret = res.map((ele) => PostService.transformExport(ele));
    return ret;
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
    const res: PostInterface = await this.postdb.createPost(
      {
        ...post,
        image_id,
      },
      user,
    );
    const ret = PostService.transformExport(res);
    return ret;
  }

  // GET /POST/:postKey
  async getOnePost(key: number) {
    const res = await this.postdb.getOnePost(key);
    const ret = PostService.transformExport(res);
    return ret;
  }

  // GET /post/local
  async getLocalPost(user: UserInterface) {
    const res = await this.postdb.getLocalPost(user);
    const ret = res.map((ele) => {
      return PostService.transformExport(ele);
    });
    return ret;
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

    const res = await this.postdb.putOnePost(key, postUpdateInput);
    const ret = PostService.transformExport(res);
    return ret;
  }

  // DELETE /POST/:postKey
  async deleteOnePost(key: number, user: UserInterface) {
    const res = await this.postdb.deleteOnePost(key, user);
    return res;
  }

  async filterPost(query: PostFilterQueryDto) {
    const res = await this.postdb.filterPost(query);

    const ret = res.map((post) => PostService.transformExport(post));
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
      const res = await this.postimagedb.getImage(
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
    // 허용할 MIME 타입 목록
    const allowedMimeTypes = ['image/jpeg', 'image/png'];

    // 파일 존재 여부 및 MIME 타입 체크
    if (!file || !allowedMimeTypes.includes(file.mimetype)) {
      throw new Error(
        '[post.service:uploadImage] file not exist or mimetype is not image/jpeg or image/png',
      );
    }

    // 이미지 해시 계산
    const image_hash = this.calculateHash(file.buffer);

    // 이미지 정보 저장 (항상 image/jpeg로 저장)
    const res = await this.postimagedb.saveImage(
      file.originalname,
      'image/jpeg', // 모든 이미지를 JPEG로 저장
      image_hash,
    );

    // Sharp 라이브러리를 사용하여 이미지를 JPEG로 변환
    const jpegBuffer = await sharp(file.buffer)
      .jpeg({ quality: 80 }) // JPEG 형식으로 변환, 품질 설정 가능
      .toBuffer();

    // JPEG 형식으로 변환된 이미지를 파일로 저장
    await writeFile(`./public/${res.id}.jpg`, jpegBuffer);

    return res;
  }

  async getLikePosts(user_id: string) {
    const res = await this.postdb.getLikePosts(user_id);
    const ret = res.map((ele) => PostService.transformExport(ele));
    return ret;
  }

  async likePost(post_key: number, user: UserInterface) {
    const res = await this.postdb.likePost(post_key, user);
    const ret = PostService.transformExport(res);
    return ret;
  }

  async unlikePost(post_key: number, user: UserInterface) {
    const res = await this.postdb.unlikePost(post_key, user);
    const ret = PostService.transformExport(res);
    return ret;
  }

  static transformExport(post: PostInterface): PostExportInterface {
    delete (post as { request_ids?: string[] }).request_ids;
    delete (post as { postuser_id?: string }).postuser_id;
    delete (post as { like_user_id?: string[] }).like_user_id;
    delete (post as { id?: string }).id;
    delete (post as { deleted?: boolean }).deleted;
    delete (post as { version?: number }).version;
    (post as { postuser: UserExportInterface }).postuser =
      UserService.transformExport(post.postuser);
    (post as { like_user: UserExportInterface[] }).like_user =
      post.like_user.map((ele) => UserService.transformExport(ele));
    return post;
  }
}
