import React, {useContext} from 'react';
import VideoDescription from '../../components/videoDescription';
import {HomeContext} from '../../context/HomeContext';

const HomeDescriptionView = (): React.JSX.Element | null => {
  const {movie, showDescription} = useContext(HomeContext);
  if (showDescription) {
    return <VideoDescription movie={movie} />;
  }
  return null;
};

export default React.memo(HomeDescriptionView);
