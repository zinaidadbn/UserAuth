import styled from 'styled-components/native';

import {appColors} from '../../../shared/styles/variables';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const UserImg = styled.Image`
  width: 350px;
  height: 350px;
  border-radius: 20px;
`;

export const UserText = styled.Text`
  color: ${appColors.black};
  margin-top: 20px;
  font-size: 15px;
  font-weight: bold;
`;
