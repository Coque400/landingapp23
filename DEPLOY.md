# Aventuria App · Guía de despliegue

Landing page bilingüe (ES/EN) construida con Next.js 16 sobre vinext (Vite + Cloudflare Workers). Incluye un endpoint serverless `/api/waitlist` que guarda registros de la lista de espera en Google Sheets.

## Requisitos

- Node.js 22.13 o superior
- npm

## Instalación y prueba local

```bash
npm install
cp .env.example .env.local   # completar con los valores reales (se entregan por separado)
npm run dev                  # abre http://localhost:3000
```

## Variables de entorno (obligatorias)

| Variable | Descripción |
| --- | --- |
| `GOOGLE_APPS_SCRIPT_URL` | URL del Web App de Google Apps Script que escribe en la hoja de cálculo |
| `WAITLIST_SECRET` | Clave compartida que valida las escrituras |

Los valores reales NO están en este paquete. Solicitarlos a Daniel por un canal seguro (gestor de contraseñas o mensaje cifrado). Nunca subirlos al repositorio ni exponerlos en el navegador: solo viven en el servidor.

## Build de producción

```bash
npm run build
npm run start   # sirve el build localmente para verificación
```

## Opciones de hosting

**Cloudflare (recomendado).** El proyecto ya está configurado para Workers vía wrangler. Con una cuenta de Cloudflare: `npx wrangler login` y `npx wrangler deploy`. Las variables se cargan con `npx wrangler secret put GOOGLE_APPS_SCRIPT_URL` y `npx wrangler secret put WAITLIST_SECRET`. Luego, en el dashboard de Cloudflare, asociar el dominio real al Worker.

**Vercel / Netlify / Node propio.** Es una app Next.js estándar: importar el repo, definir las dos variables de entorno en el panel del proveedor y desplegar. Comando de build: `npm run build`.

## Dominio

Apuntar el dominio al proveedor elegido (CNAME o nameservers según el caso) y activar HTTPS. Verificar después del despliegue:

1. La página carga en `/` y detecta idioma del navegador (probar con navegador en inglés y en español).
2. El formulario de la lista de espera responde: un envío de prueba debe aparecer en la hoja "Lista de espera Aventuria App".
3. Un segundo envío con el mismo correo responde como duplicado sin crear fila nueva.

## Notas

- La carpeta `preview-safari/` es solo una vista previa estática local; no subirla al servidor.
- `tests/` incluye una prueba del HTML renderizado: `npm test`.
- Pendientes de negocio antes del lanzamiento público: aviso de privacidad y mecanismo de baja de la lista.
