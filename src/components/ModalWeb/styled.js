import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  padding: ${RFValue(75.53)}px ${RFValue(10)}px ${RFValue(5)}px ${RFValue(10)}px;
  justify-content: center;
  align-items: center;
  background: ${colors.MAIN};
`;

export const ContainerImage = styled.View`
  margin-bottom: ${RFValue(64.54)}px;
`;
