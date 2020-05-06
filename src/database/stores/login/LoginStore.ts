import ILoginStore from './ILoginStore';
import User from '../../entities/User';
import {ID} from 'entities/Common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import LocalLoginModel, {LocalLoginSchema} from '../../models/LocalLoginModel';
import {mapLocalLoginFromModel, mapLocalLoginToModel} from '../../models/Mappers';

export default class LoginStore extends ILoginStore {
  constructor(
    @InjectModel(LocalLoginSchema.name) private localLoginModel: Model<LocalLoginModel>,
  ) {
    super();
  }

  async createLocalLogin(user: User, email: string, passwordHash: string) {
    const login = await this.localLoginModel.create(
      mapLocalLoginToModel(user, email, passwordHash),
    );
    return mapLocalLoginFromModel(login, user);
  }

  async getLocalLoginByEmail(email: string) {
    const login = await this.localLoginModel
      .findOne({
        email,
      })
      .populate('user');
    return login ? mapLocalLoginFromModel(login) : undefined;
  }

  async getLocalLoginByUser(user: {id: ID}) {
    const login = await this.localLoginModel.findOne({user: user.id}).populate('user');
    return login ? mapLocalLoginFromModel(login) : undefined;
  }

  async updateLocalLoginPassword(user: {id: string}, passwordHash: string) {
    await this.localLoginModel.update(
      {user: user.id},
      {
        passwordHash,
      },
    );
  }

  async findLocalLoginByEmail(email: string) {
    const login = await this.localLoginModel.findOne({email});
    return login ? mapLocalLoginFromModel(login) : undefined;
  }
}
