import {StyleSheet} from 'react-native';

export const styles = {
  player: StyleSheet.create({
    container: {
      overflow: 'hidden',
      backgroundColor: '#000',
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'space-between',
    },
    video: {
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  }),
  error: StyleSheet.create({
    container: {
      backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginBottom: 16,
    },
    text: {
      backgroundColor: 'transparent',
      color: '#f27474',
    },
  }),
  loader: StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {},
  }),
  controls: StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: null,
      width: null,
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: null,
      width: null,
    },
    vignette: {
      resizeMode: 'stretch',
    },
    control: {
      padding: 16,
    },
    text: {
      backgroundColor: 'transparent',
      color: '#FFF',
      fontSize: 14,
      textAlign: 'center',
    },
    pullRight: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    middle: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    top: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    bottom: {
      alignItems: 'stretch',
      flex: 2,
      justifyContent: 'flex-end',
    },
    topControlGroup: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: null,
      margin: 12,
      marginBottom: 18,
    },
    bottomControlGroup: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 12,
      marginRight: 12,
      marginBottom: 0,
    },
    volume: {
      flexDirection: 'row',
    },
    fullscreen: {
      flexDirection: 'row',
    },
    playPause: {
      position: 'relative',
      width: 80,
      zIndex: 0,
    },
    title: {
      alignItems: 'center',
      flex: 0.6,
      flexDirection: 'column',
      padding: 0,
    },
    titleText: {
      textAlign: 'center',
    },
    timer: {
      width: 180,
    },
    timerText: {
      backgroundColor: 'transparent',
      color: '#FFF',
      fontSize: 11,
      textAlign: 'right',
    },
    back: {},
  }),
  volume: StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      height: 1,
      marginLeft: 20,
      marginRight: 20,
      width: 150,
    },
    track: {
      backgroundColor: '#333',
      height: 1,
      marginLeft: 7,
    },
    fill: {
      backgroundColor: '#FFF',
      height: 1,
    },
    handle: {
      position: 'absolute',
      marginTop: -24,
      marginLeft: -24,
      padding: 16,
    },
    icon: {
      marginLeft: 7,
    },
  }),
  seekbar: StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      height: 28,
      marginLeft: 20,
      marginRight: 20,
    },
    track: {
      backgroundColor: '#333',
      height: 1,
      position: 'relative',
      top: 14,
      width: '100%',
    },
    fill: {
      backgroundColor: '#FFF',
      height: 2,
      width: '100%',
    },
    handle: {
      position: 'absolute',
      marginLeft: -7,
      height: 28,
      width: 28,
    },
    circle: {
      borderRadius: 12,
      position: 'relative',
      top: 8,
      left: 8,
      height: 12,
      width: 12,
    },
  }),
};
