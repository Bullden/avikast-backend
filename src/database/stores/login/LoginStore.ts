import ILoginStore from './ILoginStore';
import User from '../../entities/User';
import {ID} from 'entities/Common';

export default class LoginStore extends ILoginStore {
  constructor() {
    super();
  }

  // @ts-ignore // todo: remove
  async createLocalLogin(user: User, email: string, passwordHash: string) {
    // const login = this.repository.create({
    //   user,
    //   email,
    //   passwordHash,
    // });
    // await this.repository.insert(login);
    // return login;
    throw new Error('Not implemented'); // todo: implement
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
