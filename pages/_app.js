import { useState } from 'react';
import Head from 'next/head';
import { DeviceContext } from '../src/context/device';
import getDevice from '../src/misc/getDevice';

function MyApp({ Component, pageProps, device }) {
  const [storedDevice] = useState(device);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Minecraft Painting Creator</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <meta
          name="description"
          content="A painting resource pack generator for Minecraft Java and Bedrock editions versions 1.14+"
        />
        <meta
          name="keywords"
          content="minecraft,painting,creator,generator,resource pack,free,quick,simple,online,easy,mc,1.15,1.14,bedrock,java,mobile"
        />
        <meta name="yandex-verification" content="44172bf8c8280819" />
      </Head>
      <DeviceContext.Provider value={storedDevice}>
        <Component {...pageProps} />
      </DeviceContext.Provider>
      <style global jsx>{`
        @font-face {
          font-family: Rubik;
          src: local(Rubik), url(./fonts/Rubik-Regular.ttf);
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: Rubik;
          src: local(Rubik), url(./fonts/Rubik-RegularItalic.ttf);
          font-weight: normal;
          font-style: italic;
        }

        @font-face {
          font-family: Rubik;
          src: local(Rubik), url(./fonts/Rubik-Bold.ttf);
          font-weight: bold;
          font-style: normal;
        }

        @font-face {
          font-family: Rubik;
          src: local(Rubik), url(./fonts/Rubik-BoldItalic.ttf);
          font-weight: bold;
          font-style: italic;
        }

        @font-face {
          font-family: Rubik;
          src: local(Rubik), url(./fonts/Rubik-Light.ttf);
          font-weight: lighter;
          font-style: normal;
        }

        @font-face {
          font-family: Rubik;
          src: local(Rubik), url(./fonts/Rubik-LightItalic.ttf);
          font-weight: lighter;
          font-style: italic;
        }

        /*
        *  Everything else
        */

        body {
          margin: 0;
          font-family: 'Rubik', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: #051a26;
          color: #cfe0f7;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }
      `}</style>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  // This disables https://nextjs.org/docs/advanced-features/automatic-static-optimization
  // TODO keep an eye out for ways to do this better.
  if (!ctx?.req) {
    return { device: null };
  }

  return {
    device: getDevice(ctx),
  };
};

export default MyApp;
