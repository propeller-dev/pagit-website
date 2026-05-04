import { useTranslations } from "next-intl";

type FaqItem = { q: string; a: string };
type FaqGroup = { id: string; title: string; items: FaqItem[] };

export function StructuredData() {
  const tSchema = useTranslations("schema");
  const tFaq = useTranslations("faq");

  const org = tSchema.raw("organization") as {
    name: string;
    url: string;
    logoPath: string;
    sameAs: string[];
    contactEmail: string;
    contactPhone: string;
  };
  const product = tSchema.raw("product") as {
    name: string;
    description: string;
  };
  const faqGroups = tFaq.raw("groups") as FaqGroup[];

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    url: org.url,
    logo: `${org.url}${org.logoPath}`,
    sameAs: org.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: org.contactEmail,
        telephone: org.contactPhone,
        contactType: "customer support",
        areaServed: "BR",
        availableLanguage: ["pt-BR"],
      },
    ],
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: org.name },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
