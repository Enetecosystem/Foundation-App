import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e: any) {
    console.log(e, ":::Error storing data");
    throw new Error("Error saving data to local storage");
  }
};

export const getData = async (
  key: string,
  isObject?: boolean,
): Promise<Record<string, any> | string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return isObject ? JSON.parse(value) : value;
  } catch (e: any) {
    console.log(e, ":::Error reading data");
    throw new Error(e.message ?? e.toString());
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e: any) {
    console.log(e.message ?? e.tostring(), ":::Error removing item");
    throw new Error(e.message ?? e.tostring());
  }
};
