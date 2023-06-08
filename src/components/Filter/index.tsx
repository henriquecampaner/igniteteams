import { TouchableOpacityProps } from "react-native";
import { Container, FilterStyledProps, Title } from "./styles";

type FilterProps = TouchableOpacityProps &
  FilterStyledProps & {
    title: string;
  };

const Filter = ({ title, isActive = false, ...props }: FilterProps) => {
  return (
    <Container {...props} isActive={isActive}>
      <Title>{title}</Title>
    </Container>
  );
};

export { Filter };
