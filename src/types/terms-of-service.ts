export type TermsIconKey =
  | 'file-text'
  | 'book-open'
  | 'user-check'
  | 'shield-check'
  | 'lock'
  | 'wallet'
  | 'copyright'
  | 'alert-triangle'
  | 'calendar-clock'
  | 'refresh-ccw'
  | 'mail';

export interface TermsSection {
  id: string;
  title: string;
  icon: TermsIconKey;
  paragraphs: string[];
  bullets?: string[];
  orderedBullets?: string[];
}

export interface TermsOfServiceContent {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: TermsSection[];
  contact?: {
    label: string;
    email: string;
  };
}
