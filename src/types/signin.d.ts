// Login API Request
interface ILogInReq {
  email: string;
  password: string;
  deviceId: string;
  deviceType: string;
  deviceToken: string;
}
interface State {
  _id: string;
  name: string;
}
// login response
interface UserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  phoneNumber: string;
  city: string;
  stateId: string;
  state: State;
  profile: string;
  isSubscribed: boolean;
  isDeleted: boolean;
  isActive: boolean;
  otpExpireAt: string;
  otp: number;
  signupStep: number;
  guideBlogLink: string;
  bio: string;
  isProfilePalateComplete: boolean;
  isSendNotification: number;
  userType: number;
  favourites: any[];
  shortcuts: any[];
  notificationSoundId: string | null;
  notificationSettings: NotificationSetting[];
  isNotificationSoundEnabled: boolean;
  createdAt: string;
  updatedAt:string;
  planLogId: string;
  
  accessToken: string;
  lng: number | null;
  lat: number | null;
}
//  logout request
interface ILogOutReq {
  deviceId: string;
}
// log out response
interface ILogOutRes {
  status: number;
  message: string;
  data: {};
}
