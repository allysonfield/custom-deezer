import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '~/styles/colors';

const styles = StyleSheet.create({
  albums: {
    alignSelf: 'flex-start',
    marginBottom: RFValue(20),
    marginLeft: RFValue(28),
    marginTop: RFValue(30),
  },
  buttonFavorites: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderColor: colors.WHITE,
    borderRadius: 5,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: RFValue(28),
    width: RFValue(200),
  },
  liker: {
    marginLeft: 5,
    tintColor: colors.WHITE,
  },
  musicas: {
    alignSelf: 'flex-start',
    marginBottom: RFValue(20),
    marginLeft: RFValue(28),
  },
});

export default styles;
