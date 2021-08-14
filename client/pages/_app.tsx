import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyle } from "@styles/styles";
import { useCallback } from "react";
import { wrapper } from "configureStore";
import "antd/dist/antd.css";
import "swiper/swiper.min.css";
import "animate.css/animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { ToastContainer } from "react-toastify";
import Header from "@layout/Header";
import Footer from "@layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "slices";
import { mainSlice } from "slices/main";
import Head from "next/head";
import MobileSlideMenu from "@layout/MobileSlideMenu";
import Overlay from "@components/Modals/Overlay";

const App = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();
  const { onProfilePopUp, onNoticePopUp, onSearchPopUp, onSlideMenu } = useSelector(
    (state: RootState) => state.main
  );

  const onClickBody = useCallback(
    (e) => {
      if (onProfilePopUp) {
        dispatch(mainSlice.actions.closeProfilePopUp());
      }
      if (onNoticePopUp) {
        dispatch(mainSlice.actions.closeNoticePopUp());
      }
      if (onSearchPopUp && e.target.nodeName !== "HEADER") {
        dispatch(mainSlice.actions.closeSearchPopUp());
      }
    },
    [onProfilePopUp, onNoticePopUp, onSearchPopUp]
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div onClick={onClickBody}>
        <Global styles={globalStyle} />
        <Header />
        <Component {...pageProps} />
        <Footer />
        <ToastContainer />
        <MobileSlideMenu />
        {onSlideMenu && <Overlay isMobile={true} />}
      </div>
    </>
  );
};

export default wrapper.withRedux(App);
