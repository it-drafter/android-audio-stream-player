import React from 'react';

const GlobalContext = React.createContext({
  trackUrlValue: {},
  setTrackUrlFn: () => {},
  swipeEnabledValue: true,
  setSwipeEnabledValue: () => {},
  fileNameDownloadingValue: {},
  setfileNameDownloadingFn: () => {},
  colorSchemeValue: '',
  setColorSchemeFn: () => {},
});

export default GlobalContext;
