import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { isDesktop } from '../../blue_modules/environment';

interface ILargeScreenContext {
  isLargeScreen: boolean;
}

export const LargeScreenContext = createContext<ILargeScreenContext | undefined>(undefined);

interface LargeScreenProviderProps {
  children: ReactNode;
}

export const LargeScreenProvider: React.FC<LargeScreenProviderProps> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState<number>(Dimensions.get('window').width);
  const screenWidth: number = useMemo(() => Dimensions.get('screen').width, []);

  useEffect(() => {
    const updateScreenUsage = (): void => {
      const newWindowWidth = Dimensions.get('window').width;
      if (newWindowWidth !== windowWidth) {
        setWindowWidth(newWindowWidth);
      }
    };

    const subscription = Dimensions.addEventListener('change', updateScreenUsage);
    return () => subscription.remove();
  }, [windowWidth]);

  const isLargeScreen: boolean = useMemo(() => {
    const isRunningOnTablet = isTablet();
    const halfScreenWidth = windowWidth >= screenWidth / 2;
    const condition = (isRunningOnTablet && halfScreenWidth) || isDesktop;
    console.debug(
      `LargeScreenProvider.isLargeScreen: width: ${windowWidth}, Screen width: ${screenWidth}, Is tablet: ${isTablet()}, Is large screen: ${condition}, isDesktkop: ${isDesktop}`,
    );
    return condition;
  }, [windowWidth, screenWidth]);

  return <LargeScreenContext.Provider value={{ isLargeScreen }}>{children}</LargeScreenContext.Provider>;
};
