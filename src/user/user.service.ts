import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail, isUUID } from 'class-validator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.createDefaultUser();
  }

  async createDefaultUser() {
    const userExists = await this.userRepository.findOne({
      where: {
        email: this.configService.get('DEFAULT_USER_EMAIL'),
      },
    });
    if (userExists) return;

    const password: string = this.configService.get('DEFAULT_USER_PASS');

    const user: User = this.userRepository.create({
      name: this.configService.get('DEAFULT_USER_NAME'),
      lastName: this.configService.get('DEFAULT_USER_LAST_NAME'),
      email: this.configService.get('DEFAULT_USER_EMAIL'),
      password: bcrypt.hashSync(password, 10),
    });

    try {
      await this.userRepository.save(user);
      this.logger.log(`Default user created`);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<User[]> {
    let { limit, offset } = paginationDto;

    limit = this.configService.get('LIMIT');
    offset = this.configService.get('OFFSET');

    const users = await this.userRepository
      .createQueryBuilder('user')
      // .where('user.isActive = true')
      .take(limit)
      .skip(offset)
      .getMany();

    if (!users.length) {
      throw new NotFoundException(`Users not found`);
    }
    return users;
  }

  async findOne(term: string): Promise<User | User[]> {
    let user: User | Promise<User | User[]>;

    if (isUUID(term)) {
      user = await this.userRepository.findOneBy({ id: term });
    } else if (isNaN(+term)) {
      if (isEmail(term)) {
        user = await this.userRepository.findOneBy({ email: term });
      } else {
        user = await this.userRepository.findOneBy({ name: term });
      }
    }

    if (!user) {
      throw new NotFoundException(`User with search term: "${term}" not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.userRepository.findOneBy({ id });
    if (!userExists) {
      throw new NotFoundException(
        `User with id: ${id} not found, can't update`,
      );
    }
    const { ...updateData } = updateUserDto;

    const user = await this.userRepository.preload({
      id,
      ...updateData,
    });
    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(
        `User with id: ${id} not found, can't delete`,
      );
    }

    await this.userRepository.remove(user);
    this.logger.log(`User with id: ${id} deleted successfully`);
    return {
      message: `User with id: ${id} deleted successfully`,
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
