import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './models/user';
import { UserService } from './users.services';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/createUser.input';
import { UpdateUserInput } from './dto/input/updateUser.input';
import { DeleteUserInput } from './dto/input/deleteUser.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userServices: UserService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.userServices.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
    return this.userServices.getUsers(getUsersArgs);
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    return this.userServices.createUser(createUserData);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): User {
    return this.userServices.updateUser(updateUserData);
  }
  @Mutation(() => User)
  deleteUser(@Args('deleteUserInput') deleteUserInput: DeleteUserInput): User {
    return this.userServices.deleteUser(deleteUserInput);
  }
}
