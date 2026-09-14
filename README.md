# Glúteo Flix — App

App post-compra para el quiz funnel **Glúteo Firme en 30 Días**. Contenido adaptado y
traducido al castellano a partir del guion del VSL "Bumbum na Nuca" (Murilo Herbst):
secuencia activadora, entrenos de glúteo, protocolos bonus y recetas proteicas.

## Estructura
- `index.html` — el esqueleto del app (nav + estilos).
- `app-data.js` — todo el contenido: ejercicios, entrenos, bonos, 51 recetas, testimonios, FAQ.
- `app.js` — el motor (vanilla JS, sin frameworks, 1 solo archivo): onboarding, router,
  tracking de progreso, modales.
- `server.js` — servidor estático minimalista para producción / Railway.

## Cómo funciona
No hay backend todavía: **todo el registro (onboarding, entrenos completados, peso,
medidas, ánimo, fotos, racha) se guarda en `localStorage` del propio dispositivo**, por
eso no hay login real y cada navegador/celular tiene su propio progreso independiente.

### Contenido del programa
- **Onboarding**: nombre, lugar de entreno (casa/gimnasio) y frecuencia (2x/3x/5x por semana).
- **Reto de 21 días**: ciclo semanal de 7 días que se repite 3 veces, armado según la
  frecuencia elegida (Entreno A/B/C + bonos D/E para quienes entrenan 5x).
- **Pre-activación**: siempre antes de cualquier entreno de glúteo (ostra, extensión de
  cadera en la pared, paso lateral con mini band).
- **Bonos**: Protocolo Cuádriceps Proporcional, Protocolo Anti-Celulitis, 2 Entrenos de
  Superiores, 51 Recetas Proteicas, Entreno Express de 20 min, y un Regalo Sorpresa
  (guía de postura + diario de evolución) que se desbloquea en el primer ingreso.
- **Progreso**: check-in de ánimo diario, registro de peso y medidas con mini-gráfico,
  diario de fotos (guardado local) y calendario de constancia con racha.

## Pendiente para que sea un producto real
- **Cuentas de usuario reales** (login, sincronización entre dispositivos) — necesita
  backend + base de datos.
- **Videos de los ejercicios**: hoy cada ejercicio es una tarjeta con nombre/series/técnica,
  sin video del movimiento.
- **Checkout real**: este repo es solo la app de entrega; el link de compra vive en el
  quiz funnel (`Glúteo Firme en 30 Días - quizz`), que debe redirigir acá después del pago.

## Correr en local
```bash
npm start
```
Abrí `http://localhost:3000`.

## Deploy en Railway
Igual que el quiz: **New Project → Deploy from GitHub repo** → elegí este repositorio.
Railway detecta Node automáticamente y corre `npm start`.
