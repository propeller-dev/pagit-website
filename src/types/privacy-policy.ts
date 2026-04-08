export type PrivacyIconKey =
  | 'file-text'
  | 'database'
  | 'shield-check'
  | 'share'
  | 'message-circle'
  | 'lock'
  | 'user-check'
  | 'mail';

export interface PrivacySection {
  id: string;
  title: string;
  icon: PrivacyIconKey;
  paragraphs: string[];
  bullets?: string[];
  orderedBullets?: string[];
}

export interface PrivacyPolicyContent {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: PrivacySection[];
  dpoContact: {
    label: string;
    description: string;
    email: string;
  };
}
