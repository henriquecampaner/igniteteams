/* eslint-disable no-useless-catch */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export const groupRemoveByName = async (groupName: string) => {
  try {
    const stored = await groupsGetAll();

    const filteredStorage = stored.filter((group) => group !== groupName);

    const groups = JSON.stringify(filteredStorage);

    await AsyncStorage.setItem(GROUP_COLLECTION, groups);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);
  } catch (error) {
    throw error;
  }
};
