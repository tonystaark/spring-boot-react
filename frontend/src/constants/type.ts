export interface IDefaultState {
  signInSuccess: boolean,
  username: string
}

export type IStringRecord = Record<string, string>;
export type INumberRecord = Record<string, number>


export interface ILoginInfo{
  username: string,
  password: string
};

export interface ILoginCommonConfig {
  minLength: string,
  minLowerCase : string,
  minUpperCase : string,
  minSpecialCharacter : string,
  minNumericalCharacter : string,
}

;

export interface IUsernameConfig {
  username: ILoginCommonConfig
}

export interface IPasswordConfig {
  password: ILoginCommonConfig
}
