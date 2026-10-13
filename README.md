# Zephyrus — Developer Portfolio

A personal developer portfolio built with React and Vite, featuring a Matrix-inspired aesthetic, animated digital rain, and a terminal-style interface.

The project presents my background, technical skills, selected projects, and contact information through an interactive, responsive experience.

## Preview

**Live Demo:** [View Portfolio](https://mhazeemshafi.github.io/hazeemportfoliov2/)

## Features

* **Matrix-inspired interface** with a dark, green-accented visual theme.
* **Animated digital rain** background.
* **Terminal-style design** for a distinctive developer experience.
* **About and Education** sections presenting my background.
* **Skills and Projects** sections highlighting technologies and work.
* **Contact links** for connecting professionally.
* **Responsive layout** for desktop and mobile screens.

## Tech Stack

| Technology | Purpose                                    |
| ---------- | ------------------------------------------ |
| React      | UI components and application structure    |
| Vite       | Development server and build tooling       |
| JavaScript | Application logic and interactions         |
| CSS        | Styling, animations, and responsive layout |
| HTML5      | Application entry point                    |

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS recommended)
* npm
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/MHazeemshafi/hazeemportfoliov2.git
cd hazeemportfoliov2
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files are placed in the `dist/` directory.

## Project Structure

```text
hazeemportfoliov2/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Deployment

This project can be deployed using GitHub Pages or another static hosting provider.

For GitHub Pages, configure Vite's `base` path to match the repository name when deploying to a repository-specific URL:

```js
export default {
  base: '/hazeemportfoliov2/',
}
```

If using `vite.config.js`, add the `base` option to the existing configuration rather than replacing other settings. Then build and deploy the generated `dist/` directory using your chosen GitHub Pages workflow.

## Author

**Mohammed Hazeem Shafi**

* GitHub: [@MHazeemshafi](https://github.com/MHazeemshafi)
* LinkedIn: [Mohammed Hazeem Shafi](https://in.linkedin.com/in/mohammed-hazeem-shafi-b06aa9386)
* Portfolio: [HazeemPortfolio](https://mhazeemshafi.github.io/HazeemPortfolio/)

---

*Built with React, Vite, and a little inspiration from the Matrix.*

