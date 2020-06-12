export default interface Message {
  id: string;
  senderId: string;
  roomId: string;
  body: string;
  date: string;
  receiverId: string | undefined;
}
