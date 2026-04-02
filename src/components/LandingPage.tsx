import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import SiteFooter from './SiteFooter';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | false>(false);
  const [phoneError, setPhoneError] = useState<string | false>(false);

  // Mailchimp merge tags are case-sensitive. Confirm the correct value under Audience → Settings → Audience fields and *|MERGE|* tags.
  const MAILCHIMP_EMAIL_MERGE_TAG = 'EMAIL';
  const MAILCHIMP_PHONE_MERGE_TAG = 'PHONE';

  // Normalize and format Brazilian phone numbers for UI while sending only digits.
  const normalizeBrazilPhoneDigits = (input: string) => {
    const digits = input.replace(/\D/g, '');
    // Strip country code +55 if present, keeping the 11-digit national number.
    return (digits.length === 13 || digits.length === 12) && digits.startsWith('55')
      ? digits.slice(-11)
      : digits;
  };

  const formatPhoneForInput = (value: string) => {
    const digits = normalizeBrazilPhoneDigits(value);
    const ddd = digits.slice(0, 2);
    const first = digits.slice(2, 3);
    const mid = digits.slice(3, 7);
    const last = digits.slice(7, 11);

    let formatted = '';
    if (ddd) formatted += `(${ddd})`;
    if (first) formatted += ` ${first}`;
    if (mid) formatted += ` ${mid}`;
    if (last) formatted += `-${last}`;
    return formatted.trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Permitir envio se pelo menos um dos campos estiver preenchido e válido
    let hasError = false;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const normalizedPhoneDigits = normalizeBrazilPhoneDigits(phone);
    let emailValid = false;
    let phoneValid = false;

    // Validação de e-mail
    if (email) {
      if (!emailRegex.test(email)) {
        setEmailError('Formato de e-mail inválido.');
        hasError = true;
      } else {
        setEmailError(false);
        emailValid = true;
      }
    } else {
      setEmailError(false);
    }

    // Validação de telefone
    if (phone) {
      if (!/^\d{11}$/.test(normalizedPhoneDigits) || !/^\d{2}9\d{8}$/.test(normalizedPhoneDigits)) {
        setPhoneError('Formato de WhatsApp inválido. Use DDD + 9 dígitos.');
        hasError = true;
      } else {
        setPhoneError(false);
        phoneValid = true;
      }
    } else {
      setPhoneError(false);
    }

    // Se nenhum campo válido, erro geral
    if (!emailValid && !phoneValid) {
      setEmailError('Preencha pelo menos e-mail ou WhatsApp válido.');
      setPhoneError('Preencha pelo menos WhatsApp ou e-mail válido.');
      return;
    }

    if (hasError) return;

    setIsLoading(true);

    const mchimpUrl = 'https://pagit.us10.list-manage.com/subscribe/post-json?u=7ef237749f523932ab865cf02&id=c744d35c97&f_id=005428e3f0';
    const callbackName = 'mailchimpCallback_' + Math.round(100000 * Math.random());

    // Only send merge tags if the values are valid to avoid overwriting existing data with blank values.
    const emailQueryParam = emailValid ? `&${MAILCHIMP_EMAIL_MERGE_TAG}=${encodeURIComponent(email)}` : '';
    const phoneQueryParam = phoneValid ? `&${MAILCHIMP_PHONE_MERGE_TAG}=${encodeURIComponent(normalizedPhoneDigits)}` : '';

    const fullUrl = `${mchimpUrl}${emailQueryParam}${phoneQueryParam}&c=${callbackName}&b_7ef237749f523932ab865cf02_c744d35c97=`;

    // Define the global callback function
    (window as any)[callbackName] = (data: any) => {
      setIsLoading(false);

      if (data.result === 'success') {
        if (data.msg && (data.msg.includes('já está inscrito') || data.msg.includes('already subscribed') || data.msg.includes('already'))) {
          setStatusMessage({
            type: 'info',
            text: 'Este e-mail já está inscrito na nossa lista VIP! Não se preocupe, avisaremos você em breve.'
          });
        } else {
          setStatusMessage({
            type: 'success',
            text: 'Você está na nossa lista VIP. Avisaremos assim que a Pagit estiver disponível para transformar seu financeiro.'
          });
        }
      } else {
        // Mailchimp error messages can contain HTML and other warnings
        if (data.msg && (data.msg.includes('já está inscrito') || data.msg.includes('already subscribed'))) {
          setStatusMessage({
            type: 'info',
            text: 'Este e-mail já está inscrito na nossa lista VIP! Não se preocupe, avisaremos você em breve.'
          });
        } else {
          setStatusMessage({
            type: 'error',
            text: 'Ocorreu um erro ao tentar se inscrever. Tente novamente mais tarde.'
          });
        }
      }

      // Clean up the script and callback
      delete (window as any)[callbackName];
      const scriptElement = document.getElementById(callbackName);
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };

    // Create script tag for JSONP request
    const script = document.createElement('script');
    script.src = fullUrl;
    script.id = callbackName;
    document.body.appendChild(script);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-end">
          <a
            href="https://dash.pagit.com.br"
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100"
          >
            Já sou cliente!
          </a>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col h-full">

          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-8">
                <img src="/logo.svg" alt="Pagit" className="h-16 w-auto" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                Chegando em breve
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                A revolução na <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">gestão de cobranças</span> para o seu negócio.
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                Pare de perder tempo cobrando clientes manualmente. A Pagit automatiza seu fluxo financeiro, reduz a inadimplência e organiza suas contas, tudo em uma plataforma simples feita para PMEs e autônomos.
              </p>
            </motion.div>

            {/* Email Capture Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl mx-auto"
            >
              {statusMessage ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`border rounded-2xl p-6 text-center ${statusMessage.type === 'success' ? 'bg-green-50 border-green-200' :
                    statusMessage.type === 'error' ? 'bg-red-50 border-red-200' :
                      'bg-blue-50 border-blue-200'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${statusMessage.type === 'success' ? 'bg-green-100 text-green-600' :
                    statusMessage.type === 'error' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                    {statusMessage.type === 'success' && <CheckCircle2 className="w-6 h-6" />}
                    {statusMessage.type === 'info' && <CheckCircle2 className="w-6 h-6" />}
                    {statusMessage.type === 'error' && <Zap className="w-6 h-6" />}
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${statusMessage.type === 'success' ? 'text-green-900' :
                    statusMessage.type === 'error' ? 'text-red-900' :
                      'text-blue-900'
                    }`}>
                    {statusMessage.type === 'success' ? 'Obrigado pelo interesse!' :
                      statusMessage.type === 'info' ? 'Você já está na lista!' :
                        'Ops, algo deu errado'}
                  </h3>
                  <p className={
                    statusMessage.type === 'success' ? 'text-green-700' :
                      statusMessage.type === 'error' ? 'text-red-700' :
                        'text-blue-700'
                  }>
                    {statusMessage.text}
                  </p>

                  {statusMessage.type === 'error' && (
                    <button
                      onClick={() => setStatusMessage(null)}
                      className="mt-4 px-4 py-2 text-sm font-medium text-red-600 bg-red-100/50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      Tentar novamente
                    </button>
                  )}
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full"
                  noValidate
                >
                  <div className="flex-1 w-full flex flex-col gap-1 text-left">
                    <input
                      type="email"
                      name={MAILCHIMP_EMAIL_MERGE_TAG}
                      id={`mce-${MAILCHIMP_EMAIL_MERGE_TAG}`}
                      placeholder="Seu melhor e-mail profissional"
                      className={`w-full min-w-[280px] px-6 py-4 rounded-xl border focus:ring-2 focus:outline-none transition-all placeholder:text-slate-400 bg-white shadow-sm ${emailError
                        ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
                        : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
                        }`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(false);
                      }}
                    />
                    {emailError && (
                      <span className="text-red-500 text-sm font-medium px-2">
                        {emailError}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 w-full flex flex-col gap-1 text-left">
                    <input
                      type="tel"
                      name={MAILCHIMP_PHONE_MERGE_TAG}
                      id={`mce-${MAILCHIMP_PHONE_MERGE_TAG}`}
                      placeholder="Whatsapp (com DDD)"
                      className={`w-full min-w-[280px] px-6 py-4 rounded-xl border focus:ring-2 focus:outline-none transition-all placeholder:text-slate-400 bg-white shadow-sm ${phoneError
                        ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
                        : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
                        }`}
                      value={phone}
                      onChange={(e) => {
                        setPhone(formatPhoneForInput(e.target.value));
                        if (phoneError) setPhoneError(false);
                      }}
                    />
                    {phoneError && (
                      <span className="text-red-500 text-sm font-medium px-2">
                        {phoneError}
                      </span>
                    )}
                  </div>
                  {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                  <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                    <input type="text" name="b_7ef237749f523932ab865cf02_c744d35c97" tabIndex={-1} defaultValue="" />
                  </div>
                  <button
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    disabled={isLoading}
                    className="px-6 h-[54px] rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-semibold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {isLoading ? 'Enviando...' : 'Entrar na lista de espera'}
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              )}
              <p className="mt-4 text-xs text-slate-500">
                Junte-se a inúmeros empreendedores aguardando o lançamento. Sem spam, compromisso nosso.
              </p>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-auto">
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-amber-500" />}
              title="Automação Inteligente"
              description="Configure réguas de cobrança automáticas via e-mail e WhatsApp. Nunca mais esqueça de cobrar um cliente."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 text-emerald-500" />}
              title="Segurança Bancária"
              description="Seus dados e transações protegidos com criptografia de ponta a ponta e conformidade com o Banco Central."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6 text-blue-500" />}
              title="Gestão Descomplicada"
              description="Dashboard intuitivo para visualizar fluxo de caixa, inadimplência e previsibilidade financeira em tempo real."
            />
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 border border-slate-100">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
