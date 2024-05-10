import {ScrollView} from 'react-native';
import React from 'react';
import {HomeContext} from '../../context/HomeContext';
import AppModal from '../../components/appModal';
import {ListView} from '../../components/listView';
import {
  Value,
  preDefinedSpeedTrack,
  preDefinedSpeedTrackType,
} from '../../constants';

const HomeSpeedControlModal = (): React.JSX.Element | null => {
  const {playBackVisible, handleSpeed, speedTrack, onPlayBackStateChange} =
    React.useContext(HomeContext);
  if (playBackVisible) {
    return (
      <AppModal
        isVisible={playBackVisible}
        onCloseSheet={() => {
          onPlayBackStateChange(false);
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
    );
  }
  return null;
};

export default React.memo(HomeSpeedControlModal);
