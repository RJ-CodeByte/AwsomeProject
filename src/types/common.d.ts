// state API response
interface Pokemon {
  name: string;
  url:string;
  type: string;
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

interface PokemonTypes {
  slot: number
  type: PokemonType[]
}

interface PokemonType {
  name?: string
  url: string
}
