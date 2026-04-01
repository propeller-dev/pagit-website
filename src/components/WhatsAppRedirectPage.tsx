import { useEffect } from 'react';

const WHATSAPP_URL = 'https://wa.me/5521936183583';

export default function WhatsAppRedirectPage() {
  useEffect(() => {
    window.location.replace(WHATSAPP_URL);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-6">
      <div className="max-w-lg w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Redirecionando para WhatsApp
        </p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          Você será direcionado em instantes
        </h1>
        <p className="mt-3 text-slate-600">
          Se o redirecionamento não acontecer automaticamente, use o botão abaixo.
        </p>
        <a
          href={WHATSAPP_URL}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
        >
          Abrir WhatsApp
        </a>
      </div>
    </div>
  );
}
