/**
 * A very small, dependency-free syntax highlighter.
 * ---------------------------------------------------------------------------
 * It walks the source once with a set of sticky (`y`) regexes and emits a flat
 * token list, which `CodeBlock` renders as `<span>`s. It is deliberately naive:
 * the samples on this site are short, fixed and authored alongside the rules,
 * so there is no need for a real parser — and no need for a 40 kB dependency.
 *
 * Token classes map to the `term.*` colours in tailwind.config.ts; every one of
 * them clears 4.5:1 against the `#0B1120` panel ground.
 */

export type Lang = 'json' | 'ts' | 'yaml' | 'hcl' | 'http' | 'sql' | 'text';

export type Token = { cls: TokenClass | null; text: string };
export type TokenClass = 'com' | 'str' | 'num' | 'key' | 'fn' | 'op' | 'meta';

type Rule = { cls: TokenClass; re: RegExp };

const kw = (words: string[]) => new RegExp(`\\b(?:${words.join('|')})\\b`, 'y');

const STRING = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/y;
const NUMBER = /\b\d+(?:\.\d+)*(?:[a-zA-Z%]{1,3})?\b/y;

const RULES: Record<Lang, Rule[]> = {
  json: [
    { cls: 'com', re: /\/\/[^\n]*/y },
    // A quoted key — matched before the generic string rule.
    { cls: 'fn', re: /"(?:[^"\\\n]|\\.)*"(?=\s*:)/y },
    { cls: 'str', re: STRING },
    { cls: 'key', re: kw(['true', 'false', 'null']) },
    { cls: 'num', re: NUMBER },
    { cls: 'op', re: /[{}[\],:]/y },
  ],
  ts: [
    { cls: 'com', re: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
    { cls: 'str', re: STRING },
    {
      cls: 'key',
      re: kw([
        'import', 'from', 'export', 'default', 'const', 'let', 'var', 'function', 'return', 'await', 'async',
        'type', 'interface', 'class', 'extends', 'implements', 'new', 'if', 'else', 'for', 'of', 'in', 'try',
        'catch', 'finally', 'throw', 'true', 'false', 'null', 'undefined', 'as', 'satisfies',
      ]),
    },
    { cls: 'num', re: NUMBER },
    { cls: 'fn', re: /\b[A-Za-z_$][\w$]*(?=\s*\()/y },
    { cls: 'meta', re: /\b[A-Z][\w$]*\b/y },
    { cls: 'op', re: /[=<>!+\-*/%&|?:;,.(){}[\]]/y },
  ],
  yaml: [
    { cls: 'com', re: /#[^\n]*/y },
    { cls: 'fn', re: /^[ \t]*-?[ \t]*[\w.$-]+(?=:)/my },
    { cls: 'str', re: STRING },
    { cls: 'key', re: kw(['true', 'false', 'null', 'on', 'off', 'yes', 'no']) },
    { cls: 'num', re: NUMBER },
    { cls: 'op', re: /[-|>:]/y },
  ],
  hcl: [
    { cls: 'com', re: /#[^\n]*|\/\/[^\n]*/y },
    { cls: 'str', re: STRING },
    {
      cls: 'key',
      re: kw(['resource', 'module', 'variable', 'provider', 'output', 'data', 'locals', 'terraform', 'true', 'false']),
    },
    { cls: 'num', re: NUMBER },
    { cls: 'fn', re: /\b[\w.-]+(?=\s*=)/y },
    { cls: 'op', re: /[={}[\]]/y },
  ],
  http: [
    { cls: 'com', re: /#[^\n]*/y },
    { cls: 'key', re: /^(?:GET|POST|PUT|PATCH|DELETE|HTTP\/[\d.]+)/my },
    { cls: 'meta', re: /^[A-Za-z][A-Za-z-]*(?=:)/my },
    { cls: 'fn', re: /"(?:[^"\\\n]|\\.)*"(?=\s*:)/y },
    { cls: 'str', re: STRING },
    { cls: 'key', re: kw(['true', 'false', 'null']) },
    { cls: 'num', re: NUMBER },
    { cls: 'op', re: /[{}[\],:]/y },
  ],
  sql: [
    { cls: 'com', re: /--[^\n]*/y },
    { cls: 'str', re: STRING },
    {
      cls: 'key',
      re: new RegExp(
        `\\b(?:${[
          'select', 'from', 'where', 'group', 'by', 'order', 'having', 'join', 'left', 'inner', 'on', 'as',
          'with', 'and', 'or', 'not', 'limit', 'desc', 'asc', 'over', 'partition', 'between', 'interval',
        ].join('|')})\\b`,
        'iy',
      ),
    },
    { cls: 'num', re: NUMBER },
    { cls: 'fn', re: /\b[A-Za-z_][\w]*(?=\s*\()/y },
    { cls: 'op', re: /[=<>!+\-*/,;().]/y },
  ],
  text: [],
};

export function tokenize(code: string, lang: Lang): Token[] {
  const rules = RULES[lang] ?? [];
  const tokens: Token[] = [];
  let plain = '';
  let i = 0;

  const flush = () => {
    if (plain) {
      tokens.push({ cls: null, text: plain });
      plain = '';
    }
  };

  while (i < code.length) {
    let hit: Token | null = null;
    for (const rule of rules) {
      rule.re.lastIndex = i;
      const m = rule.re.exec(code);
      if (m && m.index === i && m[0].length > 0) {
        hit = { cls: rule.cls, text: m[0] };
        break;
      }
    }
    if (hit) {
      flush();
      tokens.push(hit);
      i += hit.text.length;
    } else {
      plain += code[i];
      i += 1;
    }
  }
  flush();
  return tokens;
}

/** Splits a token stream into lines so the renderer can add a number gutter. */
export function tokenizeLines(code: string, lang: Lang): Token[][] {
  const lines: Token[][] = [[]];
  for (const token of tokenize(code, lang)) {
    const parts = token.text.split('\n');
    parts.forEach((part, idx) => {
      if (idx > 0) lines.push([]);
      if (part) lines[lines.length - 1].push({ cls: token.cls, text: part });
    });
  }
  return lines;
}

export const TOKEN_CLASS: Record<TokenClass, string> = {
  com: 'text-term-dim italic',
  str: 'text-term-str',
  num: 'text-term-num',
  key: 'text-term-key',
  fn: 'text-term-fn',
  op: 'text-term-dim',
  meta: 'text-term-key',
};
