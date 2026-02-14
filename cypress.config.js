// noinspection JSCheckFunctionSignatures

import {defineConfig} from "cypress";

export default defineConfig({
  e2e: {
    // No clear assets
    trashAssetsBeforeRerun: false,
    trashAssetsBeforeSpec: false,
    // Implement node event listeners here
    setupNodeEvents() {
      // pass
    },
    screenshotsFolder: 'cypress/screenshots',
    screenshotOnRunFailure: true,
  },
  allowCypressEnv: false,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.js',
  },
});
