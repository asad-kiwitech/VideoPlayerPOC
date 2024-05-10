import {ScrollView} from 'react-native';
import React from 'react';
import {HomeContext} from '../../context/HomeContext';
import AppModal from '../../components/appModal';
import {ListView} from '../../components/listView';
import {Value, resolutionType} from '../../constants';

const HomeResolutionModal = (): React.JSX.Element | null => {
  const {
    resolutionVisible,
    onResolutionStateChange,
    resolutions,
    currentResolution,
    handleResolutionChange,
  } = React.useContext(HomeContext);
  if (resolutionVisible) {
    return (
      <AppModal
        isVisible={resolutionVisible}
        onCloseSheet={() => {
          onResolutionStateChange(false);
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
    );
  }
  return null;
};

export default React.memo(HomeResolutionModal);
