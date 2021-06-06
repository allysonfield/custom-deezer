import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  padding: 0 ${RFValue(25)}px;
  background: ${colors.MAIN};
  justify-content: center;
  align-items: center;
`;
