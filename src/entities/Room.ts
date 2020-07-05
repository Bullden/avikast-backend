export enum RoomType {
  Meeting = 'Meeting',
  Webinar = 'Webinar',
}

export default interface Room {
  id: string;
  name: string;
  inviteLink: string;
  type: RoomType;
  webinarOptions?: WebinarOptions;
}
export type WebinarOptions = {
  viewMode: ViewModeEnum;
  viewModeScale: ViewModeScale;
};

export enum ViewModeEnum {
  CameraAndScreen = 'CameraAndScreen',
  CameraMain = 'CameraMain',
  ScreenMain = 'ScreenMain',
  None = 'None',
}

export enum ViewModeScale {
  oneX = '1x',
  twoX = '2x',
  threeX = '3x',
}
