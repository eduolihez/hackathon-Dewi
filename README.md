<div align="center">
  <h1>Dewi App</h1>
  <img src="/docs/img/banner.png" alt="Dewi App Banner">
</div>

---

Dewi App is an innovative solution developed for the 8th edition of the TecnoCampus Hackathon. In collaboration with Aigües de Mataró and MICA, Dewi App is designed to empower citizens with the tools they need to understand and reduce water consumption, fostering a culture of responsible water usage.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Recent Evolutions](#recent-evolutions)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

Dewi App addresses the hackathon challenge **"Apostamos por un uso responsable del agua"** ("We bet on responsible water usage"). The app provides users with a friendly platform to monitor their water consumption, receive actionable insights, and ultimately help promote sustainable water practices.

## Recent Evolutions

The repository has undergone significant improvements and rebranding:
- **New Name & Branding:** The project is now known as **Dewi App**.
- **Enhanced UI/UX:** Redesigned user interface with modern aesthetics and improved responsiveness.
- **Expanded Functionality:** Additional components and hooks have been introduced to better manage data visualization and interactivity.
- **Optimized Performance:** Refactored codebase for faster load times and smoother user experience.
- **Extended Documentation:** A dedicated `docs` folder is available with in-depth guides, API documentation, and architectural details.

## Features

- **Responsive and Modern Design:** Built using Next.js and Tailwind CSS for a seamless mobile and desktop experience.
- **Interactive Data Visualization:** Engage with dynamic graphs and charts that display water consumption data clearly.
- **Actionable Insights:** Receive personalized recommendations to help reduce water usage.
- **Modular Architecture:** Designed with reusable components and custom hooks for easy scalability.
- **Sustainability Focus:** Encourages users to adopt responsible water consumption habits.

## Technology Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm (npm or yarn can also be used)
- **Build Tools:** PostCSS, Vite, and other modern web development tools
- **Additional Libraries:** Refer to the `package.json` file for a full list of dependencies

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/eduolihez/hackathon-Dewi.git
   cd hackathon-Dewi
   ```

2. **Install Dependencies:**

   Using pnpm:
   ```bash
   pnpm install
   ```

   Alternatively, using npm:
   ```bash
   npm install
   ```

   Or with yarn:
   ```bash
   yarn install
   ```

## Usage

To run Dewi App in development mode, execute one of the following commands:

- Using pnpm:
  ```bash
  pnpm dev
  ```

- Using npm:
  ```bash
  npm run dev
  ```

Once the development server is running, open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

The repository is organized as follows:

- **app/**: Contains the main application code, including pages and layout components.
- **components/**: Houses reusable React components.
- **hooks/**: Contains custom React hooks for state management and side effects.
- **lib/**: Utility functions and helper libraries.
- **public/**: Static assets such as images, icons, and fonts.
- **styles/**: Tailwind CSS configurations and custom style definitions.
- **Configuration Files:**
  - `next.config.mjs` – Next.js configuration.
  - `tailwind.config.ts` – Tailwind CSS settings.
  - `postcss.config.mjs` – PostCSS configuration.
  - `tsconfig.json` – TypeScript configuration.
  - `package.json` – Dependency and script definitions.

## Documentation

For additional details—including setup guides, API documentation, and architectural decisions—please refer to the `docs` folder. This folder includes:
- **Getting Started Guides**
- **API Documentation**
- **Design and Architecture Notes**
- **Changelog and Update History**

## Contributing

Contributions to Dewi App are welcome. To contribute:

1. **Fork the Repository**
2. **Create a Feature Branch:** Use a descriptive branch name (e.g., `feature/ui-enhancements`).
3. **Make Your Changes:** Commit your updates with clear messages.
4. **Open a Pull Request:** Provide a detailed description of your changes and reference any relevant issues.

For further details, please consult the contributing guidelines available in `docs/CONTRIBUTING.md` (if provided).

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- **TecnoCampus Hackathon:** For providing the challenge and platform.
- **Aigües de Mataró & MICA:** For their collaboration and support.
- **Contributors:** Thank you to everyone who has contributed to the evolution of Dewi App.