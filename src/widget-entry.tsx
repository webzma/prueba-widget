import { createRoot } from "react-dom/client";
import ChatWidget from "./components/ChatWidget";
import "./index.css";

// Crear un contenedor para el widget
const container = document.createElement("div");
container.id = "aicc360-chat-widget-root";
document.body.appendChild(container);

const root = createRoot(container);
root.render(<ChatWidget />);
