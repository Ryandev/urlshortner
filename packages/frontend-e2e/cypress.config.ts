import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

console.error(`config ${JSON.stringify(nxE2EPreset(__dirname))}`); // Tmp

export default defineConfig({
    e2e: nxE2EPreset(__dirname),
});
