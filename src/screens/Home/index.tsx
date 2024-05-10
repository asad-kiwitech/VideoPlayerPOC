import React from 'react';
import AppBgImage from '../../components/appBgImage';
import {HomeProvider} from '../../context/HomeContext';
import HomeContent from './homeContent';
import HomeDescriptionView from './homeDescriptionView';
import HomeModal from './homeModal';
import HomeResolutionModal from './homeResolutionModal';
import HomeSpeedControlModal from './homeSpeedControlModal';

const Home = () => {
  return (
    <HomeProvider>
      <AppBgImage>
        <HomeContent />
        <HomeDescriptionView />
        <HomeModal />
        <HomeResolutionModal />
        <HomeSpeedControlModal />
      </AppBgImage>
    </HomeProvider>
  );
};

export default React.memo(Home);
