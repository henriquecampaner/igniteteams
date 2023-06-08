/* eslint-disable no-useless-catch */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PLAYER_COLLECTION } from "../storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playersGetByGroup } from "./playersGetByGroup";

export const playerAddByGroup = async (
  newPlayer: PlayerStorageDTO,
  group: string
) => {
  try {
    const storedPlayers = await playersGetByGroup(group);

    const playerExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerExists.length > 0) {
      throw new AppError("Player already exists");
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
};
