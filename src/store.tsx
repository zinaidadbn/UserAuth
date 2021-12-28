import React, {createContext, useContext, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getDataFromStorage, saveDataToStorage} from './shared/helpers';
import {TOKEN} from './shared/consts';

interface State {
  token: string | null;
}

interface Actions {
  getToken: () => void;
  setToken: (payload: string) => Promise<void>;
  removeToken: () => void;
}

export type ActionType = {
  type: string;
  payload: string;
};

const initialState: State = {
  token: null,
};

export enum ActionTypes {
  SET_TOKEN = 'SET_TOKEN',
  GET_TOKEN = 'GET_TOKEN',
  REMOVE_TOKEN = 'REMOVE_TOKEN',
}

export const AppStore = createContext<{
  state: State;
  actions: Actions;
  // @ts-ignore
}>({state: initialState, actions: () => null});

export function useStore() {
  return useContext(AppStore);
}

function reducer(state: State, action: ActionType) {
  switch (action.type) {
    case ActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ActionTypes.REMOVE_TOKEN:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}
const mapDispatchToActions = (dispatch: React.Dispatch<any>): Actions => ({
  getToken: async () => {
    const payload = await getDataFromStorage(TOKEN);
    if (payload) {
      return dispatch({type: ActionTypes.SET_TOKEN, payload});
    }
  },
  setToken: async (payload: string) => {
    await saveDataToStorage(TOKEN, payload);
    return dispatch({type: ActionTypes.SET_TOKEN, payload});
  },
  removeToken: () => {
    (() => AsyncStorage.removeItem(TOKEN))();
    return dispatch({type: ActionTypes.REMOVE_TOKEN});
  },
});

export function StoreProvider({children}: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = mapDispatchToActions(dispatch);
  const value = {state, actions};
  return <AppStore.Provider value={value}>{children}</AppStore.Provider>;
}
