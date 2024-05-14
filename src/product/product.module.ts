import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ConfigService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    AuthModule,
    CommonModule,
    ConfigModule,
  ],
  exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
