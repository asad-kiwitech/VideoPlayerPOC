import {View, Text, Button} from 'react-native';
import React from 'react';
import {CommonColors} from '../../constants';
import {HomeContext} from '../../context/HomeContext';

const RenderAskWatch = (): React.JSX.Element | null => {
  const {showContinueDialog, onHandleChangeOption} =
    React.useContext(HomeContext);
  if (showContinueDialog) {
    return (
      <View>
        <Text style={{color: CommonColors.background}}>
          Do you want to continue from where you left off?
        </Text>
        <Button title="Continue" onPress={() => onHandleChangeOption(true)} />
        <Button
          title="Start from Beginning"
          onPress={() => onHandleChangeOption(false)}
        />
      </View>
    );
  }
  return null;
};

export default React.memo(RenderAskWatch);
