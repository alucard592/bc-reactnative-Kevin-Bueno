# Banco de Sangre - React Native / Expo (Semanas 1 a 9)

Este repositorio contiene la serie de proyectos y prácticas desarrolladas semana a semana para el sistema **Banco de Sangre** utilizando React Native, Expo, TypeScript, React Navigation, Zustand y React Native Animated.

---

## 📌 Estructura del Repositorio

- **Rama `main`**: Contiene la documentación del proyecto (`README.md`).
- **Ramas por Semana (`semana-1` a `semana-9`)**: Cada entrega semanal posee su propia rama independiente donde el proyecto completo (`App.tsx`, `package.json`, `src/`, `app.json`) está ubicado **directamente en la raíz de la rama**.

---

## 🛠️ Requisitos Previos

Antes de ejecutar cualquiera de las semanas, asegúrate de contar con:

- **Node.js** (versión 18 o superior recomendada).
- **npm** o **pnpm**.
- **Expo Go** (aplicación móvil instalada en dispositivo Android o iOS) **O** un navegador web moderno (Chrome, Edge, Brave, etc.).

---

## 🚀 Guía de Ejecución

Para ejecutar el proyecto de cualquier semana:

1. Clona el repositorio si aún no lo has hecho:
   ```bash
   git clone https://github.com/alucard592/bc-reactnative-Kevin-Bueno.git
   cd bc-reactnative-Kevin-Bueno
   ```

2. Cambia a la rama correspondiente a la semana que deseas probar (de `semana-1` a `semana-9`):
   ```bash
   # Ejemplo para probar la Semana 9:
   git checkout semana-9
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo de Expo:
   ```bash
   npx expo start
   ```

---

## 📱 Opciones de Visualización

Una vez ejecutado `npx expo start`:

- **En la Web**: Presiona la tecla `w` en la terminal o abre directamente [http://localhost:8081](http://localhost:8081) en tu navegador.
- **En Dispositivo Móvil (Expo Go)**: Abre la aplicación Expo Go en tu celular y escanea el código QR que aparece en la terminal.
- **En Emulador Android**: Asegúrate de tener Android Studio ejecutándose y presiona la tecla `a`.
- **En Simulador iOS** (Solo macOS): Presiona la tecla `i`.

---

## 🔑 Credenciales de Prueba (Semanas 8 y 9)

Las semanas 8 y 9 incluyen el módulo completo de autenticación y protección de rutas. Puedes ingresar utilizando las siguientes credenciales predeterminadas o registrando un nuevo usuario:

- **Usuario / Email**: `admin`
- **Contraseña**: `123456`

---

## 📚 Desglose de Contenido por Semana

| Rama | Tema Principal | Descripción y Tecnologías |
| :---: | :--- | :--- |
| **`semana-1`** | Introducción a React Native | Configuración del entorno Expo, componentes básicos (`View`, `Text`, `FlatList`) e interfaz inicial. |
| **`semana-2`** | Componentes y Estilos | Diseño modularizado de tarjetas (`ItemCard`), manejo de temas de color Banco de Sangre (`#d32f2f`) y TypeScript. |
| **`semana-3`** | Navegación | Configuración de `@react-navigation/native` con Stack y Bottom Tabs para navegar entre inicio, detalles y favoritos. |
| **`semana-4`** | Estado Global con Zustand | Implementación de `savedStore.ts` con Zustand para guardar y remover donantes en la lista de favoritos. |
| **`semana-5`** | Integración de API (CRUD) | Consumo de servicios RESTful, llamadas asíncronas con Axios y operaciones CRUD completas (Crear, Leer, Editar, Eliminar). |
| **`semana-6`** | Formularios y Validación | Formularios reactivos para registro de donantes utilizando validación de esquemas con Zod y React Hook Form. |
| **`semana-7`** | Persistencia Local | Almacenamiento persistente de datos del usuario y preferencias mediante `AsyncStorage`. |
| **`semana-8`** | Autenticación y Rutas Protegidas | Store de Auth (`authStore.ts`), pantallas de `Login` y `Register`, renderizado condicional de rutas y botón de cierre de sesión. |
| **`semana-9`** | Animaciones Avanzadas | Animaciones con la API `Animated` de React Native (entradas en cascada con `timing`, efectos táctiles con `spring` y rebote) + Auth. |

---

## 📄 Licencia

Desarrollado para el bootcamp de React Native.
