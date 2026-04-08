declare const __TERMS_LAST_UPDATED_ISO__: string;

import type { TermsOfServiceContent } from '../types/terms-of-service';

const TERMS_LAST_UPDATED_FALLBACK = '2026-03-31';

function formatTermsLastUpdated(isoDate: string) {
  const normalizedIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(isoDate) ? isoDate : TERMS_LAST_UPDATED_FALLBACK;
  const updatedAt = new Date(`${normalizedIsoDate}T00:00:00Z`);

  return updatedAt.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export const termsOfServiceContent: TermsOfServiceContent = {
  title: 'Termos de Uso e Serviços - Plataforma Pagit',
  lastUpdated: formatTermsLastUpdated(__TERMS_LAST_UPDATED_ISO__),
  intro: [
    'Estes Termos de Uso ("Contrato") regem a relação entre a PAGIT TECNOLOGIA E PAGAMENTOS LTDA ("Pagit") e você, pessoa jurídica ou profissional liberal ("Contratante"), que utiliza nossa plataforma de faturamento, gestão financeira e serviços de pagamento.',
    'Ao acessar ou utilizar os serviços, você declara estar de acordo com as cláusulas aqui descritas.',
  ],
  sections: [
    {
      id: 'objeto-natureza-servicos',
      title: '1. Objeto e Natureza dos Serviços',
      icon: 'file-text',
      bullets: [
        '1.1. Modelo SaaS: a Pagit concede ao Contratante uma licença de uso, por assinatura, de seu software como serviço (SaaS) hospedado em nuvem, focado em automação de billing, gestão de recorrência e conciliação fiscal.',
        '1.2. Intermediação de Pagamentos: a Pagit atua como Instituição de Pagamento (IP), especificamente nas modalidades de credenciadora ou subadquirente, facilitando a aceitação de instrumentos de pagamento (Pix, Boleto, Cartão) e a liquidação das transações em favor do Contratante.',
      ],
      paragraphs: [],
    },
    {
      id: 'cadastro-compliance-kyc',
      title: '2. Cadastro e Compliance (KYC)',
      icon: 'book-open',
      bullets: [
        '2.1. Verificação de Identidade: o Contratante deverá fornecer dados verídicos para o processo de Know Your Customer (KYC).',
        '2.2. Gatilhos Regulatórios: a Pagit reserva-se o direito de solicitar informações adicionais ou suspender a conta caso o volume transacional atinja os limites previstos na Resolução BCB nº 80/2021 (ex.: R$ 250 milhões/ano em 2025) sem a devida autorização ou atualização cadastral.',
      ],
      paragraphs: [],
    },
    {
      id: 'mandato-gestao-financeira',
      title: '3. Cláusula de Mandato e Gestão Financeira',
      icon: 'user-check',
      bullets: [
        '3.1. Outorga de Poderes: o Contratante nomeia a Pagit como sua mandatária para atuar em seu nome perante arranjos de pagamento, bancos e adquirentes, conferindo-lhe poderes para receber valores, emitir cobranças e realizar a liquidação financeira.',
        '3.2. Segregação Patrimonial: os recursos do Contratante são mantidos em subcontas individualizadas. Conforme as normas de novembro de 2025, a Pagit proíbe o uso de "contas-bolsão" sem identificação, garantindo que os recursos dos clientes não se confundam com o patrimônio da plataforma.',
      ],
      paragraphs: [],
    },
    {
      id: 'remuneracao-custos-operacionais',
      title: '4. Remuneração e Custos Operacionais',
      icon: 'wallet',
      bullets: [
        '4.1. Taxas e Tarifas: o Contratante pagará as taxas por transação e assinaturas conforme o plano contratado no ato da adesão.',
        '4.2. Repasse de Custos (Boleto/Pix): o repasse de taxas de emissão de boleto ao consumidor final é vedado pelo CDC. O custo deve ser absorvido pelo Contratante ou incorporado no preço do produto/serviço.',
        '4.3. Comunicação via WhatsApp: o envio de notificações segue a política da Meta vigente desde 1º de julho de 2025. Mensagens de "Utilidade" (faturas, alertas) possuem custo reduzido, enquanto mensagens de "Marketing" possuem custo superior. A reclassificação automática pela Meta será repassada ao Contratante.',
      ],
      paragraphs: [],
    },
    {
      id: 'automacao-fiscal-certificado-digital',
      title: '5. Automação Fiscal e Certificado Digital',
      icon: 'shield-check',
      bullets: [
        '5.1. Responsabilidade Técnica: a Pagit atua como facilitadora tecnológica para emissão de NFS-e. O Contratante é o único responsável pela validade do Certificado Digital e pela configuração correta dos parâmetros tributários (alíquotas e retenções).',
        '5.2. Padrão Nacional: a plataforma compromete-se com a atualização para o padrão da NFS-e Nacional previsto para 2026, mas não responde por instabilidades em portais governamentais.',
      ],
      paragraphs: [],
    },
    {
      id: 'regua-cobranca-negativacao',
      title: '6. Régua de Cobrança e Negativação',
      icon: 'alert-triangle',
      bullets: [
        '6.1. Boas Práticas: o Contratante deve configurar automações que não exponham o devedor a ridículo ou constrangimento, sob pena de violação do Art. 42 do CDC.',
        '6.2. Negativação Automática: a funcionalidade de negativação via API exige que o Contratante comprove a notificação prévia do devedor mediante correspondência física enviada ao endereço do devedor, conforme jurisprudência do STJ que invalida notificações exclusivas por e-mail/SMS.',
      ],
      paragraphs: [],
    },
    {
      id: 'inteligencia-artificial-fluid-ia',
      title: '7. Inteligência Artificial e "Fluid IA"',
      icon: 'refresh-ccw',
      bullets: [
        '7.1. Autonomia do Usuário: ao utilizar ferramentas de IA para criar regras de negócio ou integrar serviços terceiros não homologados ("Fluid IA"), o Contratante assume integral responsabilidade pelos resultados gerados e pela conformidade dessas ações com a legislação vigente.',
      ],
      paragraphs: [],
    },
    {
      id: 'responsabilidade-civil-fraudes',
      title: '8. Responsabilidade Civil e Fraudes',
      icon: 'alert-triangle',
      bullets: [
        '8.1. Risco da Atividade: a Pagit responde objetivamente por danos decorrentes de falhas de segurança internas (fortuito interno), conforme a Súmula 479 do STJ.',
        '8.2. Chargebacks: em caso de contestação de compra (chargeback), a responsabilidade recairá sobre o Contratante se demonstrada falta de cautela em transações visivelmente suspeitas ou fraudulentas.',
        '8.3. Dever de Monitoramento: a Pagit poderá bloquear transações que destoem do perfil de uso do Contratante para mitigar riscos de fraudes sistêmicas.',
      ],
      paragraphs: [],
    },
    {
      id: 'protecao-dados-lgpd',
      title: '9. Proteção de Dados (LGPD)',
      icon: 'lock',
      bullets: [
        '9.1. Base Legal para Crédito: o tratamento de dados para fins de cobrança e negativação fundamenta-se na "Proteção do Crédito" (Art. 7º, X da LGPD), permitindo o compartilhamento necessário com birôs de crédito e órgãos de proteção.',
        '9.2. Decisões Automatizadas: o Contratante tem o direito de solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses financeiros.',
      ],
      paragraphs: [],
    },
    {
      id: 'disposicoes-gerais',
      title: '10. Disposições Gerais',
      icon: 'calendar-clock',
      bullets: [
        '10.1. Disponibilidade (SLA): a Pagit envidará esforços para manter a disponibilidade de 99,5% para suas APIs, ressalvadas manutenções programadas.',
        '10.2. Alterações nos Termos: estes termos podem ser atualizados unilateralmente pela Pagit para refletir mudanças regulatórias do Banco Central ou novas políticas de parceiros (ex.: Meta), com notificação prévia ao Contratante.',
        '10.3. Foro: fica eleito o foro da sede da Pagit para dirimir quaisquer controvérsias oriundas deste Contrato.',
      ],
      paragraphs: [],
    },
  ],
};

