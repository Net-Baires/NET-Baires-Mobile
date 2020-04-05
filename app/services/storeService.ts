import AsyncStorage from '@react-native-community/async-storage'

export const storeData = async (key:StoreKeys , data:string) => {
    try {
      await AsyncStorage.setItem(key.toString(),data)
    } catch (e) {
        console.error(e);
    }
  }
  export const removeData = async (key:StoreKeys) => {
    try {
      await AsyncStorage.removeItem(key.toString())
    } catch (e) {
        console.error(e);
    }
  }

  export const getData = async (key:StoreKeys ) => {
    try {
      const value = await AsyncStorage.getItem(key.toString())
      return value;
    } catch(e) {
      console.error(e);
    }
  }
  export enum StoreKeys{
      LoginToken
  }