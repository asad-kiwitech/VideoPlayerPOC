import {Animated, PanResponderInstance, ViewStyle} from 'react-native';
import Video from 'react-native-video';

export interface Props {
  onLoadStart?: (data: any) => void;
  onLoad?: (data: any) => void;
  onProgress?: (data: any) => void;
  disableBack?: boolean;
  disableVolume?: boolean;
  disableFullscreen?: boolean;
  inPortrait?: boolean;
  renderResolution: () => React.ReactNode;
  renderAskWatch: () => React.ReactNode;
  reverse: () => void;
  forward: () => void;
  disableTimer?: boolean;
  disableSeekbar?: boolean;
  disablePlayPause?: boolean;
  seekColor?: string;
  navigator: any;
  controlTimeoutDelay?: number;
  controlTimeout?: null;
  scrubbing?: number;
  tapAnywhereToPause?: boolean;
  style?: ViewStyle;
  videoStyle?: ViewStyle;
  handleTenSecondsLeftCallback?: () => void;
  onSeekFunc?: () => void;
  onError: (error: Error) => void;
  onBack: () => void;
  onEnd: (data: any) => void;
  onScreenTouch: () => void;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
  onShowControls: () => void;
  onHideControls: () => void;
  onSeek: () => void;
  onPause: () => void;
  onPlay: () => void;
  source?: string;
  showContinueDialog?: boolean;
  containerStyle?: ViewStyle;
  isFullScreen?: boolean;
  toggleResizeModeOnFullscreen?: boolean;
  controlAnimationTiming?: number;
  doubleTapTime?: number;
  playInBackground?: boolean;
  playWhenInactive?: boolean;
  resizeMode?: 'contain' | 'cover'; // Assuming these are the only valid values
  isFullscreen?: boolean;
  showOnStart?: boolean;
  paused?: boolean;
  repeat?: boolean;
  muted?: boolean;
  volume?: number;
  title?: string;
  rate?: number;
  custom?: boolean;
  reloadEnable?: boolean;
}
export interface TypeState {
  showRemainingTime: number;
  resizeMode: 'contain' | 'cover';
  paused: boolean;
  muted: boolean;
  volume: number;
  rate: number;
  isFullscreen: boolean;
  showTimeRemaining: boolean;
  volumeTrackWidth: number;
  volumeFillWidth: number;
  seekerFillWidth: number;
  showControls: boolean;
  volumePosition: number;
  seekerPosition: number;
  volumeOffset: number;
  seekerOffset: number;
  seeking: boolean;
  originallyPaused: boolean;
  scrubbing: boolean;
  loading: boolean;
  currentTime: string;
  error: boolean;
  duration: number;
  isMounted: boolean;
}
export interface AnimationsState {
  bottomControl: {
    marginBottom: Animated.Value;
    opacity: Animated.Value;
  };
  topControl: {
    marginTop: Animated.Value;
    opacity: Animated.Value;
  };
  topMiddleControl: {
    marginTop: Animated.Value;
    opacity: Animated.Value;
  };
  video: {
    opacity: Animated.Value;
  };
  loader: {
    rotate: Animated.Value;
    MAX_VALUE: number;
  };
}

export interface PlayerState {
  controlTimeoutDelay: number;
  volumePanResponder: PanResponderInstance;
  seekPanResponder: PanResponderInstance;
  controlTimeout: NodeJS.Timeout | null;
  tapActionTimeout: NodeJS.Timeout | null;
  volumeWidth: number;
  iconOffset: number;
  seekerWidth: number;
  ref: React.RefObject<Video>;
  scrubbingTimeStep: number;
  tapAnywhereToPause: boolean;
}
export interface OptsType {
  playWhenInactive: boolean | undefined;
  playInBackground: boolean | undefined;
  repeat: boolean | undefined;
  title: string | undefined;
}
export type EventsType = {
  onError: (err: Error) => void;
  onBack: () => void;
  onEnd: (v: any) => void;
  onScreenTouch: () => void;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
  onShowControls: () => void;
  onHideControls: () => void;
  onLoadStart: () => void;
  onProgress: () => void;
  onSeek: () => void;
  onLoad: () => void;
  onPause: () => void;
  onPlay: () => void;
  inPortrait: boolean;
};
export type MethodsType = {
  toggleFullscreen: () => void;
  togglePlayPause: () => void;
  toggleControls: () => void;
  toggleTimer: () => void;
  togglePause: () => void;
  togglePlay: () => void;
  toggleReload: () => void;
};
export type Styles = {
  videoStyle: ViewStyle;
  containerStyle: ViewStyle;
};
