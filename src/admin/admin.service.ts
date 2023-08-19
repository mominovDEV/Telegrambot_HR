import { AppService } from './../app.service';
import { keyboard } from './../enums/keyboard.enums';
import { Injectable } from '@nestjs/common';
import { Context, Markup } from 'telegraf';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
@Injectable()
export class AdminService {
  // constructor(
  //   @Inject(forwardRef(() => AppService))
  //   private appservice: AppService,
  // ) {}
  constructor(private appservice: AppService) {}
  start(ctx: Context) {
    const keyboar = Markup.keyboard([keyboard.Comment]).resize().oneTime();

    ctx.reply('Assalomu aleykum Admin, xush kelibsiz', keyboar);
    console.log(this.appservice.name);
  }
  // async checkAndSendMessagesToAdmin() {
  // const userMessages = this.appService.getUserMessages();

  // if (userMessages.length > 0) {
  //   // Process and send user messages to the admin
  //   for (const message of userMessages) {
  //     await this.sendUserMessageToAdmin(message);
  //   }
  //   // Clear processed messages
  //   this.appService.clearUserMessages();
  // }
}
