import React from 'react';
import { AppLoader } from '~/components/AppLoader';
import Loader from '~/helper/Loader';
import AppStack from './root.index';



export const StartComponent = (): React.JSX.Element => {
  return (
    <>
      <AppLoader ref={(e: HTMLInputElement) => Loader.setLoader(e)} />
      <AppStack />
    </>
  );
};
