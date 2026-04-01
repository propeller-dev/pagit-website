import { Instagram, Mail } from 'lucide-react';

export default function SiteFooter() {
  return (
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
  );
}
