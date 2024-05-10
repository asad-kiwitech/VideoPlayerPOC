import React from 'react';
import AppModal from '../../components/appModal';
import {IMAGES, Value} from '../../constants';
import {ListView} from '../../components/listView';
import {HomeContext} from '../../context/HomeContext';

const HomeModal = (): React.JSX.Element | null => {
  const {
    settingVisible,
    onSettingChange,
    isDownloaded,
    onResolutionStateChange,
    currentResolution,
    onPlayBackStateChange,
    speedTrack,
    isDownloading,
    onDownloadVideo,
  } = React.useContext(HomeContext);
  if (settingVisible) {
    return (
      <AppModal
        isVisible={settingVisible}
        onCloseSheet={() => {
          onSettingChange(false);
        }}
        snapPoint={Value.CONSTANT_VALUE_250}>
        <>
          {!isDownloaded && (
            <ListView
              label="Quality"
              img={IMAGES.quality}
              onPress={() => {
                onSettingChange(false);
                onResolutionStateChange(true);
              }}
              leftText={currentResolution.label}
            />
          )}
          <ListView
            label="Playback Speed"
            img={IMAGES.playBackSpeedIcon}
            onPress={() => {
              onSettingChange(false);
              onPlayBackStateChange(true);
            }}
            leftText={speedTrack.name}
          />
          <ListView
            label="Download Video"
            img={isDownloaded ? IMAGES.checked : IMAGES.dowloaded}
            isLoading={isDownloading}
            onPress={onDownloadVideo}
          />
        </>
      </AppModal>
    );
  }
  return null;
};

export default React.memo(HomeModal);
