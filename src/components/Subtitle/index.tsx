import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import subtitleParser from '../../utils/subtitle-parser';
import {Subtitle, SubtitlesProps} from './subtitle.type';
import {styles} from './styles';

const Subtitles: React.FC<SubtitlesProps> = ({
  selectedsubtitle,
  currentTime,
  containerStyle = {},
  textStyle = {},
}): JSX.Element => {
  /**
   * * First phase parses the subtitle url to an array of objects with the subtitle interface schema
   * * method for parsing varies depending on the file extension (vtt or srt)
   */
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);

  const parseSubtitles = async (): Promise<void> => {
    const parsedSubtitles = await subtitleParser(selectedsubtitle.file);
    setSubtitles(parsedSubtitles);
  };

  useEffect(() => {
    parseSubtitles();
  }, [selectedsubtitle]);

  /**
   * * Second phase filters the subtitles array to get the subtitles that are currently visible
   */
  const [text, setText] = useState('');

  useEffect(() => {
    if (subtitles) {
      let start = 0;
      let end: number = subtitles.length - 1;

      while (start <= end) {
        const mid: number = Math.floor((start + end) / 2);

        const subtitle: Subtitle = subtitles[mid] || {
          start: 0,
          end: 0,
          part: '',
        };
        if (currentTime >= subtitle.start && currentTime <= subtitle.end) {
          setText(subtitle.part.trim());
          return;
        } else if (currentTime < subtitle.start) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      }

      return setText('');
    }
  }, [currentTime, subtitles]);

  return (
    <View style={containerStyle}>
      {text ? (
        <Text
          testID="react-native-subtitles-text"
          style={[styles.textStyleDefault, textStyle]}>
          {text}
        </Text>
      ) : null}
    </View>
  );
};

export default Subtitles;
