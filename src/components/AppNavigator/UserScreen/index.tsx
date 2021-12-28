import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import axios from 'axios';

import {USER_API} from '../../../shared/api';
import {appColors} from '../../../shared/styles/variables';
import {User} from '../../../shared/interfaces/user';
import {useStore} from '../../../store';

import {Container, UserImg, UserText} from './styles';

export const UserScreen: React.FC = () => {
  const {
    state: {token},
  } = useStore();

  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    axios
      .get(USER_API, {
        params: {
          headers: {Authorization: 'Bearer ' + token},
        },
      })
      .then(res => {
        if (res.status === 200) {
          setUser(res.data);
          // setUser(JSON.parse((res as any)._bodyText));
        } else {
          setUser(undefined);
        }
      })
      .catch(() => setUser(undefined));
  }, [token]);

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
