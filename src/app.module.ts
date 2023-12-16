import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule, AdminModule, UserModule, FoodModule
  ],
})
export class AppModule { }
