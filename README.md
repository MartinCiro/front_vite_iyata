# Iyata Frontend - Gestión de Proyectos y Tareas

Una aplicación moderna de gestión de proyectos construida con Vue 3, que utiliza APIs mock para demostrar funcionalidades completas sin necesidad de base de datos propia.

## 🚀 Características Principales

### 🔐 **Sistema de Autenticación**
- **Login/Registro** con [ReqRes.in API](https://reqres.in/)
- **Usuarios predefinidos** - Todos los usuarios disponibles en https://reqres.in/api/users/
- **Gestión de sesiones** con localStorage
- **Protección de rutas** automática

### 📊 **Dashboard Interactivo**
- **Resumen estadístico** con métricas clave
- **Actividad reciente** del equipo
- **Acciones rápidas** para navegación
- **Perfil de usuario** con información personalizada

### 📁 **Gestión de Proyectos**
- **Lista de proyectos** con datos de [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- **Vista detallada** de cada proyecto
- **Crear/Editar/Eliminar** proyectos (mock)
- **Búsqueda y filtrado** de proyectos

### ✅ **Sistema de Tareas Avanzado**
- **Tablero Kanban** con columnas drag & drop
- **Tres estados**: Pendiente, En Progreso, Completado
- **Filtros avanzados** por prioridad, estado y asignación
- **Gestión completa** de tareas (CRUD)

### 🎨 **UI/UX Moderna**
- **Diseño responsive** con Tailwind CSS
- **Componentes reutilizables** y modulares
- **Iconos Heroicons** para mejor experiencia visual
- **Loading states** y manejo de errores

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Vue 3, Vue Router
- **Estilo**: Tailwind CSS
- **HTTP Client**: Axios
- **APIs Mock**: 
  - [ReqRes.in](https://reqres.in/) - Autenticación
  - [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Datos de proyectos y tareas
- **Iconos**: Heroicons
- **Build Tool**: Vite
- **Contenedores**: Docker

## 📦 Estructura del Proyecto

```
src/
├── lib/
│   ├── hooks/                 # Custom hooks reactivos
│   │   ├── useAuth.js        # Gestión de autenticación
│   │   ├── useProjects.js    # Estado y acciones de proyectos
│   │   ├── useTasks.js       # Estado y acciones de tareas
│   │   ├── useTaskBoard.js   # Lógica del tablero Kanban
│   │   ├── useTaskFilters.js # Filtrado avanzado de tareas
│   │   └── useForm.js        # Manejo de formularios
│   ├── services/             # Servicios de API
│   │   ├── authService.js    # Autenticación con ReqRes
│   │   ├── projectService.js # Proyectos con JSONPlaceholder
│   │   └── taskService.js    # Tareas con JSONPlaceholder
│   └── layouts/              # Layouts de la aplicación
├── ui/
│   ├── screens/              # Páginas y vistas
│   │   ├── auth/             # Autenticación
│   │   ├── projects/         # Gestión de proyectos
│   │   ├── tasks/            # Gestión de tareas
│   │   └── Dashboard.vue     # Página principal
│   └── useable-components/   # Componentes reutilizables
└── utils/constants/          # Configuración y constantes
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+ (para desarrollo)
- Docker y Docker Compose (para producción)

### Desarrollo
```bash
# Clonar el proyecto
git clone front_vite_iyata
cd iyata-frontend

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Abrir en http://localhost:5173
```

### Producción con Docker
```bash
# Configurar variables de entorno
cp example .env

# Editar el archivo .env con tus configuraciones
# Variables disponibles:
VITE_API_URL=https://reqres.in/api
VITE_API_TIMEOUT=10000
VITE_API_KEY=reqres-free-v1
VITE_LIMIT_PROJECTS=100
VITE_APP_NAME=Iyata App
VITE_ENV=production
VITE_APP_VERSION=1.0.0
VITE_ENABLE_DEBUG=false
VITE_ENABLE_ANALYTICS=false
VITE_USER_KEY=user_data

# Ejecutar con Docker Compose
docker compose up -d

# La aplicación estará disponible en http://localhost:4173
```

### Build Manual
```bash
# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🔑 Credenciales de Prueba

### ⚠️ IMPORTANTE: Limitaciones de la API Mock

La aplicación utiliza ReqRes.in como API mock, la cual tiene restricciones específicas:

### Para LOGIN (Funciona con cualquier usuario predefinido):
- **Email**: Cualquier usuario de https://reqres.in/api/users/
- **Password**: `cityslicka` (para TODOS los usuarios)

**Usuarios disponibles (página 1):**
- `george.bluth@reqres.in`
- `janet.weaver@reqres.in`
- `emma.wong@reqres.in`
- `eve.holt@reqres.in`
- `charles.morris@reqres.in`
- `tracey.ramos@reqres.in`

**Usuarios disponibles (página 2):**
- `michael.lawson@reqres.in`
- `lindsay.ferguson@reqres.in`
- `tobias.funke@reqres.in`
- `byron.fields@reqres.in`
- `george.edwards@reqres.in`
- `rachel.howell@reqres.in`

### Para REGISTER (SOLO funciona con combinación específica):
- **Email**: `eve.holt@reqres.in` (ÚNICO que funciona en register)
- **Password**: `pistol` (ÚNICA contraseña que funciona en register)

## 🎯 Funcionalidades Detalladas

### Autenticación
- ✅ Login con cualquier usuario predefinido de ReqRes + `cityslicka`
- ✅ Registro demo limitado (solo `eve.holt@reqres.in` / `pistol`)
- ✅ Logout automático
- ✅ Protección de rutas privadas
- ✅ Mensajes de error traducidos al español

### Dashboard
- ✅ Métricas en tiempo real con datos mock
- ✅ Actividad reciente del equipo
- ✅ Accesos rápidos a funcionalidades
- ✅ Información del perfil de usuario
- ✅ Diseño responsive

### Gestión de Proyectos
- ✅ Lista de proyectos con datos de JSONPlaceholder
- ✅ Vista detallada de cada proyecto
- ✅ Creación de nuevos proyectos (simulada)
- ✅ Edición de proyectos existentes
- ✅ Eliminación de proyectos
- ✅ Búsqueda y filtrado
- ✅ Límite configurable de proyectos (variable de entorno)

### Sistema de Tareas
- ✅ **Tablero Kanban** con 3 columnas (Pending, In Progress, Completed)
- ✅ **Drag & Drop** entre estados
- ✅ **Filtros múltiples**: estado, prioridad, asignación
- ✅ **Creación/Edición** de tareas
- ✅ **Cambio de estado** con un click
- ✅ **Vista de lista** alternativa
- ✅ Gestión completa de tareas (CRUD)

### Componentes UI
- ✅ **Button** - Botones con variantes y estados de loading
- ✅ **Input** - Campos con validación e iconos
- ✅ **Card** - Contenedores de información
- ✅ **Modal** - Ventanas emergentes reutilizables
- ✅ **Loader** - Indicadores de carga

## ⚙️ Configuración de Variables de Entorno

El proyecto utiliza un sistema de configuración robusto con valores por defecto:

### Variables Disponibles (.env)
```env
VITE_API_URL=https://reqres.in/api
VITE_API_TIMEOUT=10000
VITE_API_KEY=reqres-free-v1
VITE_LIMIT_PROJECTS=100
VITE_APP_NAME=Iyata App
VITE_ENV=development
VITE_APP_VERSION=1.0.0
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=false
VITE_USER_KEY=user_data
```

### Configuración por Defecto
```javascript
// Valores por defecto si las variables no están definidas
{
  api: {
    baseUrl: 'http://localhost:8000/api',  // Sobrescribible con VITE_API_URL
    timeout: 10000,                        // Sobrescribible con VITE_API_TIMEOUT
    apiKey: 'default_api_key',             // Sobrescribible con VITE_API_KEY
    limit: 10,                             // Sobrescribible con VITE_LIMIT_PROJECTS
  },
  app: {
    name: 'Iyata App',                     // Sobrescribible con VITE_APP_NAME
    env: 'development',                    // Sobrescribible con VITE_ENV
    version: '1.0.0',                      // Sobrescribible con VITE_APP_VERSION
  },
  features: {
    enableDebug: false,                    // Sobrescribible con VITE_ENABLE_DEBUG
    enableAnalytics: false,                // Sobrescribible con VITE_ENABLE_ANALYTICS
  }
}
```

## 🌐 APIs Utilizadas

### ReqRes.in (Autenticación)
- `POST /login` - Iniciar sesión (acepta cualquier usuario predefinido + `cityslicka`)
- `POST /register` - Registrar usuario (solo `eve.holt@reqres.in` + `pistol`)
- `GET /users` - Obtener lista de usuarios
- `GET /users/:id` - Obtener información de usuario específico

### JSONPlaceholder (Datos Mock)
- `GET /posts` - Lista de proyectos (convertidos desde posts)
- `GET /posts/:id` - Proyecto específico
- `POST /posts` - Crear proyecto (simulado)
- `PUT /posts/:id` - Actualizar proyecto (simulado)
- `DELETE /posts/:id` - Eliminar proyecto (simulado)
- `GET /comments` - Lista de tareas (convertidas desde comments)
- `GET /comments/:id` - Tarea específica
- `POST /comments` - Crear tarea (simulado)

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 📱 **Móviles** (320px+) - Navegación compacta, tarjetas apiladas
- 📟 **Tablets** (768px+) - Layout de 2 columnas, sidebar colapsable
- 💻 **Desktop** (1024px+) - Layout completo de 3 columnas, sidebar expandida

## 🐛 Características Técnicas

- **Sin Base de Datos**: Usa APIs mock públicas (ReqRes.in + JSONPlaceholder)
- **Configuración Flexible**: Variables de entorno con valores por defecto
- **Estado Reactivo**: Gestión moderna con Composition API y hooks de Vue 3
- **Type Safety**: Configuración TypeScript para mejor desarrollo
- **Error Handling**: Manejo robusto de errores con interceptores
- **Performance**: Optimizado con Vite para builds rápidos
- **Dockerizado**: Fácil despliegue con contenedores

## 🚧 Limitaciones Conocidas

- ❌ **No se pueden crear usuarios nuevos** - Limitado a los predefinidos en ReqRes
- ❌ **Register restringido** - Solo funciona con `eve.holt@reqres.in` / `pistol`
- ❌ **Datos temporales** - La información se pierde al recargar la página
- ❌ **Sin persistencia real** - Las operaciones CRUD son simuladas

## 🚧 Próximas Características

- [ ] Exportación de reportes en PDF/Excel
- [ ] Notificaciones en tiempo real con WebSockets
- [ ] Integración con calendario para fechas de vencimiento
- [ ] Modo oscuro/ claro
- [ ] Internacionalización (i18n) para múltiples idiomas
- [ ] Panel de administración avanzado
- [ ] Integración con herramientas de terceros

## 📄 Licencia

Este proyecto es para fines demostrativos y educativos. Utiliza APIs públicas mock para demostrar funcionalidades sin necesidad de backend complejo.

---

**Nota Importante**: Esta es una aplicación de demostración que utiliza APIs públicas mock. 
- **Para LOGIN**: Usa cualquier usuario de https://reqres.in/api/users/ + contraseña `cityslicka`
- **Para REGISTER**: Solo funciona con `eve.holt@reqres.in` + contraseña `pistol`
- **Los datos no se persisten permanentemente** y se reinician al recargar la página
- **Las operaciones CRUD son simuladas** usando JSONPlaceholder

**Desarrollado con Vue 3, Vite, Tailwind CSS y Docker**