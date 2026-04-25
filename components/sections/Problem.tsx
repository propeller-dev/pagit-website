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
          {cards.map((card) => (
            <StaggerItem key={card.kicker}>
              <Card variant="light" className="h-full">
                <CardBody className="flex h-full flex-col gap-4">
                  <CardKicker>{card.kicker}</CardKicker>
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
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
