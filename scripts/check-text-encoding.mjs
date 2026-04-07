import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const args = process.argv.slice(2);

const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.next',
  '.turbo',
  '.vercel',
]);

const TEXT_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.md',
  '.html',
  '.css',
  '.scss',
  '.yml',
  '.yaml',
  '.txt',
  '.xml',
  '.svg',
  '.env',
]);

const SUSPICIOUS_PATTERNS = [
  /\uFFFD/u,
  new RegExp('\\u00C3[\\u0080-\\u00BF]', 'u'),
  new RegExp('\\u00C2[\\u0080-\\u00BF]', 'u'),
  new RegExp('\\u00E2[\\u0080-\\u00BF]{2}', 'u'),
];

function isTextFile(filePath) {
  const base = path.basename(filePath);
  if (base === 'Dockerfile' || base === 'Makefile') return true;
  return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function walk(dirPath, result = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(rootDir, fullPath);

    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      walk(fullPath, result);
      continue;
    }

    if (!entry.isFile()) continue;
    if (!isTextFile(fullPath)) continue;
    result.push(relativePath);
  }

  return result;
}

function findIssuesInText(text, relativePath) {
  const issues = [];
  const lines = text.split(/\r?\n/u);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    for (const pattern of SUSPICIOUS_PATTERNS) {
      if (pattern.test(line)) {
        const excerpt = line.length > 160 ? `${line.slice(0, 157)}...` : line;
        issues.push({
          file: relativePath,
          line: i + 1,
          excerpt,
        });
        break;
      }
    }
  }

  return issues;
}

function runScan() {
  const files = walk(rootDir);
  const allIssues = [];

  for (const relativePath of files) {
    const absolutePath = path.join(rootDir, relativePath);
    const text = fs.readFileSync(absolutePath, 'utf8');
    allIssues.push(...findIssuesInText(text, relativePath));
  }

  if (allIssues.length > 0) {
    console.error('Potential mojibake detected:');
    for (const issue of allIssues) {
      console.error(`- ${issue.file}:${issue.line} -> ${issue.excerpt}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log('Encoding check passed: no mojibake patterns found.');
}

function runSelfTest() {
  const safeLine = 'Texto correto: automação, gestão e política.';
  const badLine = `Broken text: Do not modify${String.fromCodePoint(0x00C3, 0x00A2, 0x00C2, 0x20AC, 0x00C2, 0x201D)}watch carefully`;
  const brokenReplacement = 'Bad replacement char: texto com \uFFFD no meio';

  const safeIssues = findIssuesInText(safeLine, 'self-test-safe.txt');
  const badIssues = findIssuesInText(badLine, 'self-test-bad.txt');
  const replacementIssues = findIssuesInText(brokenReplacement, 'self-test-replacement.txt');

  const hasSafeFailure = safeIssues.length !== 0;
  const hasBadFailure = badIssues.length === 0 || replacementIssues.length === 0;

  if (hasSafeFailure || hasBadFailure) {
    console.error('Self-test failed.');
    if (hasSafeFailure) {
      console.error('- False positive detected for valid accented Portuguese text.');
    }
    if (hasBadFailure) {
      console.error('- Failed to detect known mojibake sample.');
    }
    process.exitCode = 1;
    return;
  }

  console.log('Self-test passed: valid accents allowed and mojibake patterns detected.');
}

if (args.includes('--self-test')) {
  runSelfTest();
} else {
  runScan();
}
