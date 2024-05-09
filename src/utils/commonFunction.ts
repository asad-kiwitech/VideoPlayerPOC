import {showMessage} from 'react-native-flash-message';
import {CommonColors, IMAGES, Value} from '../constants';
import {heightPixel} from './responsive';
import RNFetchBlob from 'react-native-blob-util';

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
export const getLocalVideoPath = (movieId: number): string => {
  return `${RNFetchBlob.fs.dirs.DocumentDir}/${movieId}.mp4`;
};
export const checkFileExists = async (filePath: string): Promise<boolean> => {
  try {
    const exists = await RNFetchBlob.fs.exists(filePath);
    return exists;
  } catch (error) {
    console.error('Error checking file existence:', error);
    return false;
  }
};
type SuccessCallback = () => void;
type ErrorCallback = (error: Error) => void;
export const deleteFile = (
  filePath: string,
  onSuccess: SuccessCallback,
  onError: ErrorCallback,
): void => {
  RNFetchBlob.fs
    .unlink(filePath)
    .then(() => {
      onSuccess();
    })
    .catch(error => {
      console.error('Error deleting file:', error);
      onError(error);
    });
};

export const extractAvailableResolutions = (
  resolutionLines: string[],
  url: string,
  filename: string,
  filenameWithoutExtension: string,
) => {
  const reversedLines = resolutionLines.slice().reverse(); // Make a copy and reverse it
  const availableResolutions = reversedLines
    .map(line => {
      const match = /RESOLUTION=(\d+)x(\d+)/.exec(line);
      const height = match ? parseInt(match[2], 10) : null;
      return height
        ? {
            label: `${height}p`,
            resolutionValue: {type: 'resolution', value: height},
            image: IMAGES.quality,
            url: url.replace(
              filename,
              `${filenameWithoutExtension}_${height}.m3u8`,
            ),
          }
        : null;
    })
    .filter(resolution => resolution !== null);
  return availableResolutions;
};
