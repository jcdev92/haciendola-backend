import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'cola-glitter-23-grs',
    description: 'Unique product handle',
    required: true,
  })
  handle: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'tempera-100-ml',
    description: 'Product title',
    required: true,
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: 'train your creativity with tempera-100-ml',
    description: 'Product description',
    required: true,
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '60870131001',
    description: 'Product SKU',
    required: true,
  })
  sku: string;

  @IsString()
  @ApiProperty({ example: 103.45, description: 'Product grams' })
  grams: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 100, description: 'Product stock' })
  stock: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 13.85, description: 'Product price' })
  price: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 2.0, description: 'Product compare price' })
  comparePrice: number;

  @IsString()
  @ApiProperty({ example: '7891153003689', description: 'Product barcode' })
  barcode: string;

  @ApiProperty({ example: true, description: 'Product status' })
  isActive: boolean;
}
