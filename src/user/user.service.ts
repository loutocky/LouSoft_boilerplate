import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  create(createUserDto: CreateUserDto) {
    const user: User = new User();

    // user.firstName = createUserDto.firstName;
    // user.lastName = createUserDto.lastName;
    // user.password = createUserDto.password;
    user.firstName = 'Jaroslav';
    user.lastName = 'Loutocký';
    user.password = 'password';
    user.createdBy = 'loutocky';

    return this.repository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number): Promise<User> {
    return this.repository.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
