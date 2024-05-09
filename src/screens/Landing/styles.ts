import {FlexAlignType} from 'react-native';
import {Alignment, CommonColors, FONTWEIGHT, Value} from '../../constants';
import {
  SCREEN_WIDTH,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../utils/responsive';

export default {
  upperText: {
    fontSize: fontPixel(Value.CONSTANT_VALUE_24),
    marginBottom: heightPixel(Value.CONSTANT_VALUE_20),
    fontWeight: FONTWEIGHT.FONTWEIGHT_700,
    color: CommonColors.text,
    marginLeft: widthPixel(Value.CONSTANT_VALUE_20),
  },
  touch: {
    borderWidth: heightPixel(Value.CONSTANT_VALUE_1),
    borderColor: CommonColors.gray_550,
    borderRadius: widthPixel(Value.CONSTANT_VALUE_20),
    alignItems: Alignment.CENTER as FlexAlignType,
  },
  containerStyle: {
    borderRadius: Value.CONSTANT_VALUE_16,
    marginTop: heightPixel(Value.CONSTANT_VALUE_20),
    width: SCREEN_WIDTH - widthPixel(Value.CONSTANT_VALUE_150),
    height: heightPixel(Value.CONSTANT_VALUE_200),
  },
  mainStyle: {
    borderRadius: widthPixel(Value.CONSTANT_VALUE_80),
    resizeMode: Alignment.CONTAIN,
    width: SCREEN_WIDTH / Value.CONSTANT_VALUE_3,
    height: heightPixel(Value.CONSTANT_VALUE_200),
  },
  name: {
    color: CommonColors.text,
    marginVertical: heightPixel(Value.CONSTANT_VALUE_20),
  },
};
