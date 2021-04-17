import { createContext } from 'react';

interface IDeviceContext {
  normal: boolean;
  mobile: boolean;
}

export const DeviceContext = createContext<IDeviceContext>({
  normal: true,
  mobile: false,
});
