import { keyboard } from './../enums/keyboard.enums';
import { Injectable } from '@nestjs/common';
import { Context, Markup } from 'telegraf';
@Injectable()
export class AdminService {
  start(ctx: Context) {
    const keyboar = Markup.keyboard([keyboard.Comment]).resize().oneTime();

    ctx.reply('Assalomu aleykumadmin Admin, xush kelibsiz', keyboar);
  }

  addProduct(ctx: Context) {
    console.log('proct added');
  }
}
