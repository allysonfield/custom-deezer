import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  padding: ${RFValue(35.86)}px 0;
  background: ${colors.MAIN};
  align-items: center;
`;

export const Content = styled.ScrollView`
  height: 100%;
  flex: 1;
`;
