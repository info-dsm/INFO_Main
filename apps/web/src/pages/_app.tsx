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
              <Component {...pageProps} />
            </CustomThemeProvider>
          </RecoilRoot>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}
