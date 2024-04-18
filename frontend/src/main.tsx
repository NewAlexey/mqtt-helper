import { createRoot } from "react-dom/client";
import App from "./App";

import "./styles/style.css";
import "./styles/common-styles.scss";

const rootElement = document.getElementById("app");

if (rootElement) {
    createRoot(rootElement).render(<App />);
}
