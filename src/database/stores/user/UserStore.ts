import {Injectable} from '@nestjs/common';
import IUserStore from './IUserStore';
import User from '../../entities/User';
import {ID} from 'entities/Common';

@Injectable()
export default class UserStore implements IUserStore {
  constructor() {} // private readonly repository: Repository<User>, // @InjectRepository(User) // private connection: Connection, // @InjectConnection()

  async getUser(userId: ID) {
    // return this.repository.findOneOrFail({
    //   where: {id: userId},
    // });
    throw new Error('Not implemented'); // todo: implement
  }

  async getUserOrFail(userId: ID) {
    // const user = await this.getUser(userId);
    // if (!user) throw new AvikastError('User not found');
    // return user;
    throw new Error('Not implemented'); // todo: implement
  }

  async createUser(user: Partial<User>) {
    // const newUser = this.repository.create({...user});
    // await this.repository.insert(newUser);
    // return newUser;
    throw new Error('Not implemented'); // todo: implement
  }

  async updateUser(
    userId: string,
    data: {
      name: string;
      email: string;
      phoneNumber: string;
      allowNotifications: boolean;
    },
  ) {
    // await this.repository.update(userId, data);
    throw new Error('Not implemented'); // todo: implement
  }

  async createUserIfNotExists(userId: string) {
    // const id = {id: userId};
    // if (!id) throw new AvikastError('error');
    // const user = await this.repository.findOne(
    //   {id: userId},
    //   {
    //     loadRelationIds: true,
    //   },
    // );
    // if (user) return user;
    // {
    //   const newUser = this.repository.create();
    //   await this.repository.insert(newUser);
    //   return newUser;
    // }
    throw new Error('Not implemented'); // todo: implement
  }
}
