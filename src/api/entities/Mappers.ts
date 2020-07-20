import AuthResponse from 'entities/AuthResponse';
import ApiAuthResponse from './AuthResponse';
import User from 'entities/User';
import ApiUser from './User';
import Session from 'entities/Session';
import ApiSession from './Session';

export const mapUserToApi = (user: User): ApiUser => ({
  id: user.id,
  avatarUrl: user.avatarUrl,
  city: user.city,
  country: user.country,
  dateOfBirth: user.dateOfBirth,
  email: user.email,
  name: user.name,
  referralCode: user.referralCode,
  skills: user.skills,
  tags: user.tags,
});

export const mapSessionToApi = (session: Session): ApiSession => ({
  jwt: session.jwt,
  refreshToken: session.refreshToken,
});

export const mapAuthResponseToApi = (response: AuthResponse): ApiAuthResponse => ({
  ...mapSessionToApi(response),
  user: mapUserToApi(response.user),
});
