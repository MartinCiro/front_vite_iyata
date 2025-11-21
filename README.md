
---

# iyata-frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

* Chromium-based browsers (Chrome, Edge, Brave, etc.):

  * [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  * [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
* Firefox:

  * [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  * [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

---

## File Structure

```bash
# Estructura del Proyecto Iyata Frontend
├── env.d.ts                      # Definiciones de tipos para variables de entorno
├── index.html                    # Punto de entrada HTML
├── package.json                  # Dependencias y scripts del proyecto
├── public
│   └── favicon.ico               # Icono de la aplicación
├── src
│   ├── App.vue                   # Componente raíz de la aplicación
│   ├── index.css                 # Estilos globales
│   ├── main.ts                   # Punto de entrada de la aplicación Vue
│   ├── router
│   │   └── index.ts              # Configuración de rutas Vue Router
│   ├── lib
│   │   ├── hooks
│   │   │   ├── useApi.js         # Hook para llamadas API (reutilizable)
│   │   │   ├── useAuth.js        # Hook para gestión de autenticación
│   │   │   ├── useForm.js        # Hook para manejo de formularios y validación
│   │   │   └── useProjects.js    # NO USADO - Gestión de proyectos
│   │   ├── layouts
│   │   │   ├── AppLayout.vue     # Layout principal para páginas autenticadas
│   │   │   ├── AuthLayout.vue    # Layout para login/register
│   │   │   └── components
│   │   │       ├── Header.vue    # Encabezado de la aplicación
│   │   │       └── Sidebar.vue   # Barra lateral de navegación
│   │   ├── services
│   │   │   ├── api.js            # Configuración base de Axios e interceptores
│   │   │   ├── authService.js    # Servicio de autenticación (ReqRes API)
│   │   │   ├── projectService.js # NO USADO
│   │   │   └── taskService.js    # NO USADO
│   │   └── stores
│   │       ├── auth.js           # NO USADO - Store de autenticación (Pinia)
│   │       └── projects.js       # NO USADO - Store de proyectos (Pinia)
│   ├── ui
│   │   ├── screens
│   │   │   ├── auth
│   │   │   │   ├── Login.vue     # Página de inicio de sesión
│   │   │   │   └── Register.vue  # Página de registro (demo)
│   │   │   ├── components
│   │   │   │   └── TaskCard.vue  # NO USADO
│   │   │   ├── Dashboard.vue     # Página principal del dashboard
│   │   │   ├── projects
│   │   │   │   ├── ProjectForm.vue
│   │   │   │   ├── ProjectList.vue
│   │   │   │   └── ProjectView.vue
│   │   │   └── tasks
│   │   │       ├── TaskForm.vue
│   │   │       └── TaskList.vue
│   │   └── useable-components
│   │       ├── Button.vue        # Componente de botón reutilizable
│   │       ├── Card.vue          # Contenedor tipo tarjeta
│   │       ├── Input.vue         # Input reutilizable con validación
│   │       ├── Loader.vue        # NO USADO
│   │       └── Modal.vue         # NO USADO
│   └── utils
│       └── constants
│           ├── api.js            # NO USADO
│           └── config.js         # Configuración centralizada
├── tsconfig.json                 # Configuración de TypeScript
└── vite.config.ts               # Configuración de Vite
```

---

## ✅ Componentes en Uso (Sin Base de Datos)

### Autenticación:

* `authService.js` — Servicio usando ReqRes API
* `useAuth.js` — Hook de autenticación
* `Login.vue` — Vista de login
* `Register.vue` — Registro demo usando localStorage

### Layouts:

* `AppLayout.vue`
* `AuthLayout.vue`
* `Header.vue`
* `Sidebar.vue`

### UI Components:

* `Button.vue`, `Card.vue`, `Input.vue`

### Página principal:

* `Dashboard.vue`

### Servicios:

* `api.js` — Cliente Axios configurado
* `useApi.js` — Hook genérico para peticiones API

---

## ❌ Componentes No Usados (Requieren Base de Datos)

* `ProjectForm.vue`, `ProjectList.vue`, `ProjectView.vue`
* `TaskForm.vue`, `TaskList.vue`
* Stores Pinia (`auth.js`, `projects.js`)
* Servicios de proyectos/tareas (BD necesaria)

---

## 🎯 Arquitectura Actual

Frontend orientado a:

* Autenticación con API externa (ReqRes)
* Hooks reutilizables
* UI modular
* Layouts + Vue Router
* Datos mock para demos
* **Sin base de datos local**

**Tecnologías:** Vue 3, Vue Router, Axios, Tailwind CSS, ReqRes API

---
