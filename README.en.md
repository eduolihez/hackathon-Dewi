<!-- Banner -->
<p align="center">
  <img src="docs/img/banner.png" alt="Dewi App Banner" width="800"/>
</p>

# Dewi App

### [Versión en Español](README.md) · **[English version](README.en.md)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-blue.svg)](https://vercel.com)
[![Status: Prototype](https://img.shields.io/badge/Status-Prototype-orange.svg)](https://dewi-hackathon.vercel.app)
[![Build Time](https://img.shields.io/badge/Built_in-24h-red.svg)](https://github.com/eduolihez/hackathon-Dewi)

---

## Overview

**Dewi App** is a prototype built for the 8th edition of the TecnoCampus Hackathon. It helps people track and cut down their water use, nudging them toward more responsible habits. It's not a finished, production-ready product, just a prototype put together in under **24 hours**.

Try the live demo: [dewi-hackathon.vercel.app](https://dewi-hackathon.vercel.app)

> **About the `Prototip/` folder:** that's the original hackathon-night build,
> the Arduino sketch and Python scripts for the physical water-flow sensor, plus
> the first version of the web app. We kept it for the record; the app at the repo
> root is the polished submission this README describes.

---

## Table of Contents

- [Dewi App](#dewi-app)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Roadmap](#roadmap)
  - [Contributing](#contributing)
  - [Disclaimer](#disclaimer)
  - [License](#license)
  - [Collaborators](#collaborators)

---

## Features

- **Water use tracking:** see data and insights on how much water you're using.
- **User empowerment:** practical tips to encourage more responsible use.
- **Modern UI/UX:** a responsive design that works well across devices.
- **Quick setup:** built fast, for demo purposes.

---

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

## Installation

To run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/eduolihez/hackathon-Dewi.git
   cd hackathon-Dewi
   ```

2. **Install dependencies:**

   The committed lockfile is npm's, so that's the reproducible path:
   ```bash
   npm install --legacy-peer-deps
   ```
   `--legacy-peer-deps` is required because `react-day-picker@8.10.1` hasn't
   published peer ranges covering React 19 / date-fns 4 yet, even though both
   work fine here.

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**

   Go to [http://localhost:3000](http://localhost:3000) to see the app running.

---

## Usage

Dewi App is a prototype meant to showcase ideas around water conservation. While you're exploring it, keep in mind some features may be incomplete or simplified: it was built fast.

- **Dashboard:** an overview of water use data.
- **Insights:** tips and suggestions for saving water.
- **User settings:** customize your experience (prototype-level features).

---

## Roadmap

Given the rapid build (under 24 hours), likely next steps include:

- Full integration with real-time water usage data.
- Better user authentication and data persistence.
- More interactive features and deeper analytics.
- UI/UX refinements based on user feedback.

---

## Contributing

Contributions and feedback are welcome. If you'd like to help improve the prototype:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request describing your changes.

For anything big, open an issue first so we can discuss it.

---

## Disclaimer

**Note:** this project is a prototype built in under 24 hours for the TecnoCampus Hackathon. It's not fully functional or production-ready, everything here is subject to further work.

---

## License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Collaborators

For questions or more info, reach out to:

- **Edu Olivares**: [GitHub Profile](https://github.com/eduolihez) | [LinkedIn](https://linkedin.com/in/eduolihez)
- **Marc Lumbreras**: [GitHub Profile](https://github.com/theroboters) | [LinkedIn](https://linkedin.com/in/marclumbreras)
- **Nil Sentís**: [GitHub Profile](https://github.com/nilsentechnocampus) | [LinkedIn](https://linkedin.com/in/nil-sent%C3%ADs-bernal-a57172307)
- **Jan Naranjo**: [LinkedIn](https://linkedin.com/in/jannaranjobanaset)
- **Martí Jímenez**: [LinkedIn](https://linkedin.com/in/martijimenezcovas)
---

*Happy Water Saving!*
