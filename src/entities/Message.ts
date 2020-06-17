import {ID} from './Common';
import User from './User';

// export default class Message {
//   constructor(
//     id: ID,
//     sender: User,
//     roomId: string,
//     body: string,
//     date: string,
//     receiverId: string | undefined,
//   ) {
//     this.id = id;
//     this.sender = sender;
//     this.roomId = roomId;
//     this.body = body;
//     this.date = date;
//     this.receiverId = receiverId;
//   }
//
//   id: ID;
//
//   sender: User;
//
//   roomId: string;
//
//   body: string;
//
//   date: string;
//
//   receiverId: string | undefined;
// }

export default interface Message {
  id: ID;
  sender: User;
  roomId: string;
  body: string;
  date: string;
  receiverId: string | undefined;
}
