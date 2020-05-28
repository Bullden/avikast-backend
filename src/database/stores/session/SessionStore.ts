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

  private populate = {
    path: 'user',
    populate: {path: 'referrer'},
  };

  async createSession(
    user: {id: string},
    token: string,
    refreshToken: string,
    appType: AppType,
    platform: Platform,
  ) {
    const newSession = await this.sessionModel.create(
      mapSessionToModel(user.id, refreshToken, token, appType, platform),
    );
    return mapSessionFromModel(await newSession.populate(this.populate).execPopulate());
  }

  async getSession(session: {id: string}) {
    const newSession = await this.sessionModel
      .findOne({_id: session.id})
      .populate(this.populate);
    return newSession ? mapSessionFromModel(newSession) : undefined;
  }

  async getSessionOrFail(sessionId: ID) {
    const session = await this.sessionModel
      .findOne({_id: sessionId})
      .populate(this.populate);
    if (!session) throw new AvikastError('Session not exists');
    return mapSessionFromModel(session);
  }

  async getSessionByToken(token: string) {
    const session = await this.sessionModel.findOne({token}).populate(this.populate);
    return session ? mapSessionFromModel(session) : undefined;
  }

  async getSessionByTokenOrThrow(token: string) {
    const session = await this.sessionModel.findOne({token}).populate(this.populate);
    if (!session) throw new AvikastError('Session not found');
    return mapSessionFromModel(session);
  }

  async getSessionByRefreshToken(refreshToken: string) {
    const session = await this.sessionModel
      .findOne({refreshToken})
      .populate(this.populate);
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
