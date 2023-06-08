import { TouchableOpacityProps } from "react-native";

import { Container, Text, ButtonTypeStyleProps } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeStyleProps;
};

const Button = ({ title, type = "PRIMARY", ...rest }: ButtonProps) => {
  return (
    <Container {...rest} type={type}>
      <Text>{title}</Text>
    </Container>
  );
};

export { Button };
