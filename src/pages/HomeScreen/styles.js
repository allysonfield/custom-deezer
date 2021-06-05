import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  albums: {
    alignSelf: 'flex-start',
    marginBottom: RFValue(20),
    marginLeft: RFValue(28),
    marginTop: RFValue(30),
  },
  musicas: {
    alignSelf: 'flex-start',
    marginBottom: RFValue(20),
    marginLeft: RFValue(28),
  },
});

export default styles;
