import React from 'react';
import {
  View,
  Button,
  Image,
  Text,
  StatusBar,
  Alert,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import VideoPlayer from '../../components/videoLibrary/VideoPlayer';
import {
  CommonColors,
  IMAGES,
  preDefinedSpeedTrack,
  resolutionType,
  preDefinedSpeedTrackType,
  Value,
} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import AppBgImage from '../../components/appBgImage';
import {styles} from './styles';
import {useNetwork} from '../../context/NetworkContext';
import {useOrientationContext} from '../../context/useOrientation';
import AppModal from '../../components/appModal';
import VideoDescription from '../../components/videoDescription';
import {ListView} from '../../components/listView';
import {fontPixel, heightPixel} from '../../utils/responsive';
import {
  extractAvailableResolutions,
  getLocalVideoPath,
} from '../../utils/commonFunction';

const Home = ({route}: any) => {
  const {movie} = route.params;
  const navigation = useNavigation();
  const {inPortrait, lockToPortrait, lockToLandscape} = useOrientationContext();
  const localVideoPath = getLocalVideoPath(movie?.id);
  const videoPlayerRef = React.useRef<VideoPlayer>(null);
  const [resolutions, setResolutions] = React.useState<any>([
    {label: 'Auto', resolutionValue: {type: 'auto'}, image: IMAGES.quality},
  ]);
  const [subtitleEnable, setSubtitleEnable] = React.useState(false);
  const [speedTrack, setSpeedTrack] = React.useState<{
    id: number;
    speed: number;
    name: string;
  }>(preDefinedSpeedTrack[1]);
  const [savedPlaybackPosition, setSavedPlaybackPosition] =
    React.useState<number>(0);
  const [currentResolution, setCurrentResolution] = React.useState({
    label: 'Auto',
    resolutionValue: {type: 'resolution', value: 720},
    image: IMAGES.quality,
  });
  const {isConnected} = useNetwork();
  const [settingVisible, setSettingVisible] = React.useState<boolean>(false);
  const [playBackVisible, setPlayBackVisible] = React.useState<boolean>(false);
  const [playBackChange, setPlaybackChange] = React.useState<boolean>(false);
  const [resolutionVisible, setResolutionVisible] =
    React.useState<boolean>(false);
  const [showDescription, setShowDescription] = React.useState<boolean>(true);
  const [videoResizeMode, setVideoResizeMode] =
    React.useState<string>('contain');
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false);
  const [videoExists, setVideoExists] = React.useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = React.useState<boolean>(false);
  const [showContinueDialog, setShowContinueDialog] =
    React.useState<boolean>(false);
  React.useEffect(() => {
    if (!isConnected) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection',
      );
    }
  }, [isConnected]);
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (inPortrait) {
          savePlaybackDuration();
          videoPlayerRef.current?.methods?.togglePlayPause();
          navigation.goBack();
        } else {
          lockToPortrait();
          setShowDescription(true);
          setVideoResizeMode('contain');
        }
        return true;
      },
    );
    return () => backHandler.remove();
  }, [inPortrait]);

  React.useEffect(() => {
    checkFile();
    getAvailableResolutions(movie?.uri);
    videoPlayerRef.current?.player?.ref?.seek(savedPlaybackPosition);
  }, [movie?.uri, savedPlaybackPosition]);

  React.useEffect(() => {
    checkSavedPlaybackDurationSet();
  }, [movie.id]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      savePlaybackDuration();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [savedPlaybackPosition]);

  React.useEffect(() => {
    checkSavedPlaybackDuration();
  }, [movie.id]);
  const checkFile = React.useCallback(async () => {
    const exists = await RNFetchBlob.fs.exists(localVideoPath);
    if (exists) {
      setVideoExists(true);
      setIsDownloaded(true);
    }
  }, [localVideoPath]);
  const downloadVideo = React.useCallback(async () => {
    try {
      setIsDownloading(true);
      const outputFile = localVideoPath;
      const command = `-i ${movie?.uri} -c copy -bsf:a aac_adtstoasc ${outputFile}`;
      await FFmpegKit.execute(command).then(async session => {
        const returnCode = await session.getReturnCode();
        if (ReturnCode.isSuccess(returnCode)) {
          setIsDownloaded(true);
        }
        setIsDownloading(false);
      });
    } catch (error) {
      console.error('Error downloading video:', error);
      setIsDownloading(false);
    }
  }, [localVideoPath, movie?.uri]);

  const getAvailableResolutions = React.useCallback(
    async (url: string) => {
      try {
        const response = await fetch(url);
        const playlistContent = await response.text();
        const filenameMatch = /([^/]+\.m3u8)$/.exec(url);
        const filename = filenameMatch ? filenameMatch[1] : '';
        const filenameWithoutExtension = filename.replace('.m3u8', '');
        const lines = playlistContent.split('\n');
        const resolutionLines = lines.filter(line =>
          line.includes('RESOLUTION'),
        );
        const availableResolutions = extractAvailableResolutions(
          resolutionLines,
          url,
          filename,
          filenameWithoutExtension,
        );
        setResolutions([...availableResolutions, ...resolutions]);
      } catch (error) {
        return [];
      }
    },
    [resolutions],
  );

  const checkSavedPlaybackDurationSet = React.useCallback(async () => {
    try {
      const key = `playbackDuration_${movie.id}`;
      const savedDuration = await AsyncStorage.getItem(key);
      if (savedDuration) {
        const savedPosition = parseFloat(savedDuration);
        setSavedPlaybackPosition(savedPosition);
        videoPlayerRef.current?.player?.ref?.seek(savedPosition);
      }
    } catch (error) {
      return error;
    }
  }, [movie.id]);

  const savePlaybackDuration = React.useCallback(async () => {
    if (videoPlayerRef.current) {
      const currentPosition = videoPlayerRef.current.state?.currentTime || 0;
      try {
        const key = `playbackDuration_${movie.id}`;
        await AsyncStorage.setItem(key, currentPosition.toString());
      } catch (error) {
        console.error('Error saving playback duration:', error);
      }
    }
  }, [movie.id]);

  const cleanId = React.useCallback(async () => {
    try {
      const key = `playbackDuration_${movie.id}`;
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error while removing item:', error);
    }
  }, [movie.id]);

  const clearSavedPlaybackDuration = React.useCallback(async () => {
    if (videoPlayerRef.current) {
      const totalDuration = videoPlayerRef.current.state?.duration || 0;
      if (totalDuration > 0) {
        try {
          await cleanId();
        } catch (error) {
          console.error('Error clearing saved playback duration:', error);
        }
      }
    }
  }, [videoPlayerRef, cleanId]);

  const forwardVideo = React.useCallback(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current?.player?.ref?.seek(
        videoPlayerRef.current.state?.currentTime + 10,
      );
      savePlaybackDuration();
    }
  }, [savePlaybackDuration]);

  const reverseVideo = React.useCallback(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current?.player?.ref?.seek(
        Math.max(0, videoPlayerRef.current.state?.currentTime - 10),
      );
      savePlaybackDuration();
    }
  }, [savePlaybackDuration]);
  const checkSavedPlaybackDuration = React.useCallback(async () => {
    try {
      const key = `playbackDuration_${movie.id}`;
      const savedDuration = await AsyncStorage.getItem(key);
      if (savedDuration) {
        videoPlayerRef.current?.methods?.togglePlayPause();
        setShowContinueDialog(true);
        handleContinueOption(true);
      }
    } catch (error) {
      console.error('Error checking saved playback duration:', error);
    }
  }, [movie.id]);

  const handleContinueOption = React.useCallback(
    (continuePlayback: boolean) => {
      if (continuePlayback) {
        videoPlayerRef.current?.player?.ref?.seek(savedPlaybackPosition);
      } else {
        cleanId();
        setSavedPlaybackPosition(0);
        videoPlayerRef.current?.player?.ref?.seek(0);
      }
      setShowContinueDialog(false);
    },
    [cleanId, savedPlaybackPosition],
  );
  const handleExist = React.useCallback(() => {
    Alert.alert('Delete video', 'Are you sure you want to delete the video?', [
      {
        text: 'Yes',
        onPress: () => {
          RNFetchBlob.fs.unlink(localVideoPath).then(() => {
            setSettingVisible(false);
            navigation.goBack();
          });
        },
      },
      {text: 'No'},
    ]);
  }, [localVideoPath, navigation]);
  const onEnterFullscreen = React.useCallback((): void => {
    lockToLandscape();
    setShowDescription(false);
    setVideoResizeMode('cover');
  }, []);
  const onExitFullScreen = React.useCallback((): void => {
    lockToPortrait();
    setShowDescription(true);
    setVideoResizeMode('contain');
  }, []);
  const handleResolutionChange = React.useCallback((resolution: any) => {
    if (videoPlayerRef.current) {
      setSavedPlaybackPosition(videoPlayerRef.current.state?.currentTime || 0);
    }
    setCurrentResolution(resolution);
    setResolutionVisible(false);
  }, []);
  const handleSpeed = React.useCallback((e: any) => {
    if (videoPlayerRef.current) {
      setSavedPlaybackPosition(videoPlayerRef.current.state?.currentTime || 0);
      videoPlayerRef.current?.methods?.togglePause();
    }
    setSpeedTrack(e);
    setPlayBackVisible(false);
    setPlaybackChange(true);
  }, []);

  return (
    <AppBgImage>
      <StatusBar hidden={!showDescription} />
      <VideoPlayer
        subtitleTextStyle={{
          fontSize: fontPixel(Value.CONSTANT_VALUE_15),
          padding: heightPixel(Value.CONSTANT_VALUE_5),
        }}
        key={currentResolution.label && speedTrack?.speed}
        ref={videoPlayerRef}
        source={{
          uri: videoExists ? localVideoPath : movie?.uri,
        }}
        pictureInPicture={true}
        playInBackground={false}
        onEnterFullscreen={onEnterFullscreen}
        onExitFullscreen={onExitFullScreen}
        style={styles.videoPlayer as ViewStyle}
        controls={false}
        disableVolume={true}
        paused={showContinueDialog}
        showContinueDialog={showContinueDialog}
        resizeMode={videoResizeMode}
        rate={speedTrack?.speed}
        navigator={navigation}
        renderAskWatch={() => {
          if (showContinueDialog) {
            return (
              <View>
                <Text style={{color: CommonColors.background}}>
                  Do you want to continue from where you left off?
                </Text>
                <Button
                  title="Continue"
                  onPress={() => handleContinueOption(true)}
                />
                <Button
                  title="Start from Beginning"
                  onPress={() => handleContinueOption(false)}
                />
              </View>
            );
          }
        }}
        onError={(e: any) => console.log(e, 'error here')}
        onSeekFunc={() => savePlaybackDuration()}
        forward={forwardVideo}
        reverse={reverseVideo}
        onLoad={() => {
          videoPlayerRef.current?.player?.ref?.seek(savedPlaybackPosition);
          if (playBackChange) {
            setTimeout(() => {
              videoPlayerRef.current?.methods?.togglePlayPause();
              setPlaybackChange(false);
            }, 1500);
          } else {
            videoPlayerRef.current?.methods?.togglePlayPause();
          }
        }}
        handleTenSecondsLeftCallback={() => {
          clearSavedPlaybackDuration();
        }}
        inPortrait={inPortrait}
        onBack={() => {
          Orientation.getOrientation(orientation => {
            if (orientation !== OrientationType.PORTRAIT) {
              Orientation.lockToPortrait();
              setShowDescription(true);
              setVideoResizeMode('contain');
            } else {
              savePlaybackDuration();
              videoPlayerRef.current?.methods?.togglePlayPause();
              navigation.goBack();
            }
          });
        }}
        custom={true}
        selectedTextTrack={{type: 'language', value: 'en'}}
        selectedVideoTrack={currentResolution.resolutionValue}
        subtitleEnable={subtitleEnable}
        renderResolution={() => (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSubtitleEnable(!subtitleEnable);
              }}>
              <Image
                style={styles.settingIcon}
                source={
                  subtitleEnable
                    ? IMAGES.SubtitleIcon
                    : IMAGES.SubtitleDisableIcon
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSettingVisible(true);
              }}>
              <Image style={styles.settingIcon} source={IMAGES.settingIcon} />
            </TouchableOpacity>
          </>
        )}
      />
      {showDescription && <VideoDescription movie={movie} />}
      {settingVisible && (
        <AppModal
          isVisible={settingVisible}
          onCloseSheet={() => {
            setSettingVisible(false);
          }}
          snapPoint={Value.CONSTANT_VALUE_250}>
          <>
            {!isDownloaded && (
              <ListView
                label="Quality"
                img={IMAGES.quality}
                onPress={() => {
                  setSettingVisible(false);
                  setResolutionVisible(true);
                }}
                leftText={currentResolution.label}
              />
            )}
            <ListView
              label="Playback Speed"
              img={IMAGES.playBackSpeedIcon}
              onPress={() => {
                setSettingVisible(false);
                setPlayBackVisible(true);
              }}
              leftText={speedTrack.name}
            />
            <ListView
              label="Download Video"
              img={isDownloaded ? IMAGES.checked : IMAGES.dowloaded}
              isLoading={isDownloading}
              onPress={isDownloaded ? handleExist : downloadVideo}
            />
          </>
        </AppModal>
      )}
      {resolutionVisible && (
        <AppModal
          isVisible={resolutionVisible}
          onCloseSheet={() => {
            setResolutionVisible(false);
          }}
          snapPoint={Value.CONSTANT_VALUE_250}>
          <ScrollView>
            {resolutions.map((item: resolutionType) => (
              <ListView
                label={item.label}
                key={item.label}
                selected={
                  item.resolutionValue === currentResolution.resolutionValue
                }
                onPress={() => handleResolutionChange(item)}
              />
            ))}
          </ScrollView>
        </AppModal>
      )}
      {playBackVisible && (
        <AppModal
          isVisible={playBackVisible}
          onCloseSheet={() => {
            setPlayBackVisible(false);
          }}
          snapPoint={Value.CONSTANT_VALUE_300}>
          <ScrollView>
            {preDefinedSpeedTrack.map((item: preDefinedSpeedTrackType) => (
              <ListView
                label={item.name}
                key={item.name}
                selected={item === speedTrack}
                onPress={() => handleSpeed(item)}
              />
            ))}
          </ScrollView>
        </AppModal>
      )}
    </AppBgImage>
  );
};

export default React.memo(Home);
