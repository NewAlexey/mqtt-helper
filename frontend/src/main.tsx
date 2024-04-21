import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "./App";

import "./styles/style.scss";
import "./styles/common-styles.scss";

const rootElement = document.getElementById("app");

if (rootElement) {
    createRoot(rootElement).render(<App />);
}
