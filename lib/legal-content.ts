import { readFile } from "node:fs/promises";
import path from "node:path";

export type LegalSection = {
  id: string;
  number: string;
  title: string;
  body: string;
};

export type LegalContent = {
  title: string;
  lastUpdated: string | null;
  intro: string;
  sections: LegalSection[];
  outro: string | null;
};

const SLUG_MAP: Record<string, string> = {
  á: "a", à: "a", â: "a", ã: "a", ä: "a",
  é: "e", è: "e", ê: "e", ë: "e",
  í: "i", ì: "i", î: "i", ï: "i",
  ó: "o", ò: "o", ô: "o", õ: "o", ö: "o",
  ú: "u", ù: "u", û: "u", ü: "u",
  ç: "c", ñ: "n",
};

function slugify(input: string) {
  const lower = input.toLowerCase();
  let out = "";
  for (const ch of lower) out += SLUG_MAP[ch] ?? ch;
  return out
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stripBoldWrap(line: string) {
  const m = line.match(/^\*\*(.+)\*\*$/);
  return m && m[1] ? m[1] : line;
}

export async function loadLegalContent(slug: string): Promise<LegalContent> {
  const md = await readFile(
    path.join(process.cwd(), "content/legal", `${slug}.md`),
    "utf8",
  );
  const lines = md.replace(/\r\n/g, "\n").split("\n");

  let title = "";
  let lastUpdated: string | null = null;
  const introLines: string[] = [];
  const sections: LegalSection[] = [];
  const outroLines: string[] = [];

  let phase: "title" | "preamble" | "section" | "outro" = "title";
  let current: LegalSection | null = null;

  for (const raw of lines) {
    if (phase === "title") {
      if (raw.startsWith("# ")) {
        title = stripBoldWrap(raw.slice(2).trim()).replace(/\\([.\-])/g, "$1");
        phase = "preamble";
      }
      continue;
    }

    if (raw.startsWith("## ")) {
      if (current) sections.push(current);
      const heading = raw.slice(3).trim().replace(/\\([.\-])/g, "$1");
      const m = heading.match(/^(\d+)\.\s+(.*)$/);
      const number = m?.[1] ?? "";
      const headTitle = m?.[2] ?? heading;
      current = {
        id: number ? `s-${number}` : `s-${slugify(headTitle)}`,
        number,
        title: headTitle,
        body: "",
      };
      phase = "section";
      continue;
    }

    if (raw.trim() === "---") {
      if (phase === "preamble") continue;
      if (phase === "section") {
        if (current) sections.push(current);
        current = null;
        phase = "outro";
        continue;
      }
      continue;
    }

    if (phase === "preamble") {
      const lastUpd = raw.match(/^\*\*Última atualização:\*\*\s*(.+?)\\?\.?\s*$/);
      if (lastUpd?.[1]) {
        lastUpdated = lastUpd[1].replace(/\\([.\-])/g, "$1").replace(/\.$/, "");
        continue;
      }
      introLines.push(raw);
    } else if (phase === "section" && current) {
      current.body += (current.body ? "\n" : "") + raw;
    } else if (phase === "outro") {
      outroLines.push(raw);
    }
  }

  if (current) sections.push(current);

  for (const s of sections) s.body = s.body.replace(/^\n+|\n+$/g, "");

  return {
    title,
    lastUpdated,
    intro: introLines.join("\n").trim(),
    sections,
    outro: outroLines.join("\n").trim() || null,
  };
}
