import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  CardBodyText,
  CardTitle,
  Container,
  Section,
  SectionHeader,
} from "@/components/ui";
import { audienceIconMap, type AudienceIconName } from "@/components/icons";

type AudienceCard = {
  icon: AudienceIconName;
  title: string;
  body: string;
};

export function Audience() {
  const t = useTranslations("audience");
  const cards = t.raw("cards") as AudienceCard[];

  return (
    <Section id="para-quem" tone="muted">
      <Container className="space-y-12">
        <SectionHeader
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = audienceIconMap[card.icon];
            return (
              <Card key={card.title} variant="light" className="h-full transition-shadow hover:shadow-md">
                <CardBody className="flex h-full flex-col gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
                    <Icon size={28} tone="brand" />
                  </span>
                  <CardTitle>{card.title}</CardTitle>
                  <CardBodyText>{card.body}</CardBodyText>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
