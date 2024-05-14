import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities/product.entity';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { FileConverterService } from 'src/common/file-converter/file-converter.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductService implements OnModuleInit {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly fileConverterService: FileConverterService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.saveManyProducts();
  }

  private convertProductFile(filePath: string) {
    return this.fileConverterService.xlsxToJson(filePath);
  }

  private async saveManyProducts() {
    const filePath = 'src/product/file/products.xlsx';
    const products = this.fileConverterService.xlsxToJson(filePath);

    try {
      const productsExists = await Promise.all(
        products.map(async (product) => {
          const productExists = await this.productRepository.findOneBy({
            handle: product.handle,
          });
          return productExists;
        }),
      );

      if (productsExists.some((product) => product)) {
        this.logger.warn('Some products already exist');
        return;
      } else {
        await Promise.all(
          products.map(async (product) => {
            await this.productRepository.save(product);
          }),
        );
        this.logger.log('Products saved successfully');
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

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
    let { limit, offset } = paginationDto;

    limit = this.configService.get('LIMIT');
    offset = this.configService.get('OFFSET');

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
    const productExists = await this.productRepository.findOneBy({ id });

    if (!productExists) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

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
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    await this.productRepository.remove(product);
    this.logger.log(`Product with id: ${id} deleted successfully`);
    return {
      message: `Product with id: ${id} deleted successfully`,
    };
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
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
