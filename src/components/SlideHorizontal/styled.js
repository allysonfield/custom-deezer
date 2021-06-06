import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Content = styled.View`
  /* justify-content: center; */

  align-items: center;
  width: ${RFValue(190)}px;
  /* height: ${RFValue(300)}px; */

  margin-right: ${RFValue(20)}px;
`;

export const List = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-left: ${RFValue(28)}px;
`;
