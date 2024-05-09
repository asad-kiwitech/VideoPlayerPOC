import React from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Alignment, CommonColors, Prencentage, Value} from '../constants';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  heightPixel,
  widthPixel,
} from '../utils/responsive';
import {useOrientationContext} from '../context/useOrientation';
type ModalProps = {
  children: React.ReactNode;
  isVisible: boolean;
  onCloseSheet: () => void;
  snapPoint?: number;
};
const AppModal = ({
  isVisible,
  children,
  onCloseSheet,
  snapPoint = 250,
}: ModalProps): React.ReactNode => {
  const translateY = React.useRef(new Animated.Value(snapPoint)).current;
  React.useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: Value.CONSTANT_VALUE_0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: snapPoint,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > Value.CONSTANT_VALUE_0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > Value.CONSTANT_VALUE_50) {
          onCloseSheet();
        } else {
          Animated.spring(translateY, {
            toValue: Value.CONSTANT_VALUE_0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;
  const {inPortrait} = useOrientationContext();
  if (isVisible) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        supportedOrientations={['portrait', 'landscape']}
        visible={isVisible}
        onRequestClose={onCloseSheet}>
        <View style={[StyleSheet.absoluteFill]}>
          <TouchableWithoutFeedback onPress={onCloseSheet}>
            <View
              style={[
                {
                  zIndex: Value.CONSTANT_VALUE_9999,
                  backgroundColor: Alignment.TRANSPARENT,
                  height: !inPortrait
                    ? SCREEN_WIDTH - heightPixel(snapPoint)
                    : SCREEN_HEIGHT - heightPixel(snapPoint),
                },
              ]}
            />
          </TouchableWithoutFeedback>
          <View style={styles.sheetContainer}>
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.innerContainer,
                {height: heightPixel(snapPoint)},
                {
                  transform: [{translateY}],
                },
              ]}>
              <View
                style={[
                  styles.innerContainer,
                  {height: heightPixel(snapPoint)},
                ]}>
                <View style={styles.handleIndicatorStyle} />
                {children}
              </View>
            </Animated.View>
          </View>
        </View>
      </Modal>
    );
  }
  return null;
};

export default AppModal;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: Value.CONSTANT_VALUE_1,
    width: Prencentage.PRECENTAGE_100,
    height: Prencentage.PRECENTAGE_100,
    backgroundColor: Alignment.TRANSPARENT,
    justifyContent: Alignment.FLEXEND,
    paddingBottom: heightPixel(Value.CONSTANT_VALUE_48),
    shadowColor: 'rgba(24, 26, 32, 0.15)',
    shadowOffset: {
      width: Value.CONSTANT_VALUE_0,
      height: Value.CONSTANT_VALUE_48,
    },
    shadowOpacity: Value.CONSTANT_VALUE_015,
    shadowRadius: Value.CONSTANT_VALUE_29,
    elevation: Value.CONSTANT_VALUE_10,
    position: Alignment.ABSOLUTE,
  },
  innerContainer: {
    alignSelf: Alignment.CENTER,
    backgroundColor: CommonColors.base_white,
    borderTopStartRadius: widthPixel(Value.CONSTANT_VALUE_24),
    borderTopEndRadius: widthPixel(Value.CONSTANT_VALUE_24),
    shadowOffset: {
      width: Value.CONSTANT_VALUE_0,
      height: heightPixel(Value.CONSTANT_VALUE_12),
    },
    shadowOpacity: Value.CONSTANT_VALUE_029,
    shadowRadius: Value.CONSTANT_VALUE_16,
    width: SCREEN_WIDTH,
    position: Alignment.ABSOLUTE,
    paddingHorizontal: widthPixel(Value.CONSTANT_VALUE_20),
    overflow: Alignment.HIDDEN,
  },
  handleIndicatorStyle: {
    alignSelf: Alignment.CENTER,
    marginBottom: heightPixel(Value.CONSTANT_VALUE_25),
    marginTop: heightPixel(15),
    backgroundColor: CommonColors.middleTitle,
    width: widthPixel(Value.CONSTANT_VALUE_60),
    opacity: Value.CONSTANT_VALUE_FRAC20,
    height: heightPixel(Value.CONSTANT_VALUE_4),
    borderRadius: Value.CONSTANT_VALUE_30,
  },
});
