import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, BarChart3, Instagram, Mail } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Regular expression for basic email validation
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setIsLoading(true);

    const url = 'https://pagit.us10.list-manage.com/subscribe/post?u=7ef237749f523932ab865cf02&id=c744d35c97&f_id=005428e3f0';
    const formData = new FormData();
    formData.append('EMAIL', email);
    formData.append('b_7ef237749f523932ab865cf02_c744d35c97', ''); // Honeypot

    try {
      // Submitting via fetch with 'no-cors' allows us to send the data without 
      // getting CORS blocked, avoiding the new tab redirect.
      await fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
    } catch (err) {
      console.error('Erro ao enviar e-mail:', err);
    }

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-end">
          <a
            href="https://dash.pagit.com.br/auth/signin"
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
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Obrigado pelo interesse!</h3>
                  <p className="text-green-700">
                    Você está na nossa lista VIP. Avisaremos assim que a Pagit estiver disponível para transformar seu financeiro.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="flex flex-col sm:flex-row gap-3 items-start"
                  noValidate
                >
                  <div className="flex-1 w-full flex flex-col gap-1 text-left">
                    <input
                      type="email"
                      name="EMAIL"
                      id="mce-EMAIL"
                      required
                      placeholder="Seu melhor e-mail profissional"
                      className={`w-full px-4 py-3.5 rounded-xl border focus:ring-2 focus:outline-none transition-all placeholder:text-slate-400 bg-white shadow-sm ${emailError
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
                        Por favor, insira um e-mail válido.
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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src="/logo.svg" alt="Pagit" className="h-6 w-auto" />
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a
                href="https://instagram.com/pagit.fin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium group transition-all"
              >
                <Instagram className="w-5 h-5 text-pink-500" />
                <span className="text-slate-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-600 transition-all">
                  @pagit.fin
                </span>
              </a>
              <a
                href="mailto:contato@pagit.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium group transition-all"
              >
                <Mail className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">
                  contato@pagit.com.br
                </span>
              </a>
            </div>
          </div>
          <div className="text-sm text-slate-500 text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Pagit Tecnologia Financeira. Todos os direitos reservados.</p>
            <p className="mt-1">Feito para impulsionar negócios brasileiros.</p>
          </div>
        </div>
      </footer>
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
