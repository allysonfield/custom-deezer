import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Content = styled.View`
  width: ${RFValue(150)}px;
  margin-right: ${RFValue(25)}px;
  text-align: center;
  margin-bottom: 20px;
`;

export const List = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-left: ${RFValue(28)}px;
`;
