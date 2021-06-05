import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const Container = styled.View`
  width: 88%;
  padding: 0 ${RFValue(10)}px;
  justify-content: space-between;
  align-items: center;
  background: ${colors.WHITE};
  align-self: center;
  flex-direction: row;
  border-radius: 20px;
  margin-bottom: ${RFValue(34.76)}px;
`;

export const Input = styled.TextInput`
  text-align: justify;
  width: 90%;
`;
