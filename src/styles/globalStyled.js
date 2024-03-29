import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import colors from './colors';
import fonts from './fonts';

export const TextWhiteRegular24px = styled.Text`
  font-family: ${fonts.MEDIUM};
  font-size: ${RFValue(24)}px;
  color: ${colors.WHITE};
`;

export const TextWhiteRegular16px = styled.Text`
  font-family: ${fonts.REGULAR};
  font-size: ${RFValue(16)}px;
  color: ${colors.WHITE};
`;

export const TextWhiteRegular18px = styled.Text`
  font-family: ${fonts.REGULAR};
  font-size: ${RFValue(18)}px;
  color: ${colors.WHITE};
`;

export const TextWhiteRegular19px = styled.Text`
  font-family: ${fonts.REGULAR};
  font-size: ${RFValue(19)}px;
  color: ${colors.WHITE};
`;

export const TextBlueRegular10px = styled.Text`
  font-family: ${fonts.REGULAR};
  font-size: ${RFValue(10)}px;
  color: ${colors.BLUE};
`;

export const TextBlueRegular12px = styled.Text`
  font-family: ${fonts.REGULAR};
  font-size: ${RFValue(12)}px;
  color: ${colors.BLUE};
`;

export const TextBlueRegular19px = styled.Text`
  font-family: ${fonts.REGULAR};
  font-size: ${RFValue(19)}px;
  color: ${colors.BLUE};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ marginBottom }) => `margin-bottom: ${marginBottom}`}
  ${({ marginTop }) => `margin-top: ${marginTop}`}
  ${({ paddingLeft }) => `padding-left: ${paddingLeft}`}
  ${({ paddingRight }) => `padding-right: ${paddingRight}`}
  ${({ width }) => `width: ${width}`}
  ${({ justifyContent }) =>
    justifyContent
      ? `justify-content: ${justifyContent}`
      : 'justify-content: center'}
  ${({ alignItems }) =>
    alignItems ? `align-items: ${alignItems}` : 'align-items: center'}
`;
