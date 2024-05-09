import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {IMAGES} from '../constants';

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
  },
});

const AppBgImage = ({children}: React.PropsWithChildren): React.JSX.Element => {
  const image = IMAGES.appBackgroundImage;
  return (
    <ImageBackground source={image} style={styles.imageStyle}>
      {children}
    </ImageBackground>
  );
};

export default React.memo(AppBgImage);
