import {Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {SCREEN_WIDTH, heightPixel} from '../../utils/responsive';
import {
  Routes,
  Value,
  dummyMovieData,
  getMovieLink,
  getThumbnailLink,
  moviesListApi,
} from '../../constants';
import styles from './styles';
import AppBgImage from '../../components/appBgImage';
import {navigate} from '../../services/navigationService';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useOrientationContext} from '../../context/useOrientation';
interface Movie {
  id: number;
  name: string;
  uri: string;
  thumbnailPath: string;
}

const Landing = (): React.JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const {lockToPortrait} = useOrientationContext();
  const {top} = useSafeAreaInsets();
  const getMoviesAssetList = React.useCallback(async () => {
    const res = await fetch(moviesListApi);
    const moviesAssetList = await res.json();
    return moviesAssetList;
  }, []);

  const fetchThumbnails = React.useCallback(async () => {
    const availableMovies = await getMoviesAssetList().then(res => {
      const moviesList = Promise.all(
        res.map((assetList: any, index: number) => {
          return {
            id: assetList.assetID,
            name: assetList.name,
            uri: getMovieLink(assetList.assetID, assetList.name),
            thumbnailPath: getThumbnailLink(
              assetList.assetID,
              assetList.name,
              index < 5 ? '00' : '60',
            ),
            ...dummyMovieData,
          };
        }),
      );
      return moviesList;
    });
    setMovies(availableMovies);
  }, []);

  useEffect(() => {
    lockToPortrait();
    fetchThumbnails();
  }, []);

  const renderItem = ({item}: {item: Movie}, parallaxProps: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.touch}
        key={item.id}
        onPress={() => {
          navigate(Routes.Home, {movie: item});
        }}>
        <ParallaxImage
          source={{uri: item.thumbnailPath}}
          containerStyle={styles.containerStyle}
          style={styles.mainStyle}
          parallaxFactor={0.3}
          {...parallaxProps}
        />
        <Text style={styles.name}>{item.name.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <AppBgImage>
      <Text
        style={[
          styles.upperText,
          {marginTop: top + heightPixel(Value.CONSTANT_VALUE_30)},
        ]}>
        Popular Movies
      </Text>
      <Carousel
        data={movies}
        renderItem={renderItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH - 100}
        hasParallaxImages={true}
      />
    </AppBgImage>
  );
};

export default React.memo(Landing);
