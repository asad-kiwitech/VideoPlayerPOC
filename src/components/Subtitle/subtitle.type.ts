import {TextStyle, ViewStyle} from 'react-native';

/**
 * * subtitle interface
 * * @param {start} starting time in relation to the video in miliseconds
 * * @param {end} ending time in relation to the video in miliseconds
 * * @param {part} text of the subtitle
 */
export interface Subtitle {
  start: number;
  end: number;
  part: string;
}
/**
 * * subtitles interface
 * * @param { selectedsubtitle: { file } } url of the subtitle
 * * @param { currentTime } time in miliseconds from the video playback
 * * @param { containerStyle: {} } style for the container of the subtitles component
 * * @param { textStyle: {} } style for the text of the subtitle component
 */

export interface SubtitlesProps {
  selectedsubtitle: {
    file: string;
  };
  currentTime: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}
export interface srtParserSubtitle {
  startTime: string;
  endTime: string;
  text: string;
}
