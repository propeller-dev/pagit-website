"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Card,
  Container,
  Reveal,
  Section,
  SectionHeader,
  StaggerGroup,
  StaggerItem,
} from "@/components/ui";
import { IconChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };
type FaqGroup = { id: string; title: string; items: FaqItem[] };

function FaqItemRow({ item, idx, groupId }: { item: FaqItem; idx: number; groupId: string }) {
  const [open, setOpen] = useState(false);
  const id = `${groupId}-${idx}`;
  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 rounded-xl px-4 py-4 text-left transition-colors hover:bg-brand-50/60"
      >
        <span className="font-medium text-ink-900">{item.q}</span>
        <span
          className={cn(
            "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-transform",
            open && "rotate-180",
          )}
        >
          <IconChevronDown size={14} tone="brand" />
        </span>
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        hidden={!open}
        className="px-4 pb-5"
      >
        <p className="text-sm leading-relaxed text-ink-600">{item.a}</p>
      </div>
    </li>
  );
}

export function Faq() {
  const t = useTranslations("faq");
  const groups = t.raw("groups") as FaqGroup[];

  return (
    <Section id="faq">
      <Container size="narrow" className="space-y-12">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <StaggerGroup className="space-y-10">
          {groups.map((group, idx) => (
            <StaggerItem key={group.id} delay={idx * 0.08} className="space-y-4">
              <h3 className="text-sm font-semibold tracking-[0.08em] text-brand-700 uppercase">
                {group.title}
              </h3>
              <Card variant="light">
                <ul className="divide-y divide-line-100 p-2">
                  {group.items.map((item, itemIdx) => (
                    <FaqItemRow
                      key={item.q}
                      item={item}
                      idx={itemIdx}
                      groupId={group.id}
                    />
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
