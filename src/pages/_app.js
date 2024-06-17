// pages/_app.js or any specific page
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="profile" href="/profile.png" />
        <title>Your App Title</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
