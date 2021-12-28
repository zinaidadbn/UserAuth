import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import styled from 'styled-components/native';

import {appColors} from '../../styles/variables';

const StyledView = styled.View`
  opacity: ${({pressed}: {pressed: boolean}) => (pressed ? '0.8' : '1')};
  padding: 15px 5px;
`;

const ButtonText = styled.Text`
  color: ${({color}: {color?: string}) => color ?? appColors.violet};
  font-size: 15px;
  font-weight: bold;
`;

interface IProps extends PressableProps {
  title: string;
  titleColor?: string;
}

export const InlineButton: React.FC<IProps> = ({
  title,
  titleColor,
  ...rest
}) => {
  return (
    <Pressable {...rest}>
      {({pressed}) => (
        <StyledView pressed={pressed}>
          <ButtonText color={titleColor}>{title}</ButtonText>
        </StyledView>
      )}
    </Pressable>
  );
};
