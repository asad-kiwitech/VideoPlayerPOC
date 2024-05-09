import FlashMessage, {showMessage} from 'react-native-flash-message';
import {CommonColors, Value} from '../constants';
import {heightPixel} from './responsive';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const removeAndroidAppPath = (originalPath: string) => {
  const androidAppPath = '/Android/data/com.videoplayermx/files';
  const index = originalPath.indexOf(androidAppPath);

  if (index !== -1) {
    // Remove the Android app-specific path
    const modifiedPath = originalPath.substring(0, index);

    return `${modifiedPath}/Download`;
  } // If the Android app-specific path is not found, return the original path

  return originalPath;
};

export const ToastHandler = (
  message: any,
  isSuccess: boolean,
  top: number,
): void => {
  const messageText =
    typeof message === 'string' ? message : JSON.stringify(message);
  return showMessage({
    message: messageText,
    description: '',
    color: CommonColors.almost_black,
    style: {
      height: heightPixel(Value.CONSTANT_VALUE_60) + top,
      bottom: heightPixel(Value.CONSTANT_VALUE_20),
    },
    duration: Value.CONSTANT_VALUE_3000,
    type: isSuccess ? 'success' : 'danger',
  });
};
