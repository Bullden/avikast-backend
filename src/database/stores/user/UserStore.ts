import {Injectable} from '@nestjs/common';
import IUserStore from './IUserStore';
import {ID} from 'entities/Common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import UserModel, {UserSchema} from '../../models/UserModel';
import {mapUserFromModel, mapUsersFromModel} from '../../models/Mappers';
import RoomModel, {RoomSchema} from 'database/models/RoomModel';
import LocalLoginModel, {LocalLoginSchema} from 'database/models/LocalLoginModel';

@Injectable()
export default class UserStore implements IUserStore {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserModel>,
    @InjectModel(RoomSchema.name) private roomModel: Model<RoomModel>,
    @InjectModel(LocalLoginSchema.name) private localLoginModel: Model<LocalLoginModel>,
  ) {}

  private populate = 'referrer';

  async getUser(userId: ID) {
    const user = await this.userModel.findOne({_id: userId}).populate(this.populate);
    return user ? mapUserFromModel(user) : undefined;
  }

  async getUsers() {
    return mapUsersFromModel(await this.userModel.find().populate(this.populate));
  }

  async deleteUsers(userIds: string[]) {
    await this.userModel.deleteMany({_id: {$in: userIds}});
    await this.localLoginModel.deleteMany({user: {$in: userIds}});
    await this.roomModel.deleteMany({user: {$in: userIds}});
  }

  async banUsersTemporary(userIds: string[], untilDate: string) {
    const date = new Date(untilDate);

    await this.userModel.updateMany(
      {_id: userIds},
      {banUntilDate: date, banForever: undefined},
    );
  }

  async banUsersPermanently(userIds: string[]) {
    await this.userModel.updateMany(
      {_id: userIds},
      {banUntilDate: undefined, banForever: true},
    );
  }

  async restoreUsers(userIds: string[]) {
    await this.userModel.updateMany(
      {_id: userIds},
      {banUntilDate: undefined, banForever: undefined},
    );
  }

  async createUser(data: {
    name: string;
    email: string;
    country: string;
    city: string;
    position: string;
    telephone: string;
    dateOfBirth: Date;
    avatarUrl: string;
    tags: string[];
    skills: string[];
    mission: string[];
    vision: string[];
    interests: string[];
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
      country: string | undefined;
      city: string | undefined;
      position: string | undefined;
      telephone: string | undefined;
      dateOfBirth: Date | undefined;
      tags: string[] | undefined;
      skills: string[] | undefined;
      mission: string[] | undefined;
      vision: string[] | undefined;
      interests: string[] | undefined;
      referralCode: string | undefined;
    },
  ) {
    const updateObject: Partial<UserModel> = {};
    if (data.name !== undefined) updateObject.name = data.name;
    if (data.country !== undefined) updateObject.country = data.country;
    if (data.city !== undefined) updateObject.city = data.city;
    if (data.position !== undefined) updateObject.position = data.position;
    if (data.telephone !== undefined) updateObject.telephone = data.telephone;
    if (data.dateOfBirth !== undefined) updateObject.dateOfBirth = data.dateOfBirth;
    if (data.tags !== undefined) updateObject.tags = data.tags;
    if (data.skills !== undefined) updateObject.skills = data.skills;
    if (data.mission !== undefined) updateObject.mission = data.mission;
    if (data.vision !== undefined) updateObject.vision = data.vision;
    if (data.interests !== undefined) updateObject.interests = data.interests;
    if (data.referralCode !== undefined) updateObject.referralCode = data.referralCode;
    await this.userModel.updateOne({_id: userId}, updateObject);
  }

  async updateUserImage(myUserId: string, fileId: string) {
    const updateObject: Partial<UserModel> = {};
    updateObject.avatarUrl = fileId;
    await this.userModel.updateOne({_id: myUserId}, updateObject);
    return true;
  }

  async updateUserLogoImage(myUserId: string, fileId: string) {
    const updateObject: Partial<UserModel> = {};
    updateObject.logoUrl = fileId;
    await this.userModel.updateOne({_id: myUserId}, updateObject);
    return true;
  }

  async updateUserBackgroundImage(myUserId: string, fileId: string) {
    const updateObject: Partial<UserModel> = {};
    updateObject.backgroundUrl = fileId;
    await this.userModel.updateOne({_id: myUserId}, updateObject);
    return true;
  }

  async findUserByIdOrThrow(id: string) {
    const user = await this.userModel.findById(id).populate(this.populate);
    if (!user) throw new Error('Resume not found');
    return mapUserFromModel(user);
  }

  async getUserName(id: string) {
    const user = await this.findUserByIdOrThrow(id);
    if (!user) return 'unknown';
    return user.name;
  }

  async findUserByReferralCode(referralCode: string) {
    const user = await this.userModel.findOne({referralCode}).populate(this.populate);
    return user ? mapUserFromModel(user) : undefined;
  }

  async getReferrersByUserId(id: string) {
    const referrers = await this.userModel.find({referrer: id}).populate(this.populate);
    return mapUsersFromModel(referrers);
  }
}
