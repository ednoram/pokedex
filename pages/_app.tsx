import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { Provider } from "react-redux";

import "styles/index.scss";
import store from "store/index";

Router.events.on("routeChangeError", () => NProgress.done());
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
