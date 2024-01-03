import { PostCreateDto, PostFilterQueryDto } from '@/dto/post.dto';
import { UserCreateDto } from '@/dto/user.dto';
import { ImageInterface } from '@/interface/image.interface';
import { PostExportInterface, PostInterface } from '@/interface/post.interface';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import { Stream } from 'stream';

export const userStub = (): UserInterface => {
  return {
    id: 'mocked-id',
    user_id: 'mocked-user_id',
    username: 'mocked-username',
    email: 'mocked@mocked.com',
    phone: '+82010-1234-5678',
    password: 'Mocked-password1)',
    delete: false,
    version: 1,
    tag: ['mocked-tag'],
    request: false,
  };
};

export const postCreateStub = (): PostCreateDto => {
  return {
    basic_info: 'mocked-basic_info',
    benefit: 'mocked-benefit',
    description: 'mocked-description',
    end_day: '2010-01-01',
    extra_info: 'mocked-extra_info',
    max_duration: 1,
    min_duration: 1,
    position: 'mocked-position',
    refund_policy: 'mocked-refund_policy',
    rule: 'mocked-rule',
    start_day: '2000-01-01',
    title: 'mocked-title',
    price: 1,
    limit_people: 3,
    number_room: 3,
    number_bathroom: 3,
    number_bedroom: 3,
  };
};

export const postExportStub = (): PostExportInterface => {
  return {
    ...postCreateStub(),
    key: 1,
    image_id: ['mocked-image_id'],
    postuser_id: 'mocked-postuser_id',
    post_date: 'mocked-post_date',
  };
};

export const postStub = (): PostInterface => {
  return {
    ...postExportStub(),
    id: 'mocked-id',
    deleted: false,
    version: 1,
  };
};

export const imageStub = (): ImageInterface => {
  return {
    id: 'mocked-id1',
    filename: 'mocked-filename1',
    filetype: 'mocked-filetype1',
    image_hash: 'mocked-image_hash1',
  };
};

export const multerFileStub = (): Express.Multer.File => {
  return {
    fieldname: 'mocked-fieldname',
    originalname: 'mocked-originalname',
    encoding: 'mocked-encoding',
    mimetype: 'image/jpeg',
    destination: 'mocked-destination',
    filename: 'mocked-filename',
    path: 'mocked-path',
    size: 1,
    stream: Stream.Readable.from('mocked-stream'),
    buffer: Buffer.from('mocked-buffer'),
  };
};

export const filterStub = (): PostFilterQueryDto => {
  return {
    maxPost: 16,
    page: 1,
    fromDate: '2000-01:01',
    toDate: '2010-01-01',
  };
};

export const userCreateStub = (): UserCreateDto => {
  return {
    username: userStub().username,
    email: userStub().email,
    phone: userStub().phone,
    password: userStub().password,
    tag: userStub().tag,
    user_id: userStub().user_id,
  };
};

export const userExportStub = (id: string): UserExportInterface => {
  return {
    id,
    username: userStub().username,
    email: userStub().email,
    user_id: userStub().user_id,
    tag: userStub().tag,
    request: userStub().request,
  };
};
