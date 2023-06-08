import { Container, Message } from "./style";

interface ListEmptyProps {
  message?: string;
}

const ListEmpty = ({ message }: ListEmptyProps) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export { ListEmpty };
