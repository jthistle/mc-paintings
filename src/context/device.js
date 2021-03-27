import { createContext } from 'react';

export const DeviceContext = createContext({
  normal: true,
  mobile: false,
});
