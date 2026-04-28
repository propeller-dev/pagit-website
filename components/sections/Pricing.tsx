import { useTranslations } from "next-intl";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Reveal,
  Section,
  SectionHeader,
  StaggerGroup,
  StaggerItem,
} from "@/components/ui";
import { IconCheck } from "@/components/icons";
import { cn } from "@/lib/utils";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  highlight: string;
  features: string[];
  cta: { label: string; href: string };
  featured: boolean;
};

export function Pricing() {
  const t = useTranslations("pricing");
  const plans = t.raw("plans") as Plan[];

  return (
    <Section id="precos" tone="muted">
      <Container size="narrow" className="space-y-12">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <StaggerGroup className="grid gap-5 md:grid-cols-2">
          {plans.map((plan, idx) => (
            <StaggerItem key={plan.id} delay={idx * 0.08}>
            <Card
              variant={plan.featured ? "light" : "outline"}
              className={cn(
                "relative h-full transition-shadow",
                plan.featured && "ring-1 ring-brand-200 shadow-md",
              )}
            >
              {plan.featured ? (
                <div className="absolute top-4 right-4">
                  <Badge variant="amber">{plan.highlight}</Badge>
                </div>
              ) : null}

              <CardBody className="flex h-full flex-col gap-6">
                <div>
                  <p className="text-sm font-semibold tracking-[0.08em] text-brand-700 uppercase">
                    {plan.name}
                  </p>
                  <p className="mt-2 text-base text-ink-600">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink-900 sm:text-5xl">
                    {plan.price}
                  </span>
                  {plan.priceSuffix ? (
                    <span className="text-base text-ink-500">{plan.priceSuffix}</span>
                  ) : null}
                </div>

                {!plan.featured ? (
                  <p className="text-sm text-ink-600">{plan.highlight}</p>
                ) : null}

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-ink-700"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                        <IconCheck size={12} tone="brand" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <Button
                    variant={plan.featured ? "primary" : "secondary"}
                    href={plan.cta.href}
                    className="w-full"
                  >
                    {plan.cta.label}
                  </Button>
                </div>
              </CardBody>
            </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="text-center text-xs leading-relaxed text-ink-500">
          {t("footnote")}
        </p>
      </Container>
    </Section>
  );
}
