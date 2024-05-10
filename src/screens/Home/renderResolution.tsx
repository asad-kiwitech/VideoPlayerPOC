import {TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {HomeContext} from '../../context/HomeContext';
import {styles} from './styles';
import {IMAGES} from '../../constants';

const RenderResolution = (): React.JSX.Element => {
  const {onSubtitleEnable, subtitleEnable, onSettingChange} =
    React.useContext(HomeContext);
  return (
    <>
      <TouchableOpacity activeOpacity={0.7} onPress={onSubtitleEnable}>
        <Image
          style={styles.settingIcon}
          source={
            subtitleEnable ? IMAGES.SubtitleIcon : IMAGES.SubtitleDisableIcon
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onSettingChange(true)}>
        <Image style={styles.settingIcon} source={IMAGES.settingIcon} />
      </TouchableOpacity>
    </>
  );
};

export default React.memo(RenderResolution);
