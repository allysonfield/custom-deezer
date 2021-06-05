import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, StyleSheet, Image, Text } from 'react-native';

// import globalStyles from '~/styles/globalStyles';
import fonts from '~/styles/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

const MenuTab = (props) => {
  const usuario = useSelector((state) => state.usuario);
  const [icon, setIcon] = useState(null);
  const [icon2, setIcon2] = useState(null);

  useEffect(() => {
    switch (props.name) {

      case 'home': {
        setIcon(require('~/images/unidades.png'));
        setIcon2(require('~/images/unidades.png'));
        break;
      }

      default:
        setIcon(null);
        setIcon2(null);
    }
  }, [usuario]);

  return (
    <TouchableOpacity
      style={styles.menuContainer}
      onPress={props.onPress}
      // accessibilityState={isFocused ? { selected: true } : {}}
    >
      {props.accessibilityState.selected ? (
        <Image
          source={icon2}
          style={{
            ...styles.img,

            ...(props.name === 'perfil' ? styles.imgPerfil : {}),

            // ...(props.accessibilityState.selected ? { backgroundColor: '#323278' } : { backgroundColor: null })
          }}
        />
      ) : (
        <Image
          source={icon}
          style={{
            ...styles.img,
            ...(props.name === 'perfil'
              ? { ...styles.imgPerfil, ...styles.imgPerfilInativo }
              : {}),

            // ...(props.accessibilityState.selected ? { backgroundColor: '#323278' } : { backgroundColor: null })
          }}
        />
      )}

      <Text
        numberOfLines={1}
        style={{
          ...styles.label,
          ...(props.accessibilityState.selected
            ? { fontWeight: '400' }
            : { fontWeight: '200' }),
        }}
      >
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuTab;

const styles = StyleSheet.create({
  img: {
    height: RFValue(23),
    marginBottom: RFValue(3),
    resizeMode: 'contain',
    width: RFValue(23),
  },
  imgPerfil: {
    borderRadius: 100,
    resizeMode: 'cover',
  },
  imgPerfilInativo: {
    opacity: 0.2,
  },
  label: {
    fontFamily: fonts.REGULAR,
    fontSize: RFValue(12),
    lineHeight: RFValue(14),
    textAlign: 'center',
    textAlignVertical: 'center',

    width: '100%',
  },
  menuContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
  },
});
