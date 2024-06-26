import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('text', {
    nullable: false,
    select: false,
  })
  password: string;

  @Column('text', {
    name: 'name',
    unique: true,
    nullable: false,
  })
  name: string;

  @Column('text', {
    name: 'last_name',
    unique: true,
    nullable: false,
  })
  lastName: string;

  @Column('bool', {
    name: 'is_active',
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFiledsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
