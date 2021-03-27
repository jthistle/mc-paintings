import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>Minecraft Painting Creator</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/index.css" />
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
