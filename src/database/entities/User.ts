import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  constructor(
    id: string,
    name: string,
    email: string,
    allowNotifications: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.allowNotifications = allowNotifications;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  allowNotifications: boolean;
}
