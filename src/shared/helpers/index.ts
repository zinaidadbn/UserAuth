import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDataToStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('ERROR saving data to Storage >', e);
  }
};

export const getDataFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('ERROR getting data from Storage >', e);
  }
};
