import { forwardRef } from '@nestjs/common/utils';
import { AppModule } from './../app.module';
import { AppService } from './../app.service';
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';

@Module({
  imports: [forwardRef(() => AppModule)],
  providers: [AdminService, AppService],
  exports: [AdminService],
})
export class AdminModule {}
