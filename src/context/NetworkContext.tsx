// NetworkContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

interface NetworkContextProps {
  isConnected: boolean;
  retryCheck: () => void;
}

const NetworkContext = createContext<NetworkContextProps | undefined>(
  undefined,
);

interface NetworkProviderProps {
  children: React.ReactNode;
}

const NetworkProvider: React.FC<NetworkProviderProps> = ({children}) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleConnectivityChange = (state: any) => {
    setIsConnected(state.isConnected);
  };

  const retryCheck = () => {
    NetInfo.fetch().then((state: any) => {
      setIsConnected(state.isConnected);
    });
  };

  const contextValue: NetworkContextProps = {
    isConnected,
    retryCheck,
  };

  return (
    <NetworkContext.Provider value={contextValue}>
      {children}
    </NetworkContext.Provider>
  );
};

const useNetwork = (): NetworkContextProps => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};

export {NetworkProvider, useNetwork};
