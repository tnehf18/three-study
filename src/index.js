import { createRoot } from "react-dom/client";
import App from "./App";

const root_container = document.getElementById("root_container");
const root = createRoot(root_container);

root.render(<App />);