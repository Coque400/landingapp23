# Aventuria App · Landing de lanzamiento

Landing responsiva para generar expectativa alrededor del próximo lanzamiento de Aventuria App.

## Abrir el proyecto

1. Instala las dependencias con `npm install`.
2. Inicia la vista local con `npm run dev`.
3. Abre `http://localhost:3000` en tu navegador.

Para crear la versión final optimizada, ejecuta `npm run build`.

## Experiencia y animaciones

- Entrada del hero por líneas y capas, con gradiente iA y ruta animada.
- Mockup interactivo construido con la pantalla original del kit de Aventuria.
- Composición de tres iPhone con vistas de exploración, wallet y agente iA.
- Subsección de productos con Wallet Aventuria, Wallet Libre y Financiamiento.
- Íconos individuales de wallet, cochinito y cámara dentro de sus tarjetas.
- Integración discreta del respaldo de Kuspit Casa de Bolsa en desktop.
- Ondas animadas que conectan visualmente la narrativa entre secciones.
- Profundidad e inclinación suave según la posición del cursor.
- Revelados coordinados al avanzar, ticker cinético y secciones sticky.
- Conversación progresiva del agente iA y barras de metas animadas.
- Formulario con foco, validación, envío y confirmación visual.
- Adaptación móvil, menos capas flotantes y movimiento simplificado.
- Soporte completo para `prefers-reduced-motion`.

## Estructura principal

- `app/page.tsx`: contenido, interacciones y formulario.
- `app/globals.css`: sistema visual, responsive y animaciones.
- `public/assets`: identidad y materiales de producto.
- `public/design`: prototipo original de la app utilizado en el mockup.

El formulario demuestra todos sus estados en el navegador. Para guardar registros reales deberá conectarse al servicio de formularios o CRM elegido por Aventuria.
