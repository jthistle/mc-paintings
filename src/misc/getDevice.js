import parser from 'ua-parser-js';

const getDevice = (context) => {
  const ua = context.req.headers['user-agent'];
  const parsed = parser(ua);

  return {
    normal: parsed.device.type !== 'mobile',
    mobile: parsed.device.type === 'mobile',
  };
};

export default getDevice;
