import App from "./App";
import React from "react";
import "./scss/common.scss";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import Header from "./components/header";
import Footer from "./components/footer";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Header />
      <App />
      <Footer />
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
