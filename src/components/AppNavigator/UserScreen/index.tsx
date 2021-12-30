import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';

import {appColors} from '../../../shared/styles/variables';
import {useApi} from '../../../shared/hooks/useApi';
import {useStore} from '../../../store';

import {Container, UserImg, UserText} from './styles';

export const UserScreen: React.FC = () => {
  const {userRequest, user} = useApi();
  const {
    state: {token},
  } = useStore();

  useEffect(() => {
    (async () => {
      await userRequest();
    })();
  }, [token, userRequest]);

  if (!user) {
    return (
      <Container>
        <ActivityIndicator color={appColors.violet} size={'large'} />
      </Container>
    );
  }

  return (
    <Container>
      <UserImg source={{uri: user.image}} />
      <UserText>{user.firstName + ' ' + user.lastName}</UserText>
      <UserText>{user.address}</UserText>
      <UserText>{user.phone}</UserText>
    </Container>
  );
};
