import ISessionStore from './ISessionStore';
import Session from '../../entities/Session';
import {ID} from 'entities/Common';
import AppType from 'entities/AppType';
import {Platform} from 'entities/Platform';
import SessionModel, {SessionSchema} from '../../models/SessionModel';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import AvikastError from '../../../AvikastError';
import {mapSessionFromModel, mapSessionToModel} from '../../models/Mappers';

export default class SessionStore extends ISessionStore {
  constructor(
    @InjectModel(SessionSchema.name) private sessionModel: Model<SessionModel>,
  ) {
    super();
  }

  async createSession(
    user: {id: string},
    token: string,
    refreshToken: string,
    appType: AppType,
    platform: Platform,
  ) {
    let newSession = await this.sessionModel.create(
      mapSessionToModel(user.id, refreshToken, token, appType, platform),
    );
    newSession = await newSession.populate('user');
    return mapSessionFromModel(newSession);
  }

  async getSession(session: {id: string}) {
    const newSession = await this.sessionModel.findOne({_id: session.id});
    return newSession ? mapSessionFromModel(newSession) : undefined;
  }

  async getSessionOrFail(sessionId: ID) {
    const session = await this.sessionModel.findOne({_id: sessionId});
    if (!session) throw new AvikastError('Session not exists');
    return mapSessionFromModel(session);
  }

  async getSessionByToken(token: string) {
    const session = await this.sessionModel.findOne({token});
    return session ? mapSessionFromModel(session) : undefined;
  }

  async getSessionByTokenOrThrow(token: string) {
    const session = await this.sessionModel.findOne({token});
    if (!session) throw new AvikastError('Session not found');
    return mapSessionFromModel(session);
  }

  async getSessionByRefreshToken(refreshToken: string) {
    const session = await this.sessionModel.findOne({refreshToken});
    return session ? mapSessionFromModel(session) : undefined;
  }

  async updateSession(
    session: {id: string},
    token: string,
    refreshToken: string,
  ): Promise<Session> {
    await this.sessionModel.update({_id: session.id}, {token, refreshToken});
    return this.getSessionOrFail(session.id);
  }

  async updateFirebaseToken(session: {id: string}, registrationId: string) {
    await this.sessionModel.update(
      {_id: session.id},
      {firebaseRegistrationId: registrationId},
    );
  }
}
