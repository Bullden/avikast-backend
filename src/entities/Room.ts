export enum RoomType {
  Meeting = 'Meeting',
  Webinar = 'Webinar',
}

export default interface Room {
  id: string;
  name: string;
  inviteLink: string;
  type: RoomType;
}
