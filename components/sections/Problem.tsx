import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  CardBodyText,
  CardKicker,
  CardTitle,
  Container,
  Reveal,
  Section,
  SectionHeader,
  StaggerGroup,
  StaggerItem,
} from "@/components/ui";
import { IconExternal } from "@/components/icons";

type ProblemCard = {
  kicker: string;
  title: string;
  body: string;
  source: string;
  sourceHref: string;
};

type SourceBrand = {
  logo: string;
  alt: string;
  accent: string;
};

const sourceBrands: SourceBrand[] = [
  {
    logo: "/sources/serasa.svg",
    alt: "Logotipo da Serasa Experian",
    accent: "#CC092F",
  },
  {
    logo: "/sources/sebrae.svg",
    alt: "Logotipo do Sebrae",
    accent: "#005EB8",
  },
  {
    logo: "/sources/bacen.svg",
    alt: "Logotipo do Banco Central do Brasil",
    accent: "#0F4C81",
  },
];

export function Problem() {
  const t = useTranslations("problem");
  const cards = t.raw("cards") as ProblemCard[];

  return (
    <Section id="problema">
      <Container className="space-y-12">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card, idx) => {
            const brand = sourceBrands[idx];
            if (!brand) return null;
            return (
              <StaggerItem key={card.kicker} delay={idx * 0.08}>
                <Card
                  variant="light"
                  className="group h-full transition-shadow hover:shadow-md"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl transition-[width] duration-300 ease-out group-hover:w-1.5 motion-reduce:transition-none"
                    style={{ backgroundColor: brand.accent }}
                  />
                  <CardBody className="flex h-full flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <CardKicker>{card.kicker}</CardKicker>
                      <Image
                        src={brand.logo}
                        alt={brand.alt}
                        width={120}
                        height={28}
                        className="h-7 w-auto max-w-[120px] shrink-0 object-contain object-right opacity-70 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                        unoptimized
                      />
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                    <CardBodyText>{card.body}</CardBodyText>
                    <a
                      href={card.sourceHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 transition-colors hover:text-brand-700"
                    >
                      Fonte: {card.source}
                      <IconExternal size={12} tone="current" />
                    </a>
                  </CardBody>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
