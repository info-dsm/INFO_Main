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
                <meta name="description" content="teacher page by info" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
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
