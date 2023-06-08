/* eslint-disable no-useless-catch */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export const groupCreate = async (groupName: string) => {
  try {
    const storedGroups = await groupsGetAll();

    const groupAlreadyExists = storedGroups.includes(groupName);

    if (groupAlreadyExists) {
      throw new AppError("Group already exists");
    }

    const storage = JSON.stringify([...storedGroups, groupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
};
