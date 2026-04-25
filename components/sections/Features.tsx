import { useTranslations } from "next-intl";
import {
  Badge,
  Card,
  CardBody,
  CardBodyText,
  CardTitle,
  Container,
  Section,
  SectionHeader,
} from "@/components/ui";
import { featureIconMap, type FeatureIconName } from "@/components/icons";

type FeatureCard = {
  icon: FeatureIconName;
  title: string;
  body: string;
  tag: string;
};

export function Features() {
  const t = useTranslations("features");
  const cards = t.raw("cards") as FeatureCard[];

  return (
    <Section id="funcionalidades">
      <Container className="space-y-12">
        <SectionHeader
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = featureIconMap[card.icon];
            return (
              <Card
                key={card.title}
                variant="light"
                className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardBody className="flex h-full flex-col gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
                    <Icon size={24} tone="brand" />
                  </span>
                  <CardTitle className="text-lg sm:text-xl">{card.title}</CardTitle>
                  <CardBodyText className="text-sm">{card.body}</CardBodyText>
                  <div className="mt-auto pt-2">
                    <Badge variant="brand">{card.tag}</Badge>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
