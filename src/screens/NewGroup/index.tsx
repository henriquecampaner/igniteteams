import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { groupCreate } from "@storage/group";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

const NewGroup = () => {
  const navigation = useNavigation();

  const [group, setGroup] = useState("");

  async function handleNew() {
    if (group.trim().length === 0) {
      return Alert.alert("New Group", "Please enter a group name");
    }

    try {
      await groupCreate(group);

      return navigation.navigate("players", {
        group,
      });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New Group", error.message);

        return;
      }
      Alert.alert("New Group", "An error has occurred, please try again later");
      console.log(error);
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="New Group"
          subTitle="Create a new group to add participants"
        />

        <Input placeholder="Group name" onChangeText={setGroup} />

        <Button
          onPress={handleNew}
          title="Create"
          style={{
            marginTop: 24,
          }}
        />
      </Content>
    </Container>
  );
};

export { NewGroup };
