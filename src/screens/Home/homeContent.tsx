import {StatusBar, View, ViewStyle} from 'react-native';
import React from 'react';
import VideoPlayer from '../../components/videoLibrary/VideoPlayer';
import {fontPixel, heightPixel} from '../../utils/responsive';
import {Value} from '../../constants';
import {HomeContext} from '../../context/HomeContext';
import {styles} from './styles';
import RenderResolution from './renderResolution';
import RenderAskWatch from './renderAskWatch';

const HomeContent = (): React.JSX.Element => {
  const {
    currentResolution,
    speedTrack,
    videoPlayerRef,
    videoExists,
    localVideoPath,
    movie,
    onExitFullScreen,
    onEnterFullscreen,
    showContinueDialog,
    videoResizeMode,
    navigation,
    savePlaybackDuration,
    forwardVideo,
    onLoad,
    reverseVideo,
    clearSavedPlaybackDuration,
    inPortrait,
    onBack,
    subtitleEnable,
    showDescription,
  } = React.useContext(HomeContext);

  return (
    <View style={{flex: 1}}>
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
          return <RenderAskWatch />;
        }}
        onError={(e: any) => console.log(e, 'error here')}
        onSeekFunc={() => savePlaybackDuration()}
        forward={forwardVideo}
        reverse={reverseVideo}
        onLoad={onLoad}
        handleTenSecondsLeftCallback={() => {
          clearSavedPlaybackDuration();
        }}
        inPortrait={inPortrait}
        onBack={onBack}
        custom={true}
        selectedTextTrack={{type: 'language', value: 'en'}}
        selectedVideoTrack={currentResolution.resolutionValue}
        subtitleEnable={subtitleEnable}
        renderResolution={() => <RenderResolution />}
      />
    </View>
  );
};

export default React.memo(HomeContent);
