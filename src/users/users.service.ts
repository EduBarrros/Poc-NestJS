import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface user extends CreateUserDto {
  id: number;
}

@Injectable()
export class UsersService {
  private users: user[] = [];
  private id = 1;

  create(createUserDto: CreateUserDto) {
    const newUserData = {id: this.id++, ...createUserDto};

    this.users.push(newUserData)

    return newUserData;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id);

    if(user){
      return user
    }

    throw new NotFoundException('User not found');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(user => user.id === id)

      if(index > -1){
        this.users[index] = {id: id, ...updateUserDto}

        return this.users[index]
      }

      throw new NotFoundException('User not found');
  }

  remove(id: number) {
     const index = this.users.findIndex(user => user.id === id)

      if(index > -1){

        const deleted = this.users[index]

        this.users.splice(index, 1)

        return deleted
      }

      throw new NotFoundException('User not found');
  }
}
