import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useStore} from '../../store';

import {LoginScreen} from './LoginScreen';
import {UserScreen} from './UserScreen';

import {InlineButton} from '../../shared/components/InlineButton';

export type AppStackParams = {
  LoginScreen: undefined;
  UserScreen: undefined;
};

const AppNavigator: React.FC = () => {
  const AppStack = createNativeStackNavigator<AppStackParams>();

  const {
    state: {token},
    actions: {getToken, removeToken},
  } = useStore();

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onLogout = useCallback(() => {
    removeToken();
  }, [removeToken]);

  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName={'LoginScreen'}
        screenOptions={{headerShown: false}}>
        {token ? (
          <AppStack.Screen
            name="UserScreen"
            component={UserScreen}
            options={{
              headerShown: true,
              headerTitle: '',
              headerRight: () => {
                return <InlineButton title={'Logout'} onPress={onLogout} />;
              },
            }}
          />
        ) : (
          <AppStack.Screen name="LoginScreen" component={LoginScreen} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
