import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { CustomThemeProvider } from "ui";
import React, { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 5000,
          },
        },
      })
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <CustomThemeProvider>
              <Head>
                <title>info</title>
                <meta name="title" content="info" />
                <meta
                  name="description"
                  content="대덕소프트웨어마이스터고등학교의 취업관리서비스입니다."
                />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <meta
                  name="Keywords"
                  content="info, 취업관리서비스, 대덕소프트웨어마이스터고등학교, 대마고info, 대마고 취업지원, 대마고 취업"
                />
                <meta name="robots" content="index, follow" />
                <meta charSet="UTF-8" />
                <meta http-equiv="Subject" content="취업지원서비스" />
              </Head>
              <Component {...pageProps} />
            </CustomThemeProvider>
          </RecoilRoot>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}
