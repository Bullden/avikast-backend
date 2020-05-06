import User from '../entities/User';
import UserModel from './UserModel';

export const mapToUserModel = (user: Partial<User>): Partial<UserModel> => ({
  name: user.name,
  email: user.email,
  allowNotifications: user.allowNotifications,
});

export const mapFromUserModel = (user: UserModel): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  allowNotifications: user.allowNotifications,
});
