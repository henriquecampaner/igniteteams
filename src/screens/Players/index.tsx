import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
};

const Players = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const newPlayerInputRef = useRef<TextInput>(null);

  const { group } = route?.params as RouteParams;

  const [team, setTeam] = useState("Team A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [player, setPlayer] = useState("");

  async function handleAddPlayer() {
    if (player.trim().length === 0) {
      return Alert.alert("New Player", "Please, enter a valid name");
    }

    const newPlayer = {
      name: player,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      // newPlayerInputRef.current;

      setPlayer("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New Player", error.message);
      }

      Alert.alert("New Player", "An error has occurred, please try again");
      console.log(error);
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team);

      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert("New Player", "An error has occurred, please try again");
      console.log(error);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);

      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert("New Player", "An error has occurred, please try again");
      console.log(error);
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);

      navigation.navigate("groups");
    } catch (error) {
      Alert.alert("New Player", "An error has occurred, please try again");
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remove Group", "Are you sure you want to remove this group?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await groupRemove();
        },
      },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subTitle="Add Players and separate the teams" />

      <Form>
        <Input
          placeholder="Player Name"
          autoCorrect={false}
          onChangeText={setPlayer}
          value={player}
          inputRef={newPlayerInputRef}
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Team A", "Team B"]}
          keyExtractor={(item) => item}
          horizontal
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <NumberOfPlayers>
          {players.length} {players.length === 1 ? "Player" : "Players"}
        </NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={({ name }) => name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ListEmpty message="There is no players on this team" />
        }
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title="Remove Group"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
};

export { Players };
