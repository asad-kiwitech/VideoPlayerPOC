import {Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from '../screens/Home/styles';
import {heightPixel} from '../utils/responsive';
import {Value} from '../constants';

const VideoDescription = ({movie}: {movie: any}): React.JSX.Element => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={{
        paddingBottom: heightPixel(Value.CONSTANT_VALUE_80),
      }}>
      <Text style={styles.movieTitle}>{movie.name.toUpperCase()}</Text>
      <Text style={styles.movieDescription}>{movie.description}</Text>
      <Text style={styles.movieRating}>{`Rating: ${movie.rating}`}</Text>
      <Text style={styles.castLabel}>Cast:</Text>
      <View style={styles.castContainer}>
        {movie.cast.map((castMember: string) => (
          <Text key={castMember.toString()} style={styles.castName}>
            {castMember}
          </Text>
        ))}
      </View>
      <Text
        style={styles.imdbRating}>{`IMDb Rating: ${movie.imdbRating}`}</Text>
    </ScrollView>
  );
};

export default VideoDescription;
