# Eventify - Ionic React

## Descripción

Eventify es una plataforma móvil diseñada para la gestión de eventos e interacción entre usuarios. Incluye funcionalidades esenciales como la administración de eventos, la conexión entre usuarios y características sociales, tales como seguidores, notificaciones y comentarios.

## Tecnologías Utilizadas

- **Ionic Framework**: Framework para el desarrollo de aplicaciones móviles híbridas.
- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Lenguaje de programación que añade tipado estático a JavaScript.
- **Capacitor**: Plataforma para convertir aplicaciones web en aplicaciones nativas.
- **Supabase**: Plataforma de backend como servicio (BaaS) para autenticación, base de datos y almacenamiento.
- **AsyncStorage**: Para persistencia local de datos.
- **i18next**: Solución de internacionalización.
- **Expo Notifications**: Para implementación de notificaciones push.

## Estructura del Proyecto

```
ionic-app/
├── src/
│   ├── App.tsx                # Componente principal de la aplicación
│   ├── assets/                # Imágenes, fuentes y otros recursos estáticos
│   ├── components/            # Componentes reutilizables
│   ├── views/                 # Vistas principales de la aplicación
│   ├── contexts/              # Contextos de React
│   │   ├── AuthContext.tsx    # Contexto de autenticación
│   │   └── PushNotificationsContext.tsx # Proveedor de notificaciones
│   ├── hooks/                 # Hooks personalizados
│   │   ├── useAudioRecorder.tsx # Hook para grabación de audio
│   │   ├── useCurrentLocation.tsx # Hook para geolocalización
│   │   ├── useImagePicker.tsx # Hook para selección de imágenes
│   │   └── useMusicPicker.tsx # Hook para selección de música
│   ├── models/                # Interfaces y tipos de datos
│   ├── navigation/            # Configuración de navegación
│   │   ├── AppRoutes.tsx      # Rutas principales
│   │   └── AuthRoutes.tsx     # Rutas de autenticación
│   ├── i18n/                  # Configuración de internacionalización
│   ├── services/              # Servicios para API, notificaciones, etc.
│   │   ├── api.ts             # Servicios de API
│   │   ├── auth.ts            # Servicios de autenticación
│   │   ├── events.ts          # Servicios de eventos
│   │   ├── storage.ts         # Servicios de almacenamiento
│   │   └── notifications.ts   # Servicios de notificaciones
│   ├── styles/                # Estilos globales y utilidades CSS
│   ├── theme/                 # Configuración de temas
│   └── utils/                 # Utilidades y helpers
├── public/                    # Archivos públicos estáticos
├── capacitor.config.ts        # Configuración de Capacitor
├── ionic.config.json          # Configuración de Ionic
└── package.json               # Dependencias y scripts
```

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Ionic CLI
- Cuenta en Supabase

## Configuración del Entorno

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd ionic-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Añade las siguientes variables:
     ```
     VITE_SUPABASE_URL=tu_url_de_supabase
     VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
     VITE_API_URL=tu_api_url
     ```

## Ejecución de la Aplicación

### Desarrollo Web

Para iniciar la aplicación en modo desarrollo web:

```bash
ionic serve
```

### Desarrollo en Dispositivos

Para ejecutar en Android:

```bash
ionic cap run android -l --external
```

Para ejecutar en iOS:

```bash
ionic cap run ios -l --external
```

### Compilación

Para compilar la aplicación:

```bash
ionic build
```

Seguido de la sincronización con Capacitor:

```bash
ionic cap sync
```

## Características Principales

- **Autenticación**: Sistema completo de registro, inicio de sesión y recuperación de contraseña
- **Gestión de Eventos**: Creación, edición y visualización de eventos
- **Interacción Social**: Seguimiento de usuarios, comentarios y likes
- **Notificaciones Push**: Alertas en tiempo real para interacciones
- **Búsqueda**: Funcionalidad avanzada para encontrar eventos y usuarios
- **Internacionalización**: Soporte para múltiples idiomas (inglés y español)
- **Interfaz Adaptativa**: Diseño que se ajusta a diferentes dispositivos y plataformas

## Despliegue

### Generación de APK/IPA

Para generar archivos de instalación:

```bash
ionic cap build android  # Para Android (APK)
ionic cap build ios      # Para iOS (requiere Xcode en macOS)
```

## Contacto

Para preguntas o sugerencias, por favor contacta a valeraruggierotesisucv@gmail.com