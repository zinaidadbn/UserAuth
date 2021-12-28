import styled from 'styled-components/native';

import {appColors} from '../../../shared/styles/variables';

export const Toast = styled.View`
  background-color: ${appColors.error};
  opacity: ${({isVisible}: {isVisible: boolean}) => (isVisible ? '0.8' : '0')};
  position: absolute;
  top: 10%;
  left: 15%;
  right: 15%;
  padding: 10px 20px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const ToastText = styled.Text`
  color: ${appColors.white};
  font-size: 15px;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const Logo = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  margin-bottom: 5px;
`;

export const PressableContainer = styled.Pressable`
  width: 100%;
`;

export const StyledView = styled.View`
  background-color: ${appColors.violet};
  opacity: ${({pressed}: {pressed: boolean}) => (pressed ? '0.8' : '1')};
  padding: 10px 30px;

  align-self: stretch;
  height: 60px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${appColors.white};
  font-size: 15px;
  font-weight: bold;
`;

export const Wrapper = styled.View`
  margin-top: 20px;
  width: 100%;
`;
