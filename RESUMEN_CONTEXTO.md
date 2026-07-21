# Resumen de contexto: landing de Aventuria App

## Objetivo del proyecto

Desarrollar y perfeccionar una landing page bilingüe para generar expectativa alrededor de Aventuria App. La propuesta combina planeación de viajes con inteligencia artificial, ahorro con rendimientos y opciones de financiamiento.

La página debe sentirse premium, tecnológica y vinculada visualmente con los viajes, manteniendo la identidad azul y cian de Aventuria.

## Dirección de comunicación

### Hero

- Título aprobado: **El viaje que imaginas puede empezar hoy.**
- Texto aprobado: **Con la App de Aventuria, descubre destinos nuevos con tu agente IA, cotiza y ahorra usando wallets únicas pensadas para los viajeros como tú.**
- El bloque muestra un iPhone con la interfaz de Aventuria, tarjetas flotantes de contexto y elementos gráficos sutiles.
- El cuadro **Tu agente IA** se movió para evitar que cubra información importante del teléfono.

### Sección “Un viaje que empieza contigo”

Texto principal:

> Haz el test para que IAn (nuestro agente de viajes con IA) conozca tus intereses, presupuesto y ritmo. Pregunta, ajusta y descubre posibilidades sin saltar entre pestañas.

Beneficios incluidos:

1. Acceso a un enorme portafolio exclusivo de hoteles y actividades para vacaciones espectaculares.
2. Acceso en tiempo real a disponibilidad de vuelos y hoteles.
3. Posibilidad de intercambiar ideas con IAn y pasar con un asesor humano para pulir el viaje.
4. IA entrenada por expertos en viajes.

Cambios visuales solicitados:

- Sustituir números por íconos relacionados con cada beneficio.
- Incorporar fotografías de Maldivas, Patagonia, Cartagena y Santorini.
- Mantener Santorini correctamente alineada y mover Patagonia hacia la izquierda.
- Agregar líneas punteadas, rutas de avión, blurs intencionales y elementos evocativos de viaje.
- Usar el personaje de IAn recortado, sin fondo ni remanentes de la imagen original.

### Sección “Tu viaje también es una meta”

- Presenta mockups de iPhone con las pantallas de inicio, exploración, wallet y conversación.
- Los screenshots fueron ajustados dentro de marcos de teléfono y se agregaron fotografías reales en las tarjetas de destinos.
- El orden de la página coloca **Del deseo al destino** después de este bloque.

### Productos financieros

Encabezado aprobado:

> **Viajar nunca había estado tan a tu alcance.**
> Ahorra con rendimientos o consigue financiamiento sin garantías.

Las tres tarjetas deben conservar el mismo tamaño y altura, sin animaciones cinemáticas de entrada.

#### Wallet Aventuria

- Ahorra para tu viaje y haz crecer tu dinero.
- Rendimientos sobre el ahorro.
- Seguro de viajero internacional.
- Datos celulares en el destino.
- Beneficios exclusivos.
- Respaldada por Kuspit Casa de Bolsa.
- CTA: **Empieza a ahorrar**.
- Ícono: cartera glassmorphista azul con fondo transparente.

#### Wallet Libre

- Ahorra hoy y decide el destino después.
- Rendimientos sobre el saldo.
- Libertad para decidir posteriormente.
- Disponibilidad del dinero.
- Respaldada por Kuspit Casa de Bolsa.
- CTA: **Crea tu fondo de viaje**.
- Ícono: alcancía glassmorphista azul con fondo transparente.

#### Financiamiento

- Viaja ahora y paga después.
- Tasa competitiva del 38%, sin garantías.
- Proceso simple y pagos mensuales.
- Respaldada por Credipyme.
- CTA: **Consulta tus opciones**.
- Ícono: cámara glassmorphista azul con fondo transparente.

Los íconos deben permanecer dentro de sus tarjetas, sin recortes ni superposición con el texto.

### Tabla comparativa

El bloque anterior de “Cuatro momentos” fue reemplazado por una tabla transparente con blurs azules y cian.

Título: **Planear un viaje ya no tiene que sentirse como trabajo.**

| Planear por tu cuenta | Planear con Aventuria |
| --- | --- |
| Decenas de pestañas | Una sola conversación |
| Opciones genéricas | Recomendaciones personalizadas |
| Presupuesto desconectado | Wallet y financiamiento integrados |
| Tú resuelves los problemas | Respaldo de un asesor humano |

### Acceso anticipado

- La tarjeta tiene formato de boleto de avión o boarding pass.
- El fondo usa una fotografía desde un avión, recortada para mostrar claramente el ala.
- Tiene un efecto 3D hover tilt y parallax sutil vinculado al scroll.
- La animación respeta `prefers-reduced-motion` y se desactiva en pantallas pequeñas.

### Cierre

Texto aprobado:

> **Una nueva forma de planear, ahorrar y hacer realidad tu próximo viaje.**

## Comportamiento bilingüe

- La landing incluye contenido completo en español e inglés.
- Detecta el idioma del navegador.
- Si el navegador está configurado en inglés, muestra automáticamente la versión inglesa.
- Los screenshots de la app también cambian según el idioma.

## Animaciones y movimiento

- Se mantienen ondas, órbitas, líneas de viaje, ticker animado y parallax sutil.
- La tira cian repite **Planea, Ahorra, Financia y Viaja** con separación constante.
- Se revirtió la animación cinemática de las tarjetas financieras porque afectaba la composición y las alturas.
- El boarding pass conserva una interacción premium y controlada con inclinación, desplazamiento y sombra dinámica.

## Integración del formulario con Google Sheets

El formulario dejó de ser una simulación y ahora guarda registros reales.

### Datos almacenados

- Fecha y hora.
- Nombre.
- Correo electrónico.
- Idioma.
- Página u origen del formulario.
- Estado.
- Consentimiento de acceso anticipado.

### Comportamiento

- Valida nombre y correo antes del envío.
- Muestra estados de guardado, éxito y error en español e inglés.
- Evita filas duplicadas cuando se utiliza el mismo correo.
- La clave de conexión se mantiene en el servidor y no se expone en el navegador.
- Existe una fila de prueba identificada como **Prueba integración Aventuria**.

### Hoja de registros

[Lista de espera Aventuria App](https://docs.google.com/spreadsheets/d/1YeHEwkIevpK_xJ-_65KN2HSPTK3As9hXoT29UIKaAM4/edit#gid=0)

## Estado técnico al cierre de la conversación

- La compilación del sitio terminó correctamente.
- La ruta del formulario es `/api/waitlist`.
- La prueba de registro respondió correctamente.
- La prueba de correo duplicado respondió con `duplicate: true`.
- `http://localhost:3000/` fue reiniciado y quedó funcionando en la última verificación.
- Se creó una versión privada en Sites. En la última consulta seguía pendiente de publicación y todavía no tenía una URL disponible.

## Archivos principales

- `app/page.tsx`: contenido, traducciones, componentes, formulario y animaciones.
- `app/globals.css`: estilos, composición responsive, mockups y efectos visuales.
- `app/api/waitlist/route.ts`: validación y conexión segura del formulario.
- `app/layout.tsx`: metadatos generales del sitio.
- `public/assets/`: screenshots, imágenes de destinos, personaje de IAn, logos e íconos.
- `.openai/hosting.json`: configuración del proyecto de alojamiento.

## Pendientes recomendados

1. Confirmar que la publicación privada de Sites haya terminado y recuperar su URL.
2. Probar un envío real desde la versión alojada, no solo desde localhost.
3. Revisar visualmente los marcos de iPhone en desktop y móvil después de cualquier cambio de tamaño.
4. Decidir si se elimina la fila de prueba de Google Sheets.
5. Definir el proceso operativo para contactar, segmentar o exportar a los suscriptores.
6. Preparar aviso de privacidad y mecanismo de baja antes del lanzamiento público.

## Nota de seguridad

No incluir claves privadas, secretos del formulario ni credenciales de Google en documentación compartida. Los valores sensibles están configurados como variables privadas del entorno.
