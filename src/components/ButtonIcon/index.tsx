import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, Icon, ButtonIconTypeStyledProps } from "./styles";

interface ButtonIconProps extends TouchableOpacityProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStyledProps;
}

const ButtonIcon = ({ icon, type = "PRIMARY", ...props }: ButtonIconProps) => {
  return (
    <Container {...props}>
      <Icon name={icon} type={type} />
    </Container>
  );
};

export { ButtonIcon };
