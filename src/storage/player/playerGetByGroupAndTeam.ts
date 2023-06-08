/* eslint-disable no-useless-catch */
import { playersGetByGroup } from "./playersGetByGroup";

export const playerGetByGroupAndTeam = async (group: string, team: string) => {
  try {
    const storedPlayers = await playersGetByGroup(group);

    const players = storedPlayers.filter((player) => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
};
