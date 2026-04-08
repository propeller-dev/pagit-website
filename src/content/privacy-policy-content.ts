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
  title: 'Política de Privacidade e Proteção de Dados – Pagit',
  lastUpdated: formatPrivacyLastUpdated(__PRIVACY_LAST_UPDATED_ISO__),
  intro: [
    'Bem-vindo à **Pagit**. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais. Operamos em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014) e as regulamentações de segurança cibernética do Banco Central do Brasil (Resoluções BCB nº 85/2021 e nº 538/2025).',
  ],
  sections: [
    {
      id: 'papeis-tratamento',
      title: '1. NOSSOS PAPÉIS NO TRATAMENTO DE DADOS',
      icon: 'file-text',
      paragraphs: [
        'Para que a transparência seja efetiva, a Pagit atua de duas formas:',
      ],
      bullets: [
        '**Controladora:** Quando você é nosso cliente (empresa contratante), decidimos sobre o tratamento dos seus dados para gerir nossa relação comercial.',
        '**Operadora:** Quando processamos cobranças de terceiros (seus clientes/devedores), agimos estritamente sob as instruções do nosso cliente e em conformidade com o contrato de prestação de serviços financeiros.',
      ],
    },
    {
      id: 'dados-coletados',
      title: '2. DADOS QUE COLETAMOS',
      icon: 'database',
      paragraphs: [
        'Coletamos apenas o necessário para a viabilidade do negócio e segurança das transações:',
      ],
      bullets: [
        '**Dados Cadastrais:** nome completo e documento do responsável legal, nome completo e documento do responsável pela conta, razão social, nome fantasia, CPF ou CNPJ, e-mail, telefone e endereço referente ao documento.',
        '**Dados Financeiros e Transacionais:** histórico de recebimentos, histórico de pagamentos, dados de conta bancária, chaves Pix e registros de cobranças (boletos e cartões).',
        '**Dados de Identificação Digital:** Endereço IP, data/hora de acesso, geolocalização e registros de dispositivos (logs).',
        '**Dados de Bureaus de Crédito:** Informações de inadimplência e score de crédito oriundos de bases como Serasa e Boa Vista, além de consultas ao SCR do Banco Central.',
        '**Dados Biométricos:** Para prevenção à fraude e autenticação segura no acesso às nossas soluções.',
      ],
    },
    {
      id: 'bases-legais',
      title: '3. COMO E POR QUE UTILIZAMOS SEUS DADOS',
      icon: 'shield-check',
      paragraphs: [
        'Privacidade para nós é transparência. Por isso, listamos abaixo as "autorizações" (bases legais) que a LGPD nos confere para processar seus dados e garantir que sua gestão financeira funcione sem interrupções:',
      ],
      orderedBullets: [
        '**Execução de Contrato:** Para processar cobranças, emitir boletos e gerir réguas de billing. O tratamento é essencial para entregarmos o serviço contratado.',
        '**Proteção ao Crédito:** Para análise de risco, prevenção à inadimplência e viabilização de antecipação de recebíveis.',
        '**Cumprimento de Obrigação Legal/Regulatória:** Para atender normas do Banco Central, reportes à Receita Federal (e-Financeira) e controles de Prevenção à Lavagem de Dinheiro (COAF).',
        '**Legítimo Interesse:** Para melhoria da experiência no produto, segurança do ecossistema e detecção proativa de fraudes.',
      ],
    },
    {
      id: 'compartilhamento-dados',
      title: '4. COMPARTILHAMENTO DE DADOS',
      icon: 'share',
      paragraphs: [
        'A Pagit compartilha dados estritamente necessários com parceiros estratégicos para o funcionamento da plataforma:',
      ],
      bullets: [
        '**Instituições Financeiras e Adquirentes:** Para liquidação das transações e processamento de pagamentos.',
        '**Bureaus de Crédito:** Para fins de negativação e análise de risco de crédito.',
        '**Órgãos Reguladores:** Banco Central e Receita Federal, em cumprimento aos deveres de fiscalização.',
        '**Provedores de Infraestrutura:** Parceiros de tecnologia e cloud computing (ex: AWS/Google Cloud) que garantem a disponibilidade e segurança dos dados.',
      ],
    },
    {
      id: 'comunicacao-cobranca',
      title: '5. COMUNICAÇÃO E COBRANÇA ÉTICA',
      icon: 'message-circle',
      paragraphs: [
        'Nossas automações de comunicação (WhatsApp, E-mail e SMS) seguem os limites éticos do Código de Defesa do Consumidor:',
      ],
      bullets: [
        '**Identificação:** Todo contato informará claramente a origem da cobrança e a relação com a Pagit.',
        '**Respeito ao Titular:** O contato será realizado em horários comerciais e com frequência que não caracterize importunação.',
        '**Direito de Opt-out:** Oferecemos meios para que o usuário interrompa comunicações em casos de erro de cadastro ou após a resolução do débito.',
      ],
    },
    {
      id: 'seguranca-retencao',
      title: '6. SEGURANÇA E RETENÇÃO',
      icon: 'lock',
      paragraphs: [
        'Seus dados são protegidos por criptografia de nível bancário e monitoramento contínuo.',
        'Mantemos as informações apenas pelo tempo necessário, respeitando os prazos legais:',
      ],
      bullets: [
        'Registros de Acesso e Conexão: De 6 meses a 1 ano (conforme o Marco Civil da Internet).',
        'Dados de Transações e Fiscais: Até 10 anos (conforme exigências do Banco Central e normas tributárias).',
      ],
    },
    {
      id: 'direitos-titular',
      title: '7. SEUS DIREITOS E RESPONSABILIDADE COMPARTILHADA',
      icon: 'user-check',
      paragraphs: [
        'Como titular, você tem direito de confirmação, acesso, correção e portabilidade.',
        '**Atenção aos Clientes de nossos Clientes (Devedores):** Nos casos em que a Pagit atua como **Operadora** (processando cobranças em nome de outra empresa), os pedidos de "opt-out" ou exclusão devem ser direcionados prioritariamente à **empresa credora original (o Controlador)**, que detém o poder de decisão sobre a dívida. A Pagit colaborará com o Controlador para que sua solicitação seja atendida conforme as instruções recebidas por ele e os limites legais.',
      ],
    },
  ],
  dpoContact: {
    label: 'Contato do Encarregado de Dados (DPO)',
    description: 'Dúvidas ou requisições? Fale diretamente com nosso time de privacidade:',
    email: 'contato@pagit.com.br',
  },
};
