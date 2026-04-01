import type { TermsOfServiceContent } from '../types/terms-of-service';

export const termsOfServiceContent: TermsOfServiceContent = {
  title: 'Contrato de Termos de Serviço - Pagit',
  lastUpdated: 'Lorem Ipsum',
  intro: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat, justo sit amet sagittis imperdiet, lorem lectus varius augue, in porta urna sapien in lacus.',
    'Mauris faucibus sem eu nibh convallis, nec interdum nibh tristique. Fusce in suscipit ligula. Praesent et varius tortor. Donec luctus gravida ipsum, sed posuere lectus gravida non.',
  ],
  sections: [
    {
      id: 'objeto',
      title: '1. Objeto',
      icon: 'file-text',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere, turpis nec ultricies congue, lorem nibh tempor eros, ac eleifend sem lectus at metus.',
        'Sed sed tincidunt velit. Morbi tincidunt sem eu ex tristique, a tincidunt augue blandit. Aenean iaculis condimentum urna, ac pretium augue malesuada non.',
      ],
    },
    {
      id: 'definicoes',
      title: '2. Definições',
      icon: 'book-open',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus lorem ut iaculis finibus. Ut mollis libero sed lorem iaculis, eget accumsan nulla dictum.',
      ],
      bullets: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Integer pellentesque nulla vitae nibh egestas, in volutpat mi pulvinar.',
        'Vivamus eu risus et arcu malesuada dictum non ut nisl.',
      ],
    },
    {
      id: 'cadastro-acesso',
      title: '3. Cadastro e Acesso',
      icon: 'user-check',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vehicula, est sed mattis pretium, felis tellus tincidunt felis, et lobortis arcu lorem id lorem.',
        'Aliquam malesuada magna in diam laoreet posuere. Sed laoreet semper egestas.',
      ],
    },
    {
      id: 'uso-permitido',
      title: '4. Uso Permitido da Plataforma',
      icon: 'shield-check',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel est vitae risus posuere facilisis eu id lectus. Cras id lorem ac justo malesuada pretium.',
      ],
      orderedBullets: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Fusce gravida arcu in ligula feugiat pretium.',
        'Curabitur pharetra eros at orci tincidunt, vitae elementum ipsum aliquet.',
      ],
    },
    {
      id: 'planos-pagamentos',
      title: '5. Planos, Preços e Pagamentos',
      icon: 'wallet',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel nunc sit amet justo cursus mollis. Pellentesque sed tortor ut purus accumsan hendrerit.',
        'Suspendisse potenti. In at enim in velit sagittis interdum et et est.',
      ],
    },
    {
      id: 'propriedade-intelectual',
      title: '6. Propriedade Intelectual',
      icon: 'copyright',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim, sem at consectetur posuere, velit tortor faucibus erat, in posuere magna dolor ut est.',
      ],
    },
    {
      id: 'responsabilidades',
      title: '7. Responsabilidades e Limitações',
      icon: 'alert-triangle',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et vulputate magna, vel egestas est. Maecenas nec dictum elit, ac tincidunt felis.',
        'Nullam id faucibus ipsum. Duis aliquam, nisl ut fringilla tempor, elit arcu semper dui, vel feugiat felis justo sit amet erat.',
      ],
    },
    {
      id: 'vigencia-rescisao',
      title: '8. Vigência e Rescisão',
      icon: 'calendar-clock',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pharetra, lacus sit amet luctus blandit, risus ipsum aliquam est, et gravida ipsum arcu nec risus.',
      ],
    },
    {
      id: 'alteracoes-termos',
      title: '9. Alterações dos Termos',
      icon: 'refresh-ccw',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra volutpat risus, in feugiat felis iaculis a. Integer hendrerit auctor commodo.',
      ],
    },
  ],
  contact: {
    label: 'Contato para assuntos contratuais',
    email: 'contato@pagit.com.br',
  },
};
