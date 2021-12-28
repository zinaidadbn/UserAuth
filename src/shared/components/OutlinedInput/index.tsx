import React, {JSXElementConstructor} from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

import {appColors} from '../../styles/variables';

export const InputWrapper = styled.View`
  width: 100%;
  margin-top: 15px;
  margin-bottom: ${({isError}: {isError: boolean}) => (isError ? 0 : '15px')};
`;

export const Input: JSXElementConstructor<InputType> = styled.TextInput.attrs({
  placeholderTextColor: `${appColors.grey}`,
})`
  border: ${({isError}: {isError: boolean}) =>
    `1.5px solid ${isError ? appColors.error : appColors.grey}`};
  font-size: 15px;
  font-weight: bold;
  color: ${appColors.black};
  border-radius: 8px;
  padding: 15px 20px;
  width: 100%;
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  color: ${appColors.error};
  align-self: flex-end;
`;

interface IProps extends TextInputProps {
  isError: boolean;
  errorText: string;
}

type InputType = Omit<IProps, 'errorText'>;

export const OutlinedInput: React.FC<IProps> = ({
  isError,
  errorText,
  ...rest
}) => {
  return (
    <InputWrapper isError={isError}>
      <Input isError={isError} {...rest} />
      {isError && <ErrorText>{errorText}</ErrorText>}
    </InputWrapper>
  );
};
