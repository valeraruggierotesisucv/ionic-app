# Eventify - Ionic React

## Descripción

Eventify es una plataforma móvil diseñada para la gestión de eventos e interacción entre usuarios. Incluye funcionalidades esenciales como la administración de eventos, la conexión entre usuarios y características sociales, tales como seguidores, notificaciones y comentarios.

## Demostración

[![Eventify Demo](https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//VideosThumbnail.png)](https://youtu.be/5qaMUsTg-lM)

*Haz clic en la imagen para ver la demostración en YouTube*

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Lenguaje de programación que añade tipado estático a JavaScript
- **Capacitor**: Plataforma para convertir aplicaciones web en aplicaciones nativas
- **Supabase**: Plataforma de backend como servicio (BaaS) para autenticación, base de datos y almacenamiento
- **i18next**: Solución de internacionalización
- **Cypress - Vitest - React Testing Library**: Bibliotecas para el desarrollo de pruebas unitarias y de integración

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
│   │   └── useFilePicker.tsx # Hook para selección de música
│   ├── models/                # Interfaces y tipos de datos
│   ├── navigation/            # Configuración de navegación
│   ├── i18n/                  # Configuración de internacionalización
│   ├── services/              # Servicios 
│   │   ├── storage.ts         # Servicios de almacenamiento
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
   git clone https://github.com/valeraruggierotesisucv/ionic-app.git
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
ionic capacitor run android -l --external
```

## Despliegue

### Generación de APK

Para generar archivos de instalación:

```bash
ionic capacitor build android 
```

## Contacto

Para preguntas o sugerencias, por favor contacta a valeraruggierotesisucv@gmail.com
