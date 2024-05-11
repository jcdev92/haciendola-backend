import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  handle: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  title: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  description: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  sku: string;

  @Column('int', {
    nullable: false,
  })
  grams: number;

  @Column('int', {
    nullable: false,
  })
  stock: number;

  @Column('float', {
    nullable: false,
  })
  price: number;

  @Column('float', {
    nullable: false,
  })
  comparePrice: number;

  @Column('bigint', {
    nullable: false,
  })
  barcode: number;

  @Column('bool', {
    name: 'is_active',
    default: true,
    nullable: false,
  })
  isActive: boolean;
}
