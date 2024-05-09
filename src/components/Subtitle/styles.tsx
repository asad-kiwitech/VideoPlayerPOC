import {StyleSheet} from 'react-native';
import {fontPixel, heightPixel} from '../../utils/responsive';
import {Alignment, CommonColors} from '../../constants';

export const styles = StyleSheet.create({
  textStyleDefault: {
    fontSize: fontPixel(25),
    color: CommonColors.base_white,
    textAlign: Alignment.CENTER,
    alignSelf: Alignment.CENTER,
    padding: heightPixel(25),
    backgroundColor: 'rgba(0,0,0,.6)',
    textShadowColor: '#000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
});
