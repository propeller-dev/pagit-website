import {execSync} from 'child_process';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

const TERMS_CONTENT_PATH = 'src/content/terms-of-service-content.ts';
const TERMS_LAST_UPDATED_FALLBACK = '2026-03-31';
const PRIVACY_CONTENT_PATH = 'src/content/privacy-policy-content.ts';
const PRIVACY_LAST_UPDATED_FALLBACK = '2026-03-31';

function getTermsLastUpdatedIso() {
  try {
    const output = execSync(`git log -1 --format=%cs -- ${TERMS_CONTENT_PATH}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(output)) {
      return output;
    }
  } catch {
    // Fall back when git metadata is unavailable in the build environment.
  }

  return TERMS_LAST_UPDATED_FALLBACK;
}

function getPrivacyLastUpdatedIso() {
  try {
    const output = execSync(`git log -1 --format=%cs -- ${PRIVACY_CONTENT_PATH}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(output)) {
      return output;
    }
  } catch {
    // Fall back when git metadata is unavailable in the build environment.
  }

  return PRIVACY_LAST_UPDATED_FALLBACK;
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      __TERMS_LAST_UPDATED_ISO__: JSON.stringify(getTermsLastUpdatedIso()),
      __PRIVACY_LAST_UPDATED_ISO__: JSON.stringify(getPrivacyLastUpdatedIso()),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
