import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};
export async function clearLocalStorage() {
  try {
    await AsyncStorage.clear();
    console.log('localStorage cleared successfully');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}
        
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error(error);
  }
};

export default{storeData, getData, clearLocalStorage};