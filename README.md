# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
```
/src
  ├── /assets/           # Static assets (images, fonts, etc.)
  ├── /components/       # Reusable components
  ├── /features/         # Feature-specific logic and components (could be feature folders)
  ├── /hooks/            # Custom React hooks
  ├── /layouts/          # Layout components (e.g., Header, Footer, Sidebar)
  ├── /pages/            # Page components (routes)
  ├── /services/         # API requests, utilities, external service integrations
  ├── /store/            # State management (Redux, Zustand, Context API)
  ├── /styles/           # Global styles (CSS, SASS, Styled Components)
  ├── /types/            # TypeScript types (if using TS)
  ├── /utils/            # Utility functions, helpers, and constants
  ├── /app.tsx           # App component (entry point)
  ├── /index.tsx         # Main entry point for React
  ├── /router.tsx        # Routing (React Router setup)
  └── /config/           # Environment variables and configuration files
```
