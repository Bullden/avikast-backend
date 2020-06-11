export default interface Message {
  id: string;
  senderId: string;
  chatId: string;
  body: string;
  date: string;
  receiverId: string | undefined;
}
