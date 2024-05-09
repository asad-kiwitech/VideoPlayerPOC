import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {styles} from '../screens/Home/styles';
import {Alignment, CommonColors, IMAGES, Value} from '../constants';
import {widthPixel} from '../utils/responsive';

export const ListView = ({
  renderComp,
  img,
  label,
  onPress,
  isLoading = false,
  leftText,
  key = label,
  selected,
}: {
  renderComp?: React.ReactNode;
  img?: ImageSourcePropType;
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  leftText?: string;
  key?: string;
  selected?: boolean;
}): React.JSX.Element => {
  return (
    <TouchableOpacity key={key} onPress={onPress} style={styles.listView}>
      {!isLoading ? (
        renderComp ?? (
          <Image
            tintColor={'black'}
            style={styles.listIcon}
            source={selected ? IMAGES.checked : img}
          />
        )
      ) : (
        <ActivityIndicator
          style={{marginRight: widthPixel(Value.CONSTANT_VALUE_10)}}
          color={'black'}
          size={'small'}
        />
      )}
      <View
        style={{
          flexDirection: Alignment.ROW,
          flex: Value.CONSTANT_VALUE_1,
          justifyContent: Alignment.SPACE_BETWEEN,
        }}>
        <Text style={styles.label}>{label}</Text>
        {leftText && (
          <View style={{flexDirection: Alignment.ROW}}>
            <Text
              style={{
                justifyContent: Alignment.FLEXEND,
                color: CommonColors.text,
              }}>
              {leftText}
            </Text>
            <Image
              source={IMAGES.rightArrow}
              tintColor={'black'}
              style={styles.iconStyle}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
