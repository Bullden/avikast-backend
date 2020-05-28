import {Injectable} from '@nestjs/common';
import IUserStore from './IUserStore';
import {ID} from 'entities/Common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import UserModel, {UserSchema} from '../../models/UserModel';
import {mapUserFromModel} from '../../models/Mappers';

@Injectable()
export default class UserStore implements IUserStore {
  constructor(@InjectModel(UserSchema.name) private userModel: Model<UserModel>) {}

  private populate = 'referrer';

  async getUser(userId: ID) {
    const user = await this.userModel.findOne({_id: userId}).populate(this.populate);
    return user ? mapUserFromModel(user) : undefined;
  }

  async createUser(data: {
    name: string;
    email: string;
    country: string;
    city: string;
    dateOfBirth: Date;
    avatarUrl: string;
    tags: string[];
    skills: string[];
    referralCode: string;
    referrer: string | undefined;
  }) {
    const newUser = await this.userModel.create(data);
    return this.findUserByIdOrThrow(newUser._id);
  }

  async updateUser(
    userId: string,
    data: {
      name: string | undefined;
      email: string | undefined;
      country: string | undefined;
      city: string | undefined;
      dateOfBirth: Date | undefined;
      tags: string[] | undefined;
      skills: string[] | undefined;
      referralCode: string | undefined;
    },
  ) {
    const updateObject: Partial<UserModel> = {};
    if (data.name !== undefined) updateObject.name = data.name;
    if (data.email !== undefined) updateObject.email = data.email;
    if (data.country !== undefined) updateObject.country = data.country;
    if (data.city !== undefined) updateObject.city = data.city;
    if (data.dateOfBirth !== undefined) updateObject.dateOfBirth = data.dateOfBirth;
    if (data.tags !== undefined) updateObject.tags = data.tags;
    if (data.skills !== undefined) updateObject.skills = data.skills;
    if (data.referralCode !== undefined) updateObject.referralCode = data.referralCode;
    await this.userModel.update({_id: userId}, updateObject);
  }

  async findUserByIdOrThrow(id: string) {
    const user = await this.userModel.findById(id).populate(this.populate);
    if (!user) throw new Error('User not found');
    return mapUserFromModel(user);
  }

  async findUserByReferralCode(referralCode: string) {
    const user = await this.userModel.findOne({referralCode}).populate(this.populate);
    return user ? mapUserFromModel(user) : undefined;
  }
}
