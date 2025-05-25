import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/semantic/header/Header";
import Footer from "../components/semantic/footer/Footer";
import CookieConsent from "../components/other/CookieConsent";
import ChatWidget from "../components/Chatbot/ChatWidget";

export default function Layout() {
  return (
    <Fragment>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Outlet />
        <Footer />
        <CookieConsent />
         <ChatWidget />
      </div>
    </Fragment>
  );
}
