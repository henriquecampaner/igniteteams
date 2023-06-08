import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "./styles";

type InputProps = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
};

const Input = ({ inputRef, ...props }: InputProps) => {
  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef}
      {...props}
      placeholderTextColor={COLORS.GRAY_300}
    />
  );
};

export { Input };
