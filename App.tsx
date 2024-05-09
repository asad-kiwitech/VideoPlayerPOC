import React from 'react';
import {MainNavigator} from './src/navigation/MainNavigator';
import {StyleSheet, View} from 'react-native';
import {Alignment, Value} from './src/constants';
import {NetworkProvider} from './src/context/NetworkContext';
import {OrientationProvider} from './src/context/useOrientation';
import FlashMessage from 'react-native-flash-message';

const App = (): React.JSX.Element => {
  return (
    <OrientationProvider>
      <NetworkProvider>
        <FlashMessage position={Alignment.TOP} />
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </NetworkProvider>
    </OrientationProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: Value.CONSTANT_VALUE_1,
  },
});
