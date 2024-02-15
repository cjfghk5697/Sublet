import { LoggedInGuard } from '@/guards/logged-in.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestCreateDto, requestKey } from '@/dto/request.dto';
import { customRequest } from '@/interface/user.interface';
import { RequestBase, RequestId } from '@/interface/request.interface';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}
  @Post('post/:postKey') //Put 기능으로하면 경로를 못찾음.
  @UseGuards(LoggedInGuard)
  async putOnePostRequest(
    @Param('postKey') post_key: number,
    @Body() data: requestKey,
  ) {
    try {
      const res = await this.requestService.putOnePostRequest(
        data.key,
        post_key,
      );
      return { ok: res };
    } catch (e) {
      console.log('[request.controller:putOnePostRequest] error: ', e);
      throw new BadRequestException();
    }
  }
  @Post('requestId')
  @UseGuards(LoggedInGuard)
  async getRequestByRequestId(@Body() id: RequestId) {
    try {
      const res = await this.requestService.getRequestByRequestId(id);
      return res;
    } catch (e) {
      console.log('[request.controller:getRequestByRequestId] error: ', e);
      throw new BadRequestException();
    }
  }

  @Post()
  @UseGuards(LoggedInGuard)
  async createRequest(
    @Body() data: RequestCreateDto,
    @Req() req: customRequest,
  ) {
    if (!req.user) {
      console.log("[request.controller:createRequest] req.user doesn't exist");
      throw new UnauthorizedException();
    }

    try {
      const res = await this.requestService.createRequest(data, req.user);
      return res;
    } catch (e) {
      console.log('[request.controller:createRequest] error: ', e);
      throw new BadRequestException();
    }
  }

  @Get()
  @UseGuards(LoggedInGuard)
  async getRequestByUserKey(@Req() req: customRequest) {
    if (!req.user) {
      console.log(
        "[request.controller:getRequestByUserKey] req.user doesn't exist",
      );
      throw new UnauthorizedException();
    }

    try {
      const res = await this.requestService.getRequestByUserKey(
        req.user.user_id,
      );
      return res;
    } catch (e) {
      console.log('[request.controller:getRequestByUserKey] error: ', e);
      throw new BadRequestException();
    }
  }

  @Delete()
  @UseGuards(LoggedInGuard)
  async deleteOneRequest(@Body() data: requestKey, @Req() req: customRequest) {
    if (!req.user) {
      console.log(
        "[request.controller:deleteOneRequest] req.user doesn't exist",
      );
      throw new UnauthorizedException();
    }
    try {
      const res = await this.requestService.deleteOneRequest(data.key);
      return { ok: res };
    } catch (e) {
      console.log('[request.controller:deleteOneRequest] error: ', e);
      throw new BadRequestException();
    }
  }

  @Post(':requestKey') //Put 기능으로하면 경로를 못찾음.
  @UseGuards(LoggedInGuard)
  async putOneRequest(
    @Param('requestKey') key: number,
    @Body() data: RequestBase,
  ) {
    try {
      const res = await this.requestService.putOneRequest(key, data);
      return { ok: res };
    } catch (e) {
      console.log('[request.controller:putOneRequest] error: ', e);
      throw new BadRequestException();
    }
  }
}
