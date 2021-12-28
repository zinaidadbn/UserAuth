import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import axios from 'axios';

import {LOGIN_API} from '../../../shared/api';
import {useStore} from '../../../store';
import {appColors} from '../../../shared/styles/variables';
import {OutlinedInput} from '../../../shared/components/OutlinedInput';
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
  const {
    actions: {setToken},
  } = useStore();

  const [username, onChangeUsername] = useState<string>('');
  const [password, onChangePassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationErr, setValidationErr] = useState<string>('');
  const [responseErr, setResponseErr] = useState<string>('');

  useEffect(() => {
    // removes Toast displaying
    if (responseErr) {
      let timer = setTimeout(() => setResponseErr(''), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [responseErr]);

  const onSubmit = () => {
    if (!username || !password) {
      setValidationErr('This field is required');
      return;
    } else {
      setValidationErr('');
    }

    setIsLoading(true);

    const requestOptions = {
      headers: {'Content-Type': 'application/json'},
      // body: JSON.stringify({
      //   username,
      //   password,
      // }),
    };

    axios
      .get(LOGIN_API, requestOptions)
      .then(res => {
        if (res.status === 200) {
          (() => setToken(res.data.token))();
          // (() => setToken(JSON.parse((res as any)._bodyText).token))();
        } else {
          setResponseErr('Wrong username or password');
        }
      })
      .catch(() => setResponseErr('Wrong username or password'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isUsernameErr = !!validationErr && !username;
  const isPasswordErr = !!validationErr && !password;

  return (
    <>
      <Toast isVisible={!!responseErr}>
        <ToastText>{responseErr}</ToastText>
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
          <PressableContainer onPress={onSubmit} disabled={isLoading}>
            {({pressed}) => (
              <StyledView pressed={pressed}>
                {isLoading ? (
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
