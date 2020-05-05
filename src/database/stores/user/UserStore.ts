import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import IUserStore from './IUserStore';
import User from '../../entities/User';
import { ID } from 'entities/Common';
import AvikastError from 'AvikastError';

@Injectable()
export default class UserStore implements IUserStore {
  constructor(
    @InjectConnection()
    private connection: Connection,
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async getUser(userId: ID) {
    return this.repository.findOneOrFail({
      where: { id: userId },
    });
  }

  async getUserOrFail(userId: ID) {
    const user = await this.getUser(userId);
    if (!user) throw new AvikastError('User not found');
    return user;
  }

  async createUser(user: Partial<User>) {
    const newUser = this.repository.create({ ...user });
    await this.repository.insert(newUser);
    return newUser;
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
    await this.repository.update(userId, data);
  }

  async createUserIfNotExists(userId: string) {
    const id = { id: userId };
    if (!id) throw new AvikastError('error');
    const user = await this.repository.findOne(
      { id: userId },
      {
        loadRelationIds: true,
      },
    );
    if (user) return user;
    {
      const newUser = this.repository.create();
      await this.repository.insert(newUser);
      return newUser;
    }
  }
}
