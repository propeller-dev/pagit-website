/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LandingPage from './components/LandingPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';

function getCurrentPathname() {
  if (typeof window === 'undefined') {
    return '/';
  }

  return window.location.pathname;
}

export default function App() {
  const pathname = getCurrentPathname();

  if (pathname === '/politica-de-privacidade' || pathname === '/privacy-policy') {
    return <PrivacyPolicyPage />;
  }

  return <LandingPage />;
}
