import { Container, Title, SubTitle } from "./styles";

interface HighlightProps {
  title: string;
  subTitle: string;
}

const Highlight = ({ subTitle, title }: HighlightProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </Container>
  );
};

export { Highlight };
