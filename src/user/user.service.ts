import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();

    // user.firstName = createUserDto.firstName;
    // user.lastName = createUserDto.lastName;
    // user.password = createUserDto.password;
    user.firstName = 'Jaroslav';
    user.lastName = 'Loutocký';
    user.password = 'password';
    user.createdBy = 'loutocky';
    user.lastChangedBy = 'loutocky';

    return this.repository.save(user);
  }

  findAll(): Promise<Array<User>> {
    return this.repository.find();
  }

  findOne(id: number): Promise<User> {
    return this.repository.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.repository.update({ id: id }, updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.repository.delete({ id: id });
  }
}
