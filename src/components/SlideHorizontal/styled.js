import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Content = styled.View`
  /* justify-content: center; */
  flex: 1;
  elevation: 1;
  align-items: center;
  width: ${RFValue(190)}px;
  height: ${RFValue(242.39)}px;
  ${({ i }) => i === 0 && `margin-left: ${RFValue(28)}px;`}
  ${({ length, i }) =>
    length === i + 1
      ? `margin-right: ${RFValue(20)}px;`
      : `margin-right: ${RFValue(28)}px`}
      margin-bottom: ${RFValue(100)}px;
`;

export const Foreground = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  background: #000;
  opacity: 0.2;
`;
