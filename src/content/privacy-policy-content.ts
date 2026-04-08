import type { PrivacyPolicyContent } from '../types/privacy-policy';

declare const __PRIVACY_LAST_UPDATED_ISO__: string;

const PRIVACY_LAST_UPDATED_FALLBACK = '2026-03-31';

function formatPrivacyLastUpdated(isoDate: string) {
  const normalizedIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(isoDate) ? isoDate : PRIVACY_LAST_UPDATED_FALLBACK;
  const updatedAt = new Date(`${normalizedIsoDate}T00:00:00Z`);

  return updatedAt.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export const privacyPolicyContent: PrivacyPolicyContent = {
  title: 'Política de Privacidade e Proteção de Dados - Pagit',
  lastUpdated: formatPrivacyLastUpdated(__PRIVACY_LAST_UPDATED_ISO__),
  intro: [
    'Bem-vindo à Pagit. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais.',
    'Operamos em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014) e as regulamentações de segurança cibernética do Banco Central do Brasil (Resoluções BCB nº 85/2021 e nº 538/2025).',
  ],
  sections: [
    {
      id: 'papeis-tratamento',
      title: '1. Nossos Papéis no Tratamento de Dados',
      icon: 'file-text',
      paragraphs: [
        'Para que a transparência seja efetiva, a Pagit atua de duas formas:',
      ],
      bullets: [
        'Controladora: quando você é nosso cliente (empresa contratante), decidimos sobre o tratamento dos seus dados para gerir nossa relação comercial.',
        'Operadora: quando processamos cobranças de terceiros (seus clientes), agimos sob suas instruções e em conformidade com o contrato de prestação de serviços financeiros.',
      ],
    },
    {
      id: 'dados-coletados',
      title: '2. Dados que Coletamos',
      icon: 'database',
      paragraphs: [
        'Coletamos apenas o necessário para a viabilidade do negócio e segurança das transações:',
      ],
      bullets: [
        'Dados Cadastrais: nome, CPF/CNPJ, e-mail, telefone e endereço.',
        'Dados Financeiros e Transacionais: histórico de pagamentos, dados de conta bancária, chaves Pix e registros de cobranças (boletos e cartões).',
        'Dados de Identificação Digital: endereço IP, data/hora de acesso, geolocalização e registros de dispositivos (logs).',
        'Dados de Bureaus de Crédito: informações de inadimplência e score de crédito oriundos de bases como Serasa e Boa Vista, além de consultas ao SCR do Banco Central.',
        'Dados Biométricos: para prevenção à fraude e autenticação segura no acesso às nossas soluções.',
      ],
    },
    {
      id: 'bases-legais',
      title: '3. Por que Tratamos seus Dados (Bases Legais)',
      icon: 'shield-check',
      paragraphs: [
        'Não tratamos dados sem uma justificativa legal sólida:',
      ],
      orderedBullets: [
        'Execução de Contrato: para processar suas cobranças, emitir boletos e gerir sua régua de billing.',
        'Proteção ao Crédito: para análise de risco e viabilização de antecipação de recebíveis.',
        'Cumprimento de Obrigação Legal/Regulatória: para reportes obrigatórios à Receita Federal (e-Financeira) e ao COAF (Prevenção à Lavagem de Dinheiro).',
        'Legítimo Interesse: para melhoria da experiência do usuário, desenvolvimento de novas funcionalidades e segurança do ecossistema.',
      ],
    },
    {
      id: 'compartilhamento-dados',
      title: '4. Compartilhamento de Dados',
      icon: 'share',
      paragraphs: [
        'A Pagit compartilha dados estritamente necessários com parceiros estratégicos:',
      ],
      bullets: [
        'Instituições Financeiras e Adquirentes: para liquidação das transações.',
        'Bureaus de Crédito: para fins de negativação e análise de risco.',
        'Órgãos Reguladores: Banco Central e Receita Federal, conforme exigido por lei.',
        'Provedores de Infraestrutura: cloud computing (ex.: AWS/Google Cloud) com altos padrões de criptografia.',
      ],
    },
    {
      id: 'comunicacao-cobranca',
      title: '5. Comunicação e Cobrança Ética',
      icon: 'message-circle',
      paragraphs: [
        'Nossas automações via WhatsApp, e-mail e SMS seguem o Código de Defesa do Consumidor:',
      ],
      bullets: [
        'Identificação: todo contato informará claramente que se trata de uma comunicação da Pagit em nome do credor.',
        'Horários: respeitamos horários comerciais para evitar importunação.',
        'Direito de Opt-out: oferecemos canais claros para interrupção de contatos em caso de erro cadastral ou após a quitação.',
      ],
    },
    {
      id: 'seguranca-retencao',
      title: '6. Segurança e Retenção',
      icon: 'lock',
      paragraphs: [
        'Adotamos medidas técnicas de ponta, incluindo criptografia AES-256 e autenticação multifatorial (MFA).',
        'Os dados são retidos conforme os prazos legais:',
      ],
      bullets: [
        'Logs de Acesso: 6 meses (Marco Civil).',
        'Logs de Conexão: 1 ano (Marco Civil).',
        'Dados Fiscais e Financeiros: 5 a 10 anos (Código Tributário e Normas BACEN).',
      ],
    },
    {
      id: 'direitos-titular',
      title: '7. Seus Direitos',
      icon: 'user-check',
      paragraphs: [
        'Você pode exercer seus direitos (acesso, correção, portabilidade, anonimização ou exclusão) a qualquer momento.',
        'O pedido de exclusão não prevalecerá sobre dados que somos legalmente obrigados a guardar.',
      ],
    },
  ],
  dpoContact: {
    label: 'Contato do Encarregado de Dados (DPO)',
    email: 'contato@pagit.com.br',
  },
};
