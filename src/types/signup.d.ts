// Signup API Request
interface ISignUpReq {
  firstName: string;
  lastName: string;
  birthdate: string;
  city: string;
  stateId: string;
  email?: string;
  phoneNumber: string;
  password?: string;
  deviceId: string;
  deviceType: string;
  deviceToken: string;
  userType: number;
  guideBlogLink?: string;
  bio?: string;
  userId?: string;
  lat: number;
  lng: number;
}

interface State {
  _id: string;
  name: string;
}

interface NotificationSetting {
  type: string;
  name: string;
  setting: boolean | number;
}

// upload profile photo api request
interface FileType {
  name: string;
  uri: string;
  type: string;
}

interface IUploadProfileReq {
  profile: FileType[];
  userType: number;
}

interface NotificationSettings {
  _id: string;
  goatGrubCommunication: boolean;
  goatCommunication: boolean;
  favoriteCommunication: boolean;
  favoriteCommunicationMsgCenter: boolean;
  goatDeals: boolean;
  goatGuides: boolean;
  allLocalDeals: boolean;
  favoriteDeals: boolean;
  localOnly: boolean;
  communicationDuration: number;
  communicationEndDate: string;
  createdAt: string;
  updatedAt: string;
}
