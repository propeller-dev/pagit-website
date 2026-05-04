#!/usr/bin/env node
/**
 * Valida que o texto bruto renderizado nas páginas legais é
 * caractere-a-caractere idêntico ao texto bruto extraído dos MDs em
 * content/legal/. Sensível a aspas curvas/retas, hífen vs en/em-dash,
 * espaços invisíveis (NBSP, ZWSP) e capitalização.
 *
 * Uso: node scripts/validate-legal-content.mjs [base-url]
 *   base-url default: http://localhost:3000
 *
 * Exit 0 = sincronia. Exit 1 = divergência.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3000";

const TARGETS = [
  { slug: "politica-de-privacidade", route: "/politica-de-privacidade" },
  { slug: "termos-de-servico", route: "/termos-de-servico" },
];

function stripMarkdown(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  for (let line of lines) {
    if (/^---\s*$/.test(line)) continue;
    // "Última atualização" vai para o topbar, fora do <main>
    if (/^\*\*Última atualização:\*\*/.test(line)) continue;
    // Heading: tira só o "## ", mantém "N. TÍTULO" (h2 renderiza com número visível)
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      line = heading[2];
    } else {
      // Ordered list: tira "1. " (CSS gera o número via list-style)
      line = line.replace(/^\s*\d+\.\s+/, "");
      // Bullet list: tira marcador
      line = line.replace(/^\s*[*\-+]\s+/, "");
    }
    line = line.replace(/\\([!-/:-@\[-`{-~])/g, "$1");
    line = line.replace(/\*\*([^*]+)\*\*/g, "$1");
    line = line.replace(/\*([^*]+)\*/g, "$1");
    line = line.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    out.push(line);
  }
  return out.join("\n");
}

function normalizeWhitespace(s) {
  let out = s.replace(/\s+/g, " ").trim();
  // Tags inline geram espaços antes de pontuação ao serem stripadas; remove.
  out = out.replace(/\s+([.,;:!?)])/g, "$1");
  out = out.replace(/([(])\s+/g, "$1");
  return out;
}

function stripHtml(html) {
  let body = html;
  const main = html.match(/<main[^>]*id="legal-conteudo"[^>]*>([\s\S]*?)<\/main>/i);
  if (main) body = main[1];
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
  body = body.replace(/<style[\s\S]*?<\/style>/gi, "");
  body = body.replace(/<nav[\s\S]*?<\/nav>/gi, "");
  body = body.replace(/<aside[\s\S]*?<\/aside>/gi, "");
  body = body.replace(/<span[^>]*data-legal-decor[^>]*>[\s\S]*?<\/span>/gi, "");
  body = body.replace(/<[^>]+data-legal-decor[^>]*>[\s\S]*?<\/[a-z0-9]+>/gi, "");
  body = body.replace(/<[^>]+>/g, " ");
  body = body
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&ordf;/g, "ª")
    .replace(/&ordm;/g, "º")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
  return body;
}

function showDiff(a, b, label) {
  const len = Math.min(a.length, b.length);
  let firstDiff = -1;
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) {
      firstDiff = i;
      break;
    }
  }
  if (firstDiff === -1 && a.length !== b.length) firstDiff = len;
  if (firstDiff === -1) return null;
  const start = Math.max(0, firstDiff - 30);
  const end = Math.min(Math.max(a.length, b.length), firstDiff + 30);
  return [
    `${label} divergência no offset ${firstDiff}:`,
    `  MD esperado : "${a.slice(start, end).replace(/\n/g, "\\n")}"`,
    `  HTML obtido : "${b.slice(start, end).replace(/\n/g, "\\n")}"`,
    `  caractere   : MD=${JSON.stringify(a[firstDiff] ?? "<EOF>")} HTML=${JSON.stringify(b[firstDiff] ?? "<EOF>")}`,
  ].join("\n");
}

let failures = 0;

for (const { slug, route } of TARGETS) {
  console.log(`\n=== ${slug} ===`);
  const md = await readFile(
    path.join(process.cwd(), "content/legal", `${slug}.md`),
    "utf8",
  );
  const expected = normalizeWhitespace(stripMarkdown(md));

  const res = await fetch(`${BASE}${route}`);
  if (!res.ok) {
    console.error(`  HTTP ${res.status} ao buscar ${route}`);
    failures++;
    continue;
  }
  const html = await res.text();
  const got = normalizeWhitespace(stripHtml(html));

  if (expected === got) {
    console.log(`  OK — ${expected.length} caracteres conferem`);
  } else {
    failures++;
    console.error(`  FALHOU`);
    console.error(`  expected length=${expected.length}, got length=${got.length}`);
    const diff = showDiff(expected, got, "  ");
    if (diff) console.error(diff);
  }
}

if (failures > 0) {
  console.error(`\n✗ ${failures} divergência(s) encontrada(s)`);
  process.exit(1);
} else {
  console.log("\n✓ Todas as páginas legais batem com o conteúdo MD");
  process.exit(0);
}
