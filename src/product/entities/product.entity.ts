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
    nullable: false,
  })
  title: string;

  @Column('text', {})
  description: string;

  @Column('text', {
    unique: true,
  })
  sku: string;

  @Column('text', {})
  grams: string;

  @Column('int', {})
  stock: number;

  @Column('float', {})
  price: number;

  @Column('float', {})
  comparePrice: number;

  @Column('text', {
    nullable: true,
  })
  barcode: string;

  @Column('bool', {
    name: 'is_active',
    default: true,
    nullable: false,
  })
  isActive: boolean;
}
