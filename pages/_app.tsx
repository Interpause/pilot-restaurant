import React, { useEffect, useMemo } from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import { ThemeProvider, createMuiTheme, CssBaseline, useMediaQuery } from "@material-ui/core";
import { TopNav, BottomNav, RouteProps } from "../src/Nav";

const routes:RouteProps[] = [
  {name:"Home",url:"/",icon:"home"},
  {name:"Reviews",url:"/reviews",icon:"rate_review"},
  {name:"Trending",url:"/trending",icon:"trending_up"},
];

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() =>
    createMuiTheme({
      typography:{
        button:{
          textTransform:"none",
        },
      },
      palette: {
        type: prefersDarkMode?"dark":"light",
        secondary: {
          main:"#43a047",
        },
      },
    })
  ,[prefersDarkMode]);

  // Fix from https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript
  useEffect(() => document.querySelector('#jss-server-side')?.remove(), []);

  return <>
    <Head>
      <meta name="robots" content="index, follow"/>
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
			<meta name="language" content="English"/>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>

      <title>Experimental Site</title>
			<meta name="description" content="Currently attempting to do my sister's project in a day."/>
			<meta name="topic" content="experimental"/>
			<meta name="keywords" content="interpause, experimental, restaurant reviews"/>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>

      {/* https://realfavicongenerator.net/ */}
      {/* https://material-ui.com/customization/color/#official-color-tool */}
      {/* insert favicons here */}
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <TopNav routes={routes}/>
      <Component {...pageProps}/>
      <BottomNav routes={routes}/>
    </ThemeProvider>
  </>;
}