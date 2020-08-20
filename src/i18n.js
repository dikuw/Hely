import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          "English" : "English",
          "Spanish" : "Spanish",
          "Welcome" : "Welcome",
          "guest" : "guest",
          "Face" : "Face",
          "Eyes" : "Eyes",
          "Brushes" : "Brushes",
          "Cart" : "Cart",
          "Inventory" : "Inventory",
          "Orders" : "Orders",
          "Account" : "Account",
          "Log In" : "Log In",
          "Log Out" : "Log Out",
          "Add to Cart" : "Add to Cart",
          "Added to Cart!" : "Added to Cart!",
          "Go to Cart" : "Go to Cart",
          "Keep Shopping": "Keep Shopping",
          "No items in your cart." : "No items in your cart.",
          "Subtotal" : "Subtotal",
          "Shipping calculated at checkout" : "Shipping calculated at checkout",
          "Checkout" : "Checkout", 
          "Sold Out" : "Sold Out",
          "Email" : "Email",
          "Phone" : "Phone",
          "Socials": "Socials",
          "Information": "Information",
          "Shipping": "Shipping",
          "Returns": "Returns",
          "Legal": "Legal",
          "Privacy Policy": "Privacy Policy",
          "Terms of Use": "Terms of Use",
        }
      },
      es: {
        translations: {
          "English" : "Inglés",
          "Spanish" : "Español",
          "Welcome" : "Bienvenido",
          "guest" : "invitado",
          "Face" : "Cara",
          "Eyes" : "Ojos",
          "Brushes" : "Brochas",
          "Cart" : "Carrito",
          "Inventory" : "Inventorio",
          "Orders" : "Pedidos",
          "Account" : "Cuenta",
          "Log In" : "Iniciar Sesión",
          "Log Out" : "Cerrar Sesión",
          "Add to Cart" : "Añadir al Carrito",
          "Added to Cart!" : "Añadido al Carrito!",
          "Go to Cart" : "Ir al Carrito",
          "Keep Shopping" : "Seguir Comprando",
          "No items in your cart." : "No hay artículos en su carrito.",
          "Subtotal" : "Total Parcial",
          "Shipping calculated at checkout" : "Envío calculado al finalizar la compra",
          "Checkout" : "Verificar", 
          "Sold Out" : "Agotado",
          "Email" : "Email",
          "Phone" : "Teléfono",
          "Socials": "Socials",
          "Information": "Información",
          "Shipping": "Envío",
          "Returns": "Devoluciones",
          "Legal": "Legal",
          "Privacy Policy": "Política de Privacidad",
          "Terms of Use": "Términos de Uso",
        }
      }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
