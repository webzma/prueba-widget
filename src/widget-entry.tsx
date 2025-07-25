import { createRoot } from "react-dom/client";
import ChatWidget from "./components/ChatWidget";

// Configuración de CDNs
const CSS_CONFIG = {
  production: {
    tailwind: {
      primary: 'https://cdn.tailwindcss.com',
      fallback: 'https://unpkg.com/tailwindcss@3/src/index.css'
    }
  },
  development: {
    useLocal: true
  }
};

// Función para cargar CSS con fallbacks
async function loadStylesheets() {
  if (import.meta.env.PROD) {
    // Producción: usar CDN
    await loadFromCDN();
  } else {
    // Desarrollo: usar archivos locales
    await loadLocalStyles();
  }
}

async function loadFromCDN() {
  const config = CSS_CONFIG.production;
  
  try {
    // Intentar cargar Tailwind desde CDN principal
    await loadStylesheet(config.tailwind.primary, 'tailwind-primary');
    console.log('✅ Tailwind CSS cargado desde CDN principal');
  } catch (error) {
    console.warn('⚠️ Fallback: cargando Tailwind desde CDN alternativo');
    try {
      await loadStylesheet(config.tailwind.fallback, 'tailwind-fallback');
    } catch (fallbackError) {
      console.error('❌ Error cargando CSS desde CDN:', fallbackError);
    }
  }
}

async function loadLocalStyles() {
  try {
    await import("./index.css");
    console.log('✅ Estilos locales cargados para desarrollo');
  } catch (error) {
    console.error('❌ Error cargando estilos locales:', error);
  }
}

function loadStylesheet(href: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Verificar si ya está cargado
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Error cargando ${href}`));
    
    document.head.appendChild(link);
    
    // Timeout de 10 segundos
    setTimeout(() => reject(new Error(`Timeout cargando ${href}`)), 10000);
  });
}

// Cargar estilos según el entorno
loadStylesheets();

// Crear un contenedor para el widget
const container = document.createElement("div");
container.id = "aicc360-chat-widget-root";
document.body.appendChild(container);

const root = createRoot(container);
root.render(<ChatWidget />);
