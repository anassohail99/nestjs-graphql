import { Injectable } from '@nestjs/common';
import { User } from './models/user';
import { CreateUserInput } from './dto/input/createUser.input';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserInput } from './dto/input/updateUser.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/deleteUser.input';

@Injectable()
export class UserService {
  private users: User[] = [];

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };

    this.users.push(user);
    return user;
  }
  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(
      (user) => user.userId === updateUserData.userId,
    );
    Object.assign(user, updateUserData);
    return user;
  }
  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }
  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return this.users;
  }
  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => deleteUserData.userId == user.userId,
    );
    const user = this.users[userIndex];
    this.users.splice(userIndex);
    return user;
  }
}
