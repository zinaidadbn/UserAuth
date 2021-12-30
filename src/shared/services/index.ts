import axios from 'axios';

import {LOGIN_API, USER_API} from '../api';
import {User} from '../interfaces/user';
import {getDataFromStorage} from '../helpers';
import {TOKEN} from '../consts';

interface LoginData {
  username: string;
  password: string;
}

export const apiService = {
  login: ({username, password}: LoginData) => {
    const requestOptions = {
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username,
        password,
      }),
    };

    return axios.post<{token: string}>(LOGIN_API, requestOptions);
  },
  getUser: async () => {
    const payload = await getDataFromStorage(TOKEN);
    return axios.get<User>(USER_API, {
      params: {
        headers: {Authorization: 'Bearer ' + payload ? payload : null},
      },
    });
  },
};
