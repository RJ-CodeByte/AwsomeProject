// state API response
interface StateRes {
  _id: string;
  name: string;
  shortName: string;
}

// verify otp request
interface IVerifyOtpReq {
  otp: string;
  userId: string;
}

// sent otp request
interface IReSentOtpReq {
  email: string;
}
