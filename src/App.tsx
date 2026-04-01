/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LandingPage from './components/LandingPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import WhatsAppRedirectPage from './components/WhatsAppRedirectPage';

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

  if (pathname === '/termos-de-servico' || pathname === '/terms-of-service') {
    return <TermsOfServicePage />;
  }

  if (pathname === '/whatsapp' || pathname === '/contato-whatsapp') {
    return <WhatsAppRedirectPage />;
  }

  return <LandingPage />;
}
