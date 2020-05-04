import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import IUserStore from './IUserStore';
import User from '../../entities/User';
import { ID } from 'entities/Common';
import ErrorHandler from 'ErrorHandler';
import Admin from 'database/entities/Admin';
import Client from 'database/entities/Client';

@Injectable()
export default class UserStore implements IUserStore {
  constructor(
    @InjectConnection()
    private connection: Connection,
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async getUser(userId: ID) {
    return this.repository.findOneOrFail({
      where: { id: userId },
    });
  }

  async getUserOrFail(userId: ID) {
    const user = await this.getUser(userId);
    if (!user) throw new ErrorHandler('User not found');
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
      birthday: Date;
      email: string;
      phoneNumber: string;
      allowNotifications: boolean;
    },
  ) {
    await this.repository.update(userId, data);
  }

  async updatePreferences(userId: string, allowNotifications: boolean) {
    await this.connection
      .createQueryBuilder()
      .update(User)
      .set({ allowNotifications })
      .where('id = :id', { id: userId })
      .execute();
  }

  async getClients() {
    return this.clientRepository.find({ relations: ['user'] });
  }

  async createClientIfNotExists(userId: string) {
    const user = { id: userId };
    const client = await this.clientRepository.findOne(
      { user },
      {
        loadRelationIds: true,
      },
    );
    if (client) return client;

    {
      const client = this.clientRepository.create({ user });
      await this.clientRepository.insert(client);
      return client;
    }
  }

  async createAdminIfNotExists(userId: ID) {
    const user = { id: userId };
    const admin = await this.adminRepository.findOne(
      { user },
      {
        loadRelationIds: true,
      },
    );
    if (admin) return admin;

    {
      const admin = this.adminRepository.create({ user });
      await this.adminRepository.insert(admin);
      return admin;
    }
  }

  async getAdmins() {
    return this.adminRepository.find({ relations: ['user'] });
  }

  async getEnabledAdmins() {
    return this.adminRepository.find({
      where: { isEnabled: true },
      relations: ['user'],
    });
  }

  async getAdminByUserId(userId: ID) {
    const user = { id: userId };
    return this.adminRepository.findOne(
      { user },
      {
        loadRelationIds: true,
      },
    );
  }

  async updateClientInformation(
    id: string,
    name: string,
    birthday: Date,
    email: string,
  ) {
    const client = await this.getClientById(id);

    await this.repository.update(client.userId, {
      name,
      birthday,
      email,
    });
  }

  // @ts-ignore
  async getClientById(id: string) {
    return this.clientRepository.findOneOrFail({ id }, { relations: ['user'] });
  }
}
