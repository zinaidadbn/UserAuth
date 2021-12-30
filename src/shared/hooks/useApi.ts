import {useState} from 'react';

import {useStore} from '../../store';
import {apiService} from '../services';
import {User} from '../interfaces/user';

export const useApi = () => {
  const {
    actions: {setToken},
  } = useStore();

  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [responseLoginErr, setResponseLoginErr] = useState<string>('');

  const [user, setUser] = useState<User | undefined>(undefined);

  const loginRequest = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setIsLoginLoading(true);
    try {
      const res = await apiService.login({username, password});
      if (res.status === 200) {
        setToken(res.data.token).catch();
        // (() => setToken(JSON.parse((res as any)._bodyText).token))();
      } else {
        setResponseLoginErr('Wrong username or password');
      }
    } catch (e) {
      setResponseLoginErr('Something went wrong');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const userRequest = async () => {
    try {
      const res = await apiService.getUser();
      if (res.status === 200) {
        setUser(res.data);
        // setUser(JSON.parse((res as any)._bodyText));
      } else {
        setUser(undefined);
      }
    } catch (e) {
      setUser(undefined);
    }
  };

  return {
    loginRequest,
    isLoginLoading,
    setResponseLoginErr,
    responseLoginErr,
    userRequest,
    user,
  };
};
