import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [UserService, ConfigService],
  imports: [TypeOrmModule.forFeature([User]), AuthModule, ConfigModule],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
