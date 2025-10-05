# ❤️ Módulo de Favoritos - Documentación Técnica

## 📋 Descripción General

El módulo de favoritos permite a los usuarios guardar, gestionar y acceder rápidamente a sus GIFs preferidos. Esta funcionalidad se implementa con persistencia local y una interfaz intuitiva.

## 🏗️ Arquitectura del Módulo

### Componentes Principales

```
src/
├── store/
│   └── useGifsStore.ts          # Store global con lógica de favoritos
├── views/
│   └── FavoriteGifsView.tsx     # Vista principal de favoritos
├── gifs/components/
│   ├── GifsContainer.tsx        # Container con botón de agregar favorito
│   └── FavoriteGifsContainer.tsx # Container específico para favoritos
└── shared/
    └── ButtonIcon.tsx           # Componente de botón reutilizable
```

## 🔄 Gestión de Estado

### Store Principal - `useGifsStore`

```typescript
interface GifsState {
  favoriteGifs: Gif[];                 // Array de GIFs favoritos
  addFavorite: (gif: Gif) => void;     // Agregar GIF a favoritos
  removeFavorite: (id: string) => void; // Quitar GIF de favoritos
  clearFavorites: () => void;          // Limpiar todos los favoritos
}
```

### Funciones del Store

#### `addFavorite(gif: Gif)`
- **Propósito**: Agregar un GIF a la lista de favoritos
- **Validación**: Previene duplicados verificando el ID
- **Feedback**: Muestra notificación toast al agregar
- **Persistencia**: Se guarda automáticamente en localStorage

```typescript
addFavorite: (gif) => {
  set((state) => {
    // Prevenir duplicados
    if (state.favoriteGifs.some((g) => g.id === gif.id)) {
      return state;
    }
    
    // Mostrar notificación
    toast("GIF agregado a favoritos");
    
    // Agregar al estado
    return {
      favoriteGifs: [...state.favoriteGifs, gif],
    };
  });
}
```

#### `removeFavorite(id: string)`
- **Propósito**: Quitar un GIF específico de favoritos
- **Identificación**: Usa el ID único del GIF
- **Filtrado**: Mantiene todos los GIFs excepto el especificado

```typescript
removeFavorite: (id: string) =>
  set((state) => ({
    favoriteGifs: (state.favoriteGifs ?? []).filter(
      (gif) => gif.id !== id,
    ),
  }))
```

#### `clearFavorites()`
- **Propósito**: Limpiar completamente la lista de favoritos
- **Uso**: Para reset manual o limpieza masiva

## 🎨 Componentes UI

### ButtonIcon - Componente Reutilizable

```typescript
interface Props {
  tooltipText: string;
  icon: LucideIcon;
  variant: "outline" | "default" | "destructive" | etc.;
  handleAction: () => void;
}
```

**Características**:
- Tooltip informativo en hover
- Iconos de Lucide React
- Variantes de estilo con Tailwind
- Accesibilidad completa con Radix UI

### GifsContainer - Vista de Búsqueda

```typescript
export const GifsContainer: FC<Props> = ({ gifs, onDownloadClick }) => {
  const { addFavorite } = useGifsStore();
  const favorites = useGifsStore(s => s.favoriteGifs);
  
  // Función para verificar si un GIF ya es favorito
  const isFav = (gif: Gif) => favorites.some(f => f.id == gif.id);
  
  return (
    <div className="gifs-container">
      {gifs.map((gif) => (
        <div key={gif.id} className="gif-card">
          <img src={gif.url} alt={gif.title} />
          <div className="actions">
            <ButtonIcon 
              handleAction={() => addFavorite(gif)} 
              variant="outline" 
              tooltipText={isFav(gif) ? "Quitar de favoritos" : "Guardar en favoritos"} 
              icon={isFav(gif) ? HeartOff : Heart}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
```

### FavoriteGifsContainer - Vista de Favoritos

```typescript
export const FavoriteGifsContainer: FC<Props> = ({ gifs, onDownloadClick }) => {
  const { removeFavorite } = useGifsStore();
  
  return (
    <div className="gifs-container">
      {gifs.length === 0 && (
        <p className="text-center">
          Aquí veras todos los GIF´s que hayas marcado como tus favoritos
        </p>
      )}
      
      {gifs.map((gif) => (
        <div key={gif.id} className="gif-card">
          <img src={gif.url} alt={gif.title} />
          <div className="actions">
            <ButtonIcon 
              handleAction={() => removeFavorite(gif.id)} 
              variant="outline" 
              tooltipText="Quitar de favoritos" 
              icon={HeartOff}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
```

## 💾 Persistencia de Datos

### Configuración de Zustand Persist

```typescript
export const useGifsStore = create<GifsState>()(
  persist(
    (set) => ({
      favoriteGifs: [],
      // ... funciones del store
    }),
    {
      name: "favorite-gifs-storage", // Clave en localStorage
    },
  ),
);
```

**Características de la persistencia**:
- **Automática**: Se guarda en cada cambio de estado
- **Recuperación**: Se restaura al cargar la aplicación
- **Clave única**: `favorite-gifs-storage` en localStorage
- **Serialización**: JSON automático por Zustand

### Estructura en localStorage

```json
{
  "state": {
    "favoriteGifs": [
      {
        "id": "abc123",
        "title": "Funny Cat GIF",
        "url": "https://media.giphy.com/media/abc123/giphy.gif",
        "width": 480,
        "height": 270
      }
    ],
    "prevTerms": ["cats", "funny", "memes"]
  },
  "version": 0
}
```

## 🎯 Flujos de Usuario

### Flujo: Agregar Favorito

1. **Usuario busca GIFs** → `SearchGifsView`
2. **Ve resultado** → `GifsContainer`
3. **Hace clic en ❤️** → `addFavorite(gif)`
4. **Sistema verifica duplicados** → `some(g => g.id === gif.id)`
5. **Si es nuevo, agrega** → `[...favoriteGifs, gif]`
6. **Muestra notificación** → `toast("GIF agregado...")`
7. **Persiste automáticamente** → localStorage

### Flujo: Ver Favoritos

1. **Usuario navega a favoritos** → `/favorites`
2. **Se carga FavoriteGifsView** → `FavoriteGifsContainer`
3. **Lee del store** → `useGifsStore(s => s.favoriteGifs)`
4. **Renderiza lista** → cards con acciones

### Flujo: Quitar Favorito

1. **Usuario está en vista favoritos** → `FavoriteGifsView`
2. **Hace clic en 💔** → `removeFavorite(gif.id)`
3. **Sistema filtra por ID** → `filter(gif => gif.id !== id)`
4. **Actualiza UI inmediatamente** → React re-render
5. **Persiste automáticamente** → localStorage

## 🧪 Testing

### Tests del Store

```typescript
// useGifsStore.test.ts
describe('useGifsStore - Favorites', () => {
  it('should add gif to favorites', () => {
    const { result } = renderHook(() => useGifsStore());
    
    act(() => {
      result.current.addFavorite(mockGif);
    });
    
    expect(result.current.favoriteGifs).toHaveLength(1);
    expect(result.current.favoriteGifs[0]).toEqual(mockGif);
  });

  it('should not add duplicate favorites', () => {
    const { result } = renderHook(() => useGifsStore());
    
    act(() => {
      result.current.addFavorite(mockGif);
      result.current.addFavorite(mockGif); // Intento duplicar
    });
    
    expect(result.current.favoriteGifs).toHaveLength(1);
  });

  it('should remove gif from favorites', () => {
    const { result } = renderHook(() => useGifsStore());
    
    act(() => {
      result.current.addFavorite(mockGif);
      result.current.removeFavorite(mockGif.id);
    });
    
    expect(result.current.favoriteGifs).toHaveLength(0);
  });
});
```

### Tests de Componentes

```typescript
// FavoriteGifsView.test.tsx
describe('FavoriteGifsView', () => {
  it('should show empty state when no favorites', () => {
    render(<FavoriteGifsView />);
    
    expect(screen.getByText(/aquí veras todos los GIF´s/i))
      .toBeInTheDocument();
  });

  it('should display favorite gifs', () => {
    // Mock store con favoritos
    const { result } = renderHook(() => useGifsStore());
    act(() => result.current.addFavorite(mockGif));
    
    render(<FavoriteGifsView />);
    
    expect(screen.getByAltText(mockGif.title)).toBeInTheDocument();
  });

  it('should remove gif when clicking remove button', () => {
    const user = userEvent.setup();
    render(<FavoriteGifsView />);
    
    const removeButton = screen.getByLabelText(/quitar de favoritos/i);
    await user.click(removeButton);
    
    expect(screen.getByText(/aquí veras todos los GIF´s/i))
      .toBeInTheDocument();
  });
});
```

## 🔍 Casos de Uso

### Caso 1: Usuario Nuevo
- No tiene favoritos guardados
- Ve estado vacío con mensaje informativo
- Puede agregar su primer favorito desde búsqueda

### Caso 2: Usuario Recurrente
- Carga favoritos desde localStorage
- Ve su colección existente
- Puede agregar/quitar favoritos fácilmente

### Caso 3: Gestión Masiva
- Usuario puede limpiar todos los favoritos
- Función `clearFavorites()` disponible
- Confirmación recomendada en UI

## 🐛 Manejo de Errores

### Errores Comunes y Soluciones

1. **localStorage lleno**
   - Implementar límite de favoritos
   - Comprimir datos o limpiar antiguos
   
2. **GIF ya no existe**
   - Validar URLs antes de mostrar
   - Fallback a imagen placeholder
   
3. **Corrupción de datos**
   - Validación de schema al cargar
   - Reset automático si datos inválidos

### Validaciones Implementadas

```typescript
// Validación de duplicados
if (state.favoriteGifs.some((g) => g.id === gif.id)) {
  return state; // No agregar duplicado
}

// Validación de existencia al quitar
favoriteGifs: (state.favoriteGifs ?? []).filter(
  (gif) => gif.id !== id,
)
```

## 🚀 Mejoras Futuras

### Funcionalidades Propuestas

1. **Categorías de Favoritos**
   ```typescript
   interface FavoriteCategory {
     id: string;
     name: string;
     gifs: Gif[];
   }
   ```

2. **Sincronización en la Nube**
   ```typescript
   interface CloudSync {
     syncToCloud: () => Promise<void>;
     syncFromCloud: () => Promise<void>;
   }
   ```

3. **Orden Personalizado**
   ```typescript
   interface SortableGifs {
     reorderFavorites: (startIndex: number, endIndex: number) => void;
   }
   ```

4. **Exportación/Importación**
   ```typescript
   interface DataPortability {
     exportFavorites: () => string;
     importFavorites: (data: string) => void;
   }
   ```

### Optimizaciones Técnicas

1. **Lazy Loading**: Cargar favoritos bajo demanda
2. **Virtual Scrolling**: Para listas muy largas
3. **Compresión**: Reducir tamaño en localStorage
4. **Caché Inteligente**: Precargar GIFs frecuentes

## 📊 Métricas y Análisis

### KPIs Sugeridos

- **Tasa de uso de favoritos**: % usuarios que agregan favoritos
- **Promedio de favoritos**: Cantidad media por usuario
- **Retención**: Usuarios que vuelven a ver favoritos
- **Conversión**: De búsqueda a favorito

### Eventos de Tracking

```typescript
// Eventos sugeridos para analytics
trackEvent('favorite_added', { gif_id, search_term });
trackEvent('favorite_removed', { gif_id });
trackEvent('favorites_viewed', { count });
trackEvent('favorites_cleared', { previous_count });
```

---

## 🎯 Resumen

El módulo de favoritos es una implementación robusta que combina:

- **Estado global eficiente** con Zustand
- **Persistencia automática** con localStorage
- **UI/UX intuitiva** con componentes accesibles
- **Testing completo** para confiabilidad
- **Arquitectura escalable** para futuras mejoras

La implementación actual provee una base sólida para la gestión de favoritos, con potencial para expansion hacia funcionalidades más avanzadas como categorización, sincronización y análisis de uso.