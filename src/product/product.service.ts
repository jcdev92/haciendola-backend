import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities/product.entity';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Product[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.isActive = true')
      .take(limit)
      .skip(offset)
      .getMany();

    if (!products.length) {
      throw new NotFoundException(`Products not found`);
    }
    return products;
  }

  async findOne(term: string): Promise<Product | Product[]> {
    let product: Product | Promise<Product | Product[]>;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else if (isNaN(+term)) {
      product = await this.productRepository.findOneBy({ title: term });
    }

    if (!product) {
      throw new NotFoundException(
        `Product with search term: "${term}" not found`,
      );
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { ...updateData } = updateProductDto;

    const product = await this.productRepository.preload({
      id,
      ...updateData,
    });
    try {
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(
        `Product with id: ${id} not found, can't delete`,
      );
    }
    product.isActive = false;
    await this.productRepository.save(product);
    this.logger.log(`Product with id: ${id} deleted successfully`);
    return {
      message: `Product with id: ${id} deleted successfully`,
    };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error!, check server logs',
    );
  }
}
