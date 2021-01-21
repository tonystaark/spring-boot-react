import { IStringRecord, INumberRecord }  from '../constants/type'
import { loggedInUserLocalStorage } from '../constants/index'

export const parseStringToNumberBaseTen = (str: string):number => parseInt(str, 10);

export const checkMatchedRegexOccurrence = (str: string, regex: RegExp):number => {
  if(str.match(regex)) {
    return str.match(regex)!.length
  } else {
    return 0
  }
}

export const convertObjStringValuesToNumber = (stringRecord:  IStringRecord):INumberRecord  => {
  const parseFromStringToNumber: INumberRecord = {};
  for(let key in stringRecord) {
    if (Object.prototype.hasOwnProperty.call(stringRecord, key)) {
      //@ts-ignore
      parseFromStringToNumber[key] =  parseStringToNumberBaseTen(stringRecord[key]);
    }
  }
  return parseFromStringToNumber
}

export const getJWTTokenFromLocalStorage = (): string => {
  const localStorageItem = localStorage.getItem(loggedInUserLocalStorage)
  return localStorageItem && JSON.parse(localStorageItem).accessToken
}