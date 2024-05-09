import {FlexAlignType} from 'react-native';
import {Alignment, CommonColors, FONTWEIGHT, Value} from '../../constants';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../utils/responsive';

export const styles = {
  container: {
    flex: Value.CONSTANT_VALUE_1,
  },
  videoPlayer: {
    height: SCREEN_WIDTH / SCREEN_HEIGHT,
    width: '100%',
  },
  resolutionMenu: {
    position: Alignment.ABSOLUTE,
    zIndex: Value.CONSTANT_VALUE_9999,
    alignSelf: Alignment.CENTER,
    width: widthPixel(Value.CONSTANT_VALUE_100),
    marginTop: heightPixel(Value.CONSTANT_VALUE_30),
    right: widthPixel(Value.CONSTANT_VALUE_240),
  },
  movieTitle: {
    fontSize: fontPixel(Value.CONSTANT_VALUE_20),
    fontWeight: FONTWEIGHT.FONTWEIGHT_700,
    color: CommonColors.text,
    marginBottom: heightPixel(Value.CONSTANT_VALUE_8),
    marginTop: heightPixel(Value.CONSTANT_VALUE_20),
  },
  movieDescription: {
    fontSize: fontPixel(Value.CONSTANT_VALUE_16),
    color: CommonColors.text,
    marginBottom: heightPixel(Value.CONSTANT_VALUE_8),
    fontWeight: FONTWEIGHT.FONTWEIGHT_400,
  },
  movieRating: {
    fontSize: fontPixel(Value.CONSTANT_VALUE_16),
    marginBottom: heightPixel(Value.CONSTANT_VALUE_8),
    color: CommonColors.text,
    fontWeight: FONTWEIGHT.FONTWEIGHT_400,
  },
  castLabel: {
    fontSize: fontPixel(Value.CONSTANT_VALUE_16),
    color: CommonColors.text,
    fontWeight: FONTWEIGHT.FONTWEIGHT_700,
    marginBottom: heightPixel(Value.CONSTANT_VALUE_4),
  },
  scrollView: {
    height: SCREEN_HEIGHT / Value.CONSTANT_VALUE_5,
    borderTopLeftRadius: Value.CONSTANT_VALUE_20,
    borderTopRightRadius: Value.CONSTANT_VALUE_20,
    paddingHorizontal: widthPixel(Value.CONSTANT_VALUE_20),
  },
  castContainer: {
    flexDirection: Alignment.ROW as FlexAlignType,
    flexWrap: 'wrap',
    marginBottom: heightPixel(Value.CONSTANT_VALUE_8),
  },
  castName: {
    fontSize: Value.CONSTANT_VALUE_14,
    color: CommonColors.text,
    fontWeight: FONTWEIGHT.FONTWEIGHT_400,
    marginRight: widthPixel(Value.CONSTANT_VALUE_8),
  },
  imdbRating: {
    fontSize: fontPixel(Value.CONSTANT_VALUE_16),
    color: CommonColors.text,
    fontWeight: FONTWEIGHT.FONTWEIGHT_400,
    marginBottom: heightPixel(Value.CONSTANT_VALUE_20),
  },
  dropdown: {
    margin: heightPixel(Value.CONSTANT_VALUE_8),
    height: heightPixel(Value.CONSTANT_VALUE_30),
    width: widthPixel(Value.CONSTANT_VALUE_90),
    backgroundColor: CommonColors.base_white,
    borderRadius: widthPixel(Value.CONSTANT_VALUE_22),
    paddingHorizontal: widthPixel(Value.CONSTANT_VALUE_8),
  },
  imageStyle: {
    width: widthPixel(Value.CONSTANT_VALUE_24),
    height: heightPixel(Value.CONSTANT_VALUE_24),
    borderRadius: widthPixel(Value.CONSTANT_VALUE_12),
    tintColor: CommonColors.base_white,
  },
  placeholderStyle: {
    fontSize: fontPixel(Value.CONSTANT_VALUE_16),
    color: CommonColors.base_white,
    fontWeight: FONTWEIGHT.FONTWEIGHT_400,
  },
  selectedTextStyle: {
    fontSize: fontPixel(Value.CONSTANT_VALUE_16),
    marginLeft: widthPixel(Value.CONSTANT_VALUE_8),
    color: CommonColors.text,
    fontWeight: FONTWEIGHT.FONTWEIGHT_400,
  },
  iconStyle: {
    width: widthPixel(Value.CONSTANT_VALUE_20),
    height: heightPixel(Value.CONSTANT_VALUE_20),
  },
  listView: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingHorizontal: widthPixel(Value.CONSTANT_VALUE_20),
    paddingVertical: heightPixel(Value.CONSTANT_VALUE_10),
    borderBottomWidth: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  listIcon: {
    height: heightPixel(Value.CONSTANT_VALUE_20),
    width: widthPixel(Value.CONSTANT_VALUE_20),
    marginRight: widthPixel(Value.CONSTANT_VALUE_15),
  },
  label: {
    fontSize: fontPixel(Value.CONSTANT_VALUE_14),
    marginLeft: widthPixel(Value.CONSTANT_VALUE_15),
    color: CommonColors.text,
  },
  settingIcon: {
    height: heightPixel(Value.CONSTANT_VALUE_30),
    width: widthPixel(Value.CONSTANT_VALUE_30),
    marginRight: widthPixel(Value.CONSTANT_VALUE_15),
  },
};
