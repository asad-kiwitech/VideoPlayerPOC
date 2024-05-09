import React, {createContext, useContext, useEffect, useState} from 'react';
import {Dimensions, ScaledSize} from 'react-native';
import Orientation from 'react-native-orientation-locker';

export type OrientationType = 'PORTRAIT' | 'LANDSCAPE';

interface OrientationContextType {
  inPortrait: OrientationType;
  lockToPortrait: () => void;
  lockToLandscape: () => void;
  unlockOrientation: () => void;
}

const OrientationContext = createContext<OrientationContextType | undefined>(
  undefined,
);
const isPortrait = ({width, height}: ScaledSize): boolean => height >= width;

interface OrientationProviderProps {
  children: React.ReactNode;
}
export const useOrientationContext = () => {
  const context = useContext(OrientationContext);
  if (!context) {
    throw new Error(
      'useOrientationContext must be used within an OrientationProvider',
    );
  }
  return context;
};

export const OrientationProvider: React.FC<OrientationProviderProps> = ({
  children,
}) => {
  const [inPortrait, setOrientation] = useState(
    isPortrait(Dimensions.get('screen')),
  );

  useEffect(() => {
    const updateOrientation = ({screen}: {screen: ScaledSize}) => {
      setOrientation(isPortrait(screen));
    };
    Dimensions.addEventListener('change', updateOrientation);
  }, []);
  const lockToPortrait = () => {
    Orientation.lockToPortrait();
  };

  const lockToLandscape = () => {
    Orientation.lockToLandscape();
  };

  const unlockOrientation = () => {
    Orientation.unlockAllOrientations();
  };

  return (
    <OrientationContext.Provider
      value={{
        inPortrait,
        lockToPortrait,
        lockToLandscape,
        unlockOrientation,
      }}>
      {children}
    </OrientationContext.Provider>
  );
};
