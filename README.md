# 🎬 GIFs App React

**Una aplicación moderna para buscar y gestionar GIFs favoritos, desarrollada con React, TypeScript y Vite.**

## 📸 Capturas de Pantalla

*// TODO: Agregar capturas de pantalla aquí*

## ✨ Características

### 🔍 Búsqueda de GIFs
- **Búsqueda en tiempo real** con integración a la API de Giphy
- **Historial de búsquedas** para acceso rápido a términos anteriores
- **Paginación** para navegar entre resultados
- **Información detallada** de cada GIF (dimensiones, título)

### ❤️ Gestión de Favoritos
- **Agregar/Quitar favoritos** con un solo clic
- **Persistencia local** de favoritos usando localStorage
- **Vista dedicada** para gestionar tus GIFs favoritos
- **Feedback visual** con notificaciones toast

### 📱 Experiencia de Usuario
- **Interfaz moderna** con Tailwind CSS y componentes Radix UI
- **Modo oscuro/claro** implementado con next-themes
- **Tooltips informativos** en todas las acciones
- **Responsive design** para dispositivos móviles y desktop
- **Animaciones fluidas** con Tailwind animations

### 🔧 Funcionalidades Técnicas
- **Descarga de GIFs** directamente desde la aplicación
- **Estado global** manejado con Zustand
- **React Query** para gestión eficiente de datos
- **Testing completo** con Vitest y React Testing Library
- **TypeScript** para tipado estático

## 🚀 Tecnologías Utilizadas

### Core
- **React 19** - Biblioteca de UI
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool y dev server ultrarrápido

### Estado y Datos
- **Zustand** - Gestión de estado global minimalista
- **TanStack Query** - Gestión de estado del servidor y caché
- **Axios** - Cliente HTTP para API requests

### UI/UX
- **Tailwind CSS** - Framework de CSS utility-first
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconos SVG modernos
- **Sonner** - Sistema de notificaciones toast
- **next-themes** - Gestión de temas claro/oscuro

### Routing
- **React Router DOM** - Enrutamiento del lado del cliente
- **@react-router/dev** - Herramientas de desarrollo

### Testing
- **Vitest** - Framework de testing ultrarrápido
- **React Testing Library** - Utilidades de testing para React
- **jsdom** - Implementación de DOM para testing
- **@vitest/coverage-v8** - Reportes de cobertura

### Linting y Formatting
- **ESLint** - Linter de JavaScript/TypeScript
- **TypeScript ESLint** - Reglas específicas de TypeScript

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes UI reutilizables
├── gifs/               # Módulo de GIFs
│   ├── components/     # Componentes específicos de GIFs
│   ├── hooks/         # Hooks personalizados para GIFs
│   └── interfaces/    # Tipos e interfaces
├── shared/            # Componentes compartidos
├── store/             # Estado global con Zustand
├── views/             # Vistas principales de la aplicación
├── routes/            # Configuración de rutas
└── lib/               # Utilidades y configuraciones
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **npm** o **yarn**

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jorditan/gifs-app-react.git
   cd gifs-app-react
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env
   VITE_GIPHY_API_KEY=tu_api_key_de_giphy
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Testing
npm run test         # Ejecuta tests en modo watch
npm run test:only    # Ejecuta tests una sola vez
npm run test:ui      # Interfaz gráfica de tests
npm run coverage     # Reporte de cobertura de tests

# Build
npm run build        # Construye para producción (incluye tests)
npm run preview      # Preview del build de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 🧪 Testing

El proyecto incluye una suite completa de tests:

### Cobertura de Testing
- **Componentes UI** - Tests unitarios para todos los componentes
- **Hooks personalizados** - Testing de lógica de negocio
- **Store de estado** - Validación de acciones y estado
- **Vistas** - Tests de integración para vistas completas
- **Utilidades** - Testing de funciones helper

### Ejecutar Tests
```bash
# Tests en modo watch (recomendado durante desarrollo)
npm run test

# Tests con interfaz gráfica
npm run test:ui

# Reporte de cobertura
npm run coverage
```

## 🎯 Funcionalidades Implementadas

### ✅ Módulo de Favoritos
- [x] Agregar GIFs a favoritos
- [x] Quitar GIFs de favoritos
- [x] Vista dedicada de favoritos
- [x] Persistencia en localStorage
- [x] Indicador visual de estado favorito
- [x] Notificaciones de acciones
- [x] Tests completos del módulo

### ✅ Búsqueda y Navegación
- [x] Integración con API de Giphy
- [x] Búsqueda con términos dinámicos
- [x] Paginación de resultados
- [x] Historial de búsquedas
- [x] Limpieza de historial

### ✅ Descarga de GIFs
- [x] Descarga directa desde la aplicación
- [x] Manejo de errores de descarga
- [x] Feedback visual durante descarga

## 🔄 Estado Global - Zustand Store

El estado de la aplicación se gestiona con Zustand:

```typescript
interface GifsState {
  favoriteGifs: Gif[];     // Lista de GIFs favoritos
  prevTerms: string[];     // Historial de búsquedas
  addFavorite: (gif: Gif) => void;
  removeFavorite: (id: string) => void;
  addPrevTerm: (term: string) => void;
  cleanTerms: () => void;
  clearFavorites: () => void;
}
```

### Persistencia
- Los favoritos se guardan automáticamente en **localStorage**
- El estado se recupera al recargar la página
- Configuración con middleware `persist` de Zustand

## 🎨 Componentes Clave

### ButtonIcon
Componente reutilizable para acciones con tooltips:
```typescript
<ButtonIcon 
  handleAction={() => addFavorite(gif)} 
  variant="outline" 
  tooltipText="Guardar en favoritos" 
  icon={Heart}
/>
```

### GifsContainer
Muestra la grilla de GIFs con acciones de favoritos y descarga

### FavoriteGifsView
Vista dedicada para gestionar GIFs favoritos

### SearchBar
Barra de búsqueda con historial de términos

## 🌐 API Integration

### Giphy API
- **Endpoint**: `https://api.giphy.com/v1/gifs/search`
- **Parámetros**: `api_key`, `q`, `limit`, `offset`
- **Rate limiting**: Manejado por TanStack Query
- **Error handling**: Retry automático y fallbacks

## 🚀 Optimizaciones

### Performance
- **Code splitting** automático con Vite
- **Lazy loading** de componentes pesados
- **Memoización** con React.memo donde es necesario
- **Debounce** en búsquedas para reducir API calls

### UX/UI
- **Loading states** en todas las operaciones async
- **Error boundaries** para manejo de errores
- **Skeleton loading** para mejor percepción de velocidad
- **Toast notifications** para feedback inmediato

## 📈 Métricas de Calidad

- ✅ **TypeScript strict mode** habilitado
- ✅ **100% tipado** - Sin tipos `any`
- ✅ **ESLint clean** - Sin warnings ni errores
- ✅ **Test coverage** > 80%
- ✅ **Componentes accesibles** con Radix UI
- ✅ **Responsive design** verificado

## 🤝 Contribuir

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Guías de Contribución
- Seguir convenciones de TypeScript
- Escribir tests para nuevas funcionalidades
- Mantener cobertura de tests > 80%
- Documentar componentes y funciones complejas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Jorditan** - [GitHub](https://github.com/jorditan)

---

⭐ Si este proyecto te resulta útil, ¡considera darle una estrella!
