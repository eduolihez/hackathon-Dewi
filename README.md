<!-- Banner -->
<p align="center">
  <img src="docs/img/banner.png" alt="Dewi App Banner" width="800"/>
</p>

# Dewi App

### **[Versión en Español](README.md)** · [English version](README.en.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-blue.svg)](https://vercel.com)
[![Status: Prototype](https://img.shields.io/badge/Status-Prototype-orange.svg)](https://dewi-hackathon.vercel.app)
[![Build Time](https://img.shields.io/badge/Built_in-24h-red.svg)](https://github.com/eduolihez/hackathon-Dewi)

---

## Resumen

**Dewi App** es un prototipo hecho para la 8ª edición del Hackathon de TecnoCampus. Ayuda a monitorizar y reducir el consumo de agua, fomentando un uso más responsable. No es un producto acabado ni listo para producción, es un prototipo montado en menos de **24 horas**.

Prueba la demo en vivo: [dewi-hackathon.vercel.app](https://dewi-hackathon.vercel.app)

> **Sobre la carpeta `Prototip/`:** ahí está la versión original de la noche del hackathon,
> el sketch de Arduino y los scripts en Python para el sensor físico de caudal de agua, además
> de la primera versión de la web. Se mantiene como archivo histórico; la app en la raíz del
> repositorio es la entrega pulida que describe este README.

---

## Índice

- [Dewi App](#dewi-app)
  - [Resumen](#resumen)
  - [Índice](#índice)
  - [Funcionalidades](#funcionalidades)
  - [Stack Tecnológico](#stack-tecnológico)
  - [Instalación](#instalación)
  - [Uso](#uso)
  - [Roadmap](#roadmap)
  - [Contribuir](#contribuir)
  - [Aviso](#aviso)
  - [Licencia](#licencia)
  - [Colaboradores](#colaboradores)

---

## Funcionalidades

- **Monitorización del consumo de agua:** datos e información sobre el uso de agua.
- **Empoderamiento del usuario:** consejos prácticos para fomentar un uso más responsable.
- **UI/UX moderna:** diseño responsive que funciona bien en cualquier dispositivo.
- **Puesta en marcha rápida:** prototipo construido a toda velocidad para la demo.

---

## Stack Tecnológico

- **Framework:** Next.js
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Despliegue:** Vercel

---

## Instalación

Para correr el proyecto en local:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/eduolihez/hackathon-Dewi.git
   cd hackathon-Dewi
   ```

2. **Instala las dependencias:**

   El lockfile que hay commiteado es el de npm, así que ese es el camino reproducible:
   ```bash
   npm install --legacy-peer-deps
   ```
   Hace falta `--legacy-peer-deps` porque `react-day-picker@8.10.1` todavía no ha
   publicado rangos de peer dependencies que cubran React 19 / date-fns 4, aunque
   en la práctica ambos funcionan sin problema.

3. **Arranca el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

4. **Abre el navegador:**

   Ve a [http://localhost:3000](http://localhost:3000) para ver la app funcionando.

---

## Uso

Dewi App es un prototipo pensado para mostrar ideas en torno al ahorro de agua. Al explorarla, ten en cuenta que algunas funciones pueden estar incompletas o simplificadas: se construyó muy rápido.

- **Dashboard:** una vista general de los datos de consumo de agua.
- **Insights:** consejos y sugerencias para ahorrar agua.
- **Ajustes de usuario:** personaliza tu experiencia (funciones a nivel prototipo).

---

## Roadmap

Dado lo rápido que se construyó (menos de 24 horas), los siguientes pasos probables incluyen:

- Integración completa con datos de consumo de agua en tiempo real.
- Mejor autenticación de usuarios y persistencia de datos.
- Más funciones interactivas y analíticas más detalladas.
- Mejoras de UI/UX según el feedback de los usuarios.

---

## Contribuir

Se agradecen contribuciones y feedback. Si quieres ayudar a mejorar el prototipo:

1. Haz un fork del repositorio.
2. Crea una rama de feature (`git checkout -b feature/tu-feature`).
3. Haz commit de tus cambios (`git commit -m 'Añade alguna feature'`).
4. Haz push a tu rama (`git push origin feature/tu-feature`).
5. Abre un pull request describiendo tus cambios.

Para cambios grandes, abre antes un issue para comentarlo.

---

## Aviso

**Nota:** este proyecto es un prototipo construido en menos de 24 horas para el Hackathon de TecnoCampus. No está completamente funcional ni listo para producción, todo lo que hay aquí está sujeto a más trabajo.

---

## Licencia

Licenciado bajo MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## Colaboradores

Para consultas o más información, contacta con:

- **Edu Olivares**: [GitHub](https://github.com/eduolihez) | [LinkedIn](https://linkedin.com/in/eduolihez)
- **Marc Lumbreras**: [GitHub](https://github.com/theroboters) | [LinkedIn](https://linkedin.com/in/marclumbreras)
- **Nil Sentís**: [GitHub](https://github.com/nilsentechnocampus) | [LinkedIn](https://linkedin.com/in/nil-sent%C3%ADs-bernal-a57172307)
- **Jan Naranjo**: [LinkedIn](https://linkedin.com/in/jannaranjobanaset)
- **Martí Jímenez**: [LinkedIn](https://linkedin.com/in/martijimenezcovas)
---

*¡Feliz ahorro de agua!*
