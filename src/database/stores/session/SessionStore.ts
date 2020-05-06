import ISessionStore from './ISessionStore';
import Session from '../../entities/Session';
import {ID} from 'entities/Common';
import AppType from 'entities/AppType';
import {Platform} from 'entities/Platform';
import SessionModel, {SessionSchema} from '../../models/SessionModel';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import AvikastError from '../../../AvikastError';

export default class SessionStore extends ISessionStore {
  constructor(
    @InjectModel(SessionSchema.name) private SessionModel: Model<SessionModel>,
  ) {
    super();
  }

  // @ts-ignore // todo: remove
  async createSession(
    user: {id: string},
    token: string,
    refreshToken: string,
    appType: AppType,
    platform: Platform,
  ) {
    const newSession = await this.SessionModel.create({
      user,
      refreshToken,
      token,
      appType,
      platform,
    });
    await newSession.save();
    return newSession;

    throw new Error('Not implemented'); // todo: implement
  }

  // @ts-ignore // todo: remove
  async getSession(session: {id: string}) {
    return this.SessionModel.findOne({_id: session.id});

    throw new Error('Not implemented'); // todo: implement
  }

  // @ts-ignore // todo: remove
  async getSessionOrFail(sessionId: ID) {
    const session = await this.SessionModel.findOne({_id: sessionId});
    if (!session) throw new AvikastError('Session not exists');
    return session;
  }

  // @ts-ignore // todo: remove
  async getSessionByToken(token: string) {
    return this.SessionModel.findOne({token});

    throw new Error('Not implemented'); // todo: implement
  }

  // @ts-ignore // todo: remove
  async getSessionByTokenOrThrow(token: string) {
    const session = this.SessionModel.findOne({token});
    if (!session) throw new AvikastError('Session not found');
    return session;

    throw new Error('Not implemented'); // todo: implement
  }

  // @ts-ignore // todo: remove
  async getSessionByRefreshToken(refreshToken: string) {
    return this.SessionModel.findOne({refreshToken});

    throw new Error('Not implemented'); // todo: implement
  }

  // @ts-ignore // todo: remove
  async updateSession(
    session: {id: string},
    token: string,
    refreshToken: string,
  ): Promise<Session> {
    // await this.repository.update(session.id, {token, refreshToken});
    // await this.SessionModel.update(session.id, {token, refreshToken});
    // return this.getSessionOrFail(session.id);
    //
    throw new Error('Not implemented'); // todo: implement
  }

  // @ts-ignore // todo: remove
  async updateFirebaseToken(session: {id: string}, registrationId: string) {
    // await this.repository.update(session.id, {
    //   firebaseRegistrationId: registrationId,
    // });
    // await this.SessionModel.update(session.id, {firebaseRegistrationId: registrationId});

    throw new Error('Not implemented'); // todo: implement
  }

  // @ts-ignore // todo: remove
  async getUserFirebaseTokens(userId: ID): Promise<string[]> {
    // const where: FindConditions<Session> = {
    //   userId,
    //   firebaseRegistrationId: Not(IsNull()),
    // };
    //
    // return (
    //   await this.repository.find({
    //     where,
    //     relations: ['user'],
    //     select: ['firebaseRegistrationId'],
    //   })
    // ).map((session: Session) => session.firebaseRegistrationId as string);
    throw new Error('Not implemented'); // todo: implement
  }

  // @ts-ignore // todo: remove
  async getUsersFirebaseTokens(userIds: ID[]): Promise<string[]> {
    // const where: FindConditions<Session> = {
    //   userId: In(userIds),
    //   firebaseRegistrationId: Not(IsNull()),
    // };
    // return (
    //   await this.repository.find({
    //     where,
    //     relations: ['user'],
    //     select: ['firebaseRegistrationId'],
    //   })
    // ).map((session: Session) => session.firebaseRegistrationId as string);
    throw new Error('Not implemented'); // todo: implement
  }
}
