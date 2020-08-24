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
          "Total" : "Total",
          "Shipping calculated at checkout" : "Shipping calculated at checkout",
          "Cart total" : "Cart total",
          "Shipping added in the next step" : "Shipping added in the next step",
          "Contact Information" : "Contact Information",
          "First Name" : "First Name",
          "Last Name" : "Last Name",
          "Address" : "Address",
          "Apartment, suite, etc. (if applicable)" : "Apartment, suite, etc. (if applicable)",
          "City" : "City",
          "State": "State",
          "Postal Code" : "Postal Code",
          "Mobile" : "Mobile",
          "Continue to Shipping" : "Continue to Shipping",
          "Back to Cart" : "Back to Cart",
          "Choose Shipping Method" : "Choose Shipping Method",
          "Continue to Payment" : "Continue to Payment",
          "Back to Information" : "Back to Information",
          "Billing Address" : "Billing Address",
          "Same as shipping" : "Same as shipping",
          "Pay" : "Pay",
          "Back to Shipping" : "Back to Shipping",
          "Checkout" : "Checkout", 
          "Sold Out" : "Sold Out",
          "Email is required" : "Email is required",
          "Password is required" : "Password is required",
          "Password" : "Password",
          "Log in" : "Log in",
          "Forgot your password" : "Forgot your password",
          "Email or password is incorrect. Please try again" : "Email or password is incorrect. Please try again",
          "Send a Reset" : "Send a Reset",
          "No account? Register here!" : "No account? Register here!",
          "Passwords do not match! Please try again.": "Passwords do not match! Please try again.",
          "Please provide your name." : "Please provide your name.",
          "Please provide your email." : "Please provide your email.",
          "Name" : "Name",
          "Confirm Password" : "Confirm Password",
          "Register" : "Register",
          "Email" : "Email",
          "Phone" : "Phone",
          "Socials": "Socials",
          "Information": "Information",
          "Shipping": "Shipping",
          "Returns": "Returns",
          "Legal": "Legal",
          "Privacy Policy": "Privacy Policy",
          "Terms of Use": "Terms of Use",
          "Created by" : "Created by",
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
          "Total" : "Total",
          "Shipping calculated at checkout" : "Envío calculado al finalizar la compra",
          "Cart total" : "Carro total",
          "Shipping added in the next step" : "Envío agregado en el siguiente paso",
          "Contact Information" : "Información del Contacto",
          "First Name" : "Nombre de Pila",
          "Last Name" : "Apellido",
          "Address" : "Dirección",
          "Apartment, suite, etc. (if applicable)" : "Apartamento, suite, etc. (si aplica)",
          "City" : "Ciudad",
          "State" : "Estado",
          "Postal Code" : "Código Postal",
          "Mobile" : "Móvil",
          "Continue to Shipping" : "Continuar con el Envío",
          "Back to Cart" : "Volver al Carrito",
          "Choose Shipping Method" : "Elija Método de Envío",
          "Continue to Payment" : "Continuar con el Pago",
          "Back to Information" : "Volver a Información",
          "Billing Address" : "Dirección de Cuenta",
          "Same as shipping" : "Igual que el envío",
          "Pay" : "Paga",
          "Back to Shipping" : "Volver a Envíos",
          "Checkout" : "Verificar", 
          "Sold Out" : "Agotado",
          "Email is required" : "Correo electronico es requerido",
          "Password is required" : "Password es requerido",
          "Password" : "Password",
          "Log in" : "Iniciar sesión",
          "Forgot your password" : "Olvidó su password",
          "Email or password is incorrect. Please try again" : "El correo electrónico o password son incorrectos. Vuelva a intentarlo",
          "Send a Reset" : "Enviar un reinicio",
          "No account? Register here!" : "¿No tiene cuenta? ¡Regístrate aquí!",
          "Passwords do not match! Please try again." : "¡Passwords no coinciden! Vuelva a intentarlo",
          "Please provide your name." : "Por favor proporcione su nombre.",
          "Please provide your email." : "Por favor proporcione su correo electrónico.",
          "Name" : "Nombre", 
          "Confirm Password" : "Confirmar Password",
          "Register" : "Registrarse",
          "Email" : "Email",
          "Phone" : "Teléfono",
          "Socials": "Socials",
          "Information": "Información",
          "Shipping": "Envío",
          "Returns": "Devoluciones",
          "Legal": "Legal",
          "Privacy Policy": "Política de Privacidad",
          "Terms of Use": "Términos de Uso",
          "Created by" : "Creado por",
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
