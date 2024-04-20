// state API response
interface Pokemon {
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


interface Pokemon {
  name: string;
  url: string;
}

interface PokemonTypes {
  slot?: number
  type: PokemonType
}

interface PokemonType {
  name?: string
  url: string
}
