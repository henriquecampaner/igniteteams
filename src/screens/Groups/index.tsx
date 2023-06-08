import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Container } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { groupsGetAll } from "@storage/group/groupsGetAll";

const Groups = () => {
  const navigation = useNavigation();

  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function loadGroups() {
    try {
      const data = await groupsGetAll();

      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      loadGroups();
    }, [])
  );

  return (
    <Container>
      <Header />

      <Highlight subTitle="Play with your friends" title="Groups" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard onPress={() => handleOpenGroup(item)} title={item} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={<ListEmpty message="There is no data to show" />}
      />

      <Button title="Create Group" onPress={handleNewGroup} />
    </Container>
  );
};

export { Groups };
