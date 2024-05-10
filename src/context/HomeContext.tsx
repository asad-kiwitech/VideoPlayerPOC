// HomeContext.tsx
import React, {createContext} from 'react';
import {useOrientationContext} from './useOrientation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  checkFileExists,
  deleteFile,
  executeFFmpegCommand,
  extractAvailableResolutions,
  getLocalVideoPath,
} from '../utils/commonFunction';
import VideoPlayer from '../components/videoLibrary/VideoPlayer';
import {useNetwork} from './NetworkContext';
import {IMAGES, preDefinedSpeedTrack} from '../constants';
import {Alert, BackHandler} from 'react-native';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video, {VideoProperties} from 'react-native-video';
interface Movies {
  id: number;
  uri: string;
}
interface HomeContextType {
  navigation: ReturnType<typeof useNavigation>;
  inPortrait: string;
  videoPlayerRef: React.RefObject<Video & VideoPlayer & VideoProperties>;
  resolutions: any[];
  subtitleEnable: boolean;
  speedTrack: {id: number; speed: number; name: string};
  savedPlaybackPosition: number;
  currentResolution: {
    label: string;
    resolutionValue: {type: string; value: number};
    image: any;
  };
  isConnected: boolean;
  settingVisible: boolean;
  playBackVisible: boolean;
  resolutionVisible: boolean;
  showDescription: boolean;
  videoResizeMode: string;
  isDownloading: boolean;
  videoExists: boolean;
  isDownloaded: boolean;
  showContinueDialog: boolean;
  checkFile: () => Promise<void>;
  downloadVideo: () => Promise<void>;
  getAvailableResolutions: (url: string) => Promise<never[] | undefined>;
  savePlaybackDuration: () => Promise<void>;
  cleanId: () => Promise<void>;
  clearSavedPlaybackDuration: () => Promise<void>;
  forwardVideo: () => void;
  reverseVideo: () => void;
  checkSavedPlaybackDuration: () => Promise<unknown>;
  handleContinueOption: (continuePlayback: boolean) => void;
  handleExist: () => void;
  onEnterFullscreen: () => void;
  onExitFullScreen: () => void;
  handleResolutionChange: (resolution: any) => void;
  handleSpeed: (e: any) => void;
  onHandleChangeOption: (value: boolean) => void;
  onLoad: () => void;
  onBack: () => void;
  onSubtitleEnable: () => void;
  onSettingChange: (value: boolean) => void;
  onResolutionStateChange: (value: boolean) => void;
  onPlayBackStateChange: (value: boolean) => void;
  onDownloadVideo: () => void;
  setDownloadingState: (val: boolean) => void;
  movie: Movies;
  localVideoPath: string;
}

export const HomeContext = createContext({} as HomeContextType);

interface HomeProviderProps {
  children: React.ReactNode;
}

export const HomeProvider: React.FC<HomeProviderProps> = ({children}) => {
  const route = useRoute();
  const {movie} = route.params as {movie: Movies};

  const navigation = useNavigation();
  const {inPortrait, lockToPortrait, lockToLandscape} = useOrientationContext();
  const localVideoPath = getLocalVideoPath(movie?.id);
  console.log(localVideoPath);

  const videoPlayerRef = React.useRef<Video & VideoPlayer & VideoProperties>(
    null,
  );
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

  const setDownloadingState = React.useCallback((val: boolean) => {
    setIsDownloaded(val);
  }, []);
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
  }, [movie.id, videoPlayerRef.current]);
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
  const checkFile = React.useCallback(async () => {
    const exists = await checkFileExists(localVideoPath);
    if (exists) {
      setVideoExists(true);
      setDownloadingState(true);
    }
  }, [localVideoPath]);

  const checkSavedPlaybackDuration = React.useCallback(async () => {
    try {
      const key = `playbackDuration_${movie.id}`;
      const savedDuration = await AsyncStorage.getItem(key);
      if (savedDuration) {
        videoPlayerRef.current?.methods?.togglePause();
        const savedPosition = parseFloat(savedDuration);
        setSavedPlaybackPosition(savedPosition);
        videoPlayerRef.current?.player?.ref?.seek(savedPosition);
        await new Promise(resolve => setTimeout(resolve, 400));
        // setShowContinueDialog(true); // Uncomment this for asking start from begining or contiue where you left
      }
    } catch (error) {
      return error;
    }
  }, [movie.id, videoPlayerRef.current]);

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
  }, [inPortrait, videoPlayerRef.current]);

  React.useEffect(() => {
    checkFile();
    getAvailableResolutions(movie?.uri);
    videoPlayerRef.current?.player?.ref?.seek(savedPlaybackPosition);
  }, [movie?.uri, savedPlaybackPosition, videoPlayerRef.current]);
  React.useEffect(() => {
    checkSavedPlaybackDuration();
  }, [movie.id]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      savePlaybackDuration();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [savedPlaybackPosition]);

  const downloadVideo = React.useCallback(async () => {
    try {
      setIsDownloading(true);
      const outputFile = localVideoPath;
      const command = `-i ${movie?.uri} -c copy -bsf:a aac_adtstoasc ${outputFile}`;
      await executeFFmpegCommand(
        command,
        () => {
          setDownloadingState(true);
          setDownloadingState(false);
        },
        () => {
          setDownloadingState(false);
        },
      );
    } catch (error) {
      console.error('Error downloading video:', error);
      setDownloadingState(false);
    }
  }, [localVideoPath, movie?.uri]);

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
  }, [videoPlayerRef.current]);
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
    [savedPlaybackPosition, videoPlayerRef.current],
  );
  const forwardVideo = React.useCallback(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current?.player?.ref?.seek(
        videoPlayerRef.current.state?.currentTime + 10,
      );
      savePlaybackDuration();
    }
  }, [videoPlayerRef.current]);

  const reverseVideo = React.useCallback(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current?.player?.ref?.seek(
        Math.max(0, videoPlayerRef.current.state?.currentTime - 10),
      );
      savePlaybackDuration();
    }
  }, [videoPlayerRef.current]);
  const onSettingChange = React.useCallback((value: boolean) => {
    setSettingVisible(value);
  }, []);

  const handleExist = React.useCallback(() => {
    Alert.alert('Delete video', 'Are you sure you want to delete the video?', [
      {
        text: 'Yes',
        onPress: () => {
          deleteFile(
            localVideoPath,
            () => {
              onSettingChange(false);
              navigation.goBack();
            },
            () => {},
          );
        },
      },
      {text: 'No'},
    ]);
  }, [localVideoPath]);
  const onEnterFullscreen = React.useCallback((): void => {
    lockToLandscape();
    setShowDescription(false);
    setVideoResizeMode('cover');
  }, [lockToLandscape]);
  const onExitFullScreen = React.useCallback((): void => {
    lockToPortrait();
    setShowDescription(true);
    setVideoResizeMode('contain');
  }, [lockToPortrait]);
  const onResolutionStateChange = React.useCallback((value: boolean) => {
    setResolutionVisible(value);
  }, []);
  const handleResolutionChange = React.useCallback(
    (resolution: any) => {
      if (videoPlayerRef.current) {
        setSavedPlaybackPosition(
          videoPlayerRef.current.state?.currentTime || 0,
        );
      }
      setCurrentResolution(resolution);
      onResolutionStateChange(false);
    },
    [videoPlayerRef.current],
  );

  const onPlayBackStateChange = React.useCallback((value: boolean) => {
    setPlayBackVisible(value);
  }, []);
  const handleSpeed = React.useCallback(
    (e: any) => {
      if (videoPlayerRef.current) {
        setSavedPlaybackPosition(
          videoPlayerRef.current.state?.currentTime || 0,
        );
        videoPlayerRef.current?.methods?.togglePause();
      }
      setSpeedTrack(e);
      onPlayBackStateChange(false);
      setPlaybackChange(true);
    },
    [videoPlayerRef.current],
  );
  const onHandleChangeOption = React.useCallback((value: boolean) => {
    handleContinueOption(value);
  }, []);
  const onLoad = React.useCallback(() => {
    videoPlayerRef.current?.player?.ref?.seek(savedPlaybackPosition);
    if (playBackChange) {
      setTimeout(() => {
        videoPlayerRef.current?.methods?.togglePlayPause();
        setPlaybackChange(false);
      }, 1500);
    } else {
      videoPlayerRef.current?.methods?.togglePlayPause();
    }
  }, [savedPlaybackPosition, playBackChange, videoPlayerRef.current]);
  const onBack = React.useCallback(() => {
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
  }, [videoPlayerRef.current, navigation]);
  const onSubtitleEnable = React.useCallback(() => {
    setSubtitleEnable(!subtitleEnable);
  }, [subtitleEnable]);

  const onDownloadVideo = React.useCallback(() => {
    if (isDownloaded) {
      handleExist();
    } else {
      downloadVideo();
    }
  }, [isDownloaded]);
  const value = React.useMemo(
    (): HomeContextType => ({
      navigation,
      inPortrait,
      videoPlayerRef,
      resolutions,
      subtitleEnable,
      speedTrack,
      savedPlaybackPosition,
      currentResolution,
      isConnected,
      settingVisible,
      playBackVisible,
      resolutionVisible,
      showDescription,
      videoResizeMode,
      isDownloading,
      videoExists,
      isDownloaded,
      showContinueDialog,
      checkFile,
      downloadVideo,
      getAvailableResolutions,
      movie,
      savePlaybackDuration,
      cleanId,
      clearSavedPlaybackDuration,
      forwardVideo,
      reverseVideo,
      checkSavedPlaybackDuration,
      handleContinueOption,
      handleExist,
      onEnterFullscreen,
      onExitFullScreen,
      handleResolutionChange,
      handleSpeed,
      onHandleChangeOption,
      onLoad,
      onBack,
      onSubtitleEnable,
      onSettingChange,
      onResolutionStateChange,
      onPlayBackStateChange,
      onDownloadVideo,
      setDownloadingState,
      localVideoPath,
    }),
    [
      navigation,
      inPortrait,
      videoPlayerRef,
      resolutions,
      subtitleEnable,
      speedTrack,
      savedPlaybackPosition,
      currentResolution,
      isConnected,
      settingVisible,
      playBackVisible,
      resolutionVisible,
      showDescription,
      videoResizeMode,
      isDownloading,
      videoExists,
      isDownloaded,
      showContinueDialog,
      checkFile,
      downloadVideo,
      getAvailableResolutions,
      savePlaybackDuration,
      cleanId,
      clearSavedPlaybackDuration,
      forwardVideo,
      reverseVideo,
      checkSavedPlaybackDuration,
      handleContinueOption,
      handleExist,
      onEnterFullscreen,
      onExitFullScreen,
      handleResolutionChange,
      handleSpeed,
      onHandleChangeOption,
      onLoad,
      onBack,
      onSubtitleEnable,
      onSettingChange,
      onResolutionStateChange,
      onPlayBackStateChange,
      onDownloadVideo,
      setDownloadingState,
      movie,
      localVideoPath,
    ],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
