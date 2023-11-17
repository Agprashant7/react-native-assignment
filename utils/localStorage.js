import AsyncStorage from '@react-native-async-storage/async-storage';

/// storing data
export const set = async (key, value) => {
  try {
   const data= await AsyncStorage.setItem(key, JSON.stringify(value));
   console.log('set',data);
  } catch (error) {
    console.log(error);
  }
};

export const get = async key => {
  try {
    const userData = JSON.parse(await AsyncStorage.getItem(key));
    
    console.log("local storage",key+":",userData);
    return userData
  } catch (error) {
    console.log(error);
  }
};

export const remove = async key => {
  try {
    const userData = JSON.parse(await AsyncStorage.removeItem(key));
  } catch (error) {
    console.log(error);
  }
};
