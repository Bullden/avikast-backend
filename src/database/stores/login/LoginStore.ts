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

  // @ts-ignore // todo: remove
  async createLocalLogin(user: User, email: string, passwordHash: string) {
    const login = await this.localLoginModel.create(
      mapLocalLoginToModel({
        user,
        email,
        passwordHash,
      }),
    );
    return mapLocalLoginFromModel(await login.save(), user);
  }

  // @ts-ignore // todo: remove
  async getLocalLoginByEmail(email: string) {
    // return this.repository
    //   .createQueryBuilder('ll')
    //   .where('LOWER(ll.email) = LOWER(:email)', {email})
    //   .innerJoinAndSelect('ll.user', 'u')
    //   .getOne();
    throw new Error('Not implemented'); // todo: implement
  }

  // @ts-ignore // todo: remove
  getLocalLoginByUser(user: {id: ID}) {
    // return this.repository.findOne({user: {id: user.id}}, {relations: ['user']});
    throw new Error('Not implemented'); // todo: implement
  }

  // @ts-ignore // todo: remove
  async updateLocalLoginPassword(user: {id: string}, passwordHash: string) {
    // await this.repository.update(user.id, {
    //   passwordHash,
    // });
    throw new Error('Not implemented'); // todo: implement
  }

  // @ts-ignore // todo: remove
  findLocalLoginByEmail(email: string) {
    // return this.repository.findOne({where: {email}});
    throw new Error('Not implemented'); // todo: implement
  }
}
