import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';

import {appColors} from '../../../shared/styles/variables';
import {OutlinedInput} from '../../../shared/components/OutlinedInput';
import {useApi} from '../../../shared/hooks/useApi';
import {
  Toast,
  ToastText,
  Container,
  Wrapper,
  PressableContainer,
  ButtonText,
  StyledView,
  Logo,
} from './styles';

export const LoginScreen: React.FC = () => {
  const {loginRequest, responseLoginErr, isLoginLoading, setResponseLoginErr} =
    useApi();

  const [username, onChangeUsername] = useState<string>('John.doe@nfq.lt');
  const [password, onChangePassword] = useState<string>('Johndoe');
  const [validationErr, setValidationErr] = useState<string>('');

  useEffect(() => {
    // removes Toast displaying
    if (responseLoginErr) {
      let timer = setTimeout(() => setResponseLoginErr(''), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [responseLoginErr, setResponseLoginErr]);

  const onSubmit = async () => {
    if (!username || !password) {
      setValidationErr('This field is required');
      return;
    } else {
      setValidationErr('');
    }

    await loginRequest({username, password});
  };

  const isUsernameErr = !!validationErr && !username;
  const isPasswordErr = !!validationErr && !password;

  return (
    <>
      <Toast isVisible={!!responseLoginErr}>
        <ToastText>{responseLoginErr}</ToastText>
      </Toast>
      <Container>
        <Logo source={require('../../../../assets/imgs/logo.jpeg')} />
        <OutlinedInput
          value={username}
          onChangeText={onChangeUsername}
          placeholder={'Enter Username'}
          isError={isUsernameErr}
          errorText={validationErr}
        />
        <OutlinedInput
          value={password}
          onChangeText={onChangePassword}
          placeholder={'Enter Password'}
          isError={isPasswordErr}
          errorText={validationErr}
        />
        <Wrapper>
          <PressableContainer onPress={onSubmit} disabled={isLoginLoading}>
            {({pressed}) => (
              <StyledView pressed={pressed}>
                {isLoginLoading ? (
                  <ActivityIndicator color={appColors.white} />
                ) : (
                  <ButtonText>Submit</ButtonText>
                )}
              </StyledView>
            )}
          </PressableContainer>
        </Wrapper>
      </Container>
    </>
  );
};
