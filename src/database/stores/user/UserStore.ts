import {Injectable} from '@nestjs/common';
import IUserStore from './IUserStore';
import User from '../../entities/User';
import {ID} from 'entities/Common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import UserModel, {UserSchema} from '../../models/UserModel';
import {mapUserFromModel, mapUserToModel} from '../../models/Mappers';
import AvikastError from '../../../AvikastError';

@Injectable()
export default class UserStore implements IUserStore {
  constructor(@InjectModel(UserSchema.name) private userModel: Model<UserModel>) {}

  async getUser(userId: ID) {
    const user = await this.userModel.findOne({
      where: {id: userId},
    });
    return user ? mapUserFromModel(user) : undefined;
  }

  async getUserOrFail(userId: ID) {
    const user = await this.getUser(userId);
    if (!user) throw new AvikastError('User not found');
    return user;
  }

  async createUser(user: Partial<User>) {
    const newUser = await this.userModel.create(mapUserToModel(user));
    return mapUserFromModel(await newUser.save());
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
    await this.userModel.update({_id: userId}, data);
  }
}
