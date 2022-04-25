import React, { useState } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/src/utils/mui/theme';
import createEmotionCache from '@/src/utils/mui/createEmotionCache';
import { RecoilRoot } from 'recoil';
import { getAnalytics } from 'firebase/analytics';
import { app } from '@/src/utils/firebase/init';
import { useAuth } from '@/src/hooks/auth';
import { useUser } from '@/src/hooks/auth';
import { fetchToken, onMessageListener } from '@/src/utils/firebase/fcm/webPush';
import { updateFcmToken } from '@/src/utils/firebase/firestore/users';
import DisplayMode from '@/src/sample/components/DisplayMode';

if (typeof window !== 'undefined') {
  getAnalytics(app);
}

const Notify = () => {
  const user: any = useUser();

  const [isTokenFound, setTokenFound] = useState<boolean>(false);

  const onFetchToken = (fcmToken: string) => {
    setTokenFound(true);
    updateFcmToken({ uid: user.uid, fcmToken });
  };

  fetchToken(onFetchToken);

  onMessageListener()
    .then((payload: any) => {
      alert(payload.notification.body);
      console.log(payload);
    })
    .catch((err: any) => console.log('failed: ', err));

  if (!isTokenFound)
    return (
      <p>
        この端末のこのブラウザからの通知の許可が許可されていません。通知をアナウンスしたい場合はブラウザの設定から許可を行ってください。
      </p>
    );

  return null;
};

type Props = {
  children: JSX.Element;
};
const Auth = ({ children }: Props): JSX.Element => {
  const isLoading = useAuth();

  return isLoading ? <p>Loading...</p> : children;
};
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageContext | any | {};
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Next + Firebase</title>
          <meta name='description' content='Next.js + Firebase サンプル' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <Auth>
            <>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <DisplayMode />
              <Notify />
              <Component {...pageProps} />
            </>
          </Auth>
        </ThemeProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}
