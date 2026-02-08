type Token =
  | { type: 'keyword'; value: 'let' | 'const' }
  | { type: 'identifier'; value: string }
  | { type: 'number'; value: number }
  | { type: 'operator'; value: '+' | '-' | '*' | '/' | '=' }
  | { type: 'punctuation'; value: ';' };

/* ———————————————————— Tokenize ———————————————————— */

const isLetter = (char: string) => /[a-zA-Z_]/.test(char);
const isDigit = (char: string) => /[0-9]/.test(char);

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let idx = 0;
  let value = '';

  // Helper to reset the current value and push a token if it's valid
  const resetValue = () => {
    // Check for keywords and identifiers
    if (value === 'let' || value === 'const') {
      tokens.push({ type: 'keyword', value });
    } else if (/^[0-9]+$/.test(value)) {
      tokens.push({ type: 'number', value: +value });
    } else if (value) {
      tokens.push({ type: 'identifier', value });
    }

    value = '';
  };

  while (idx < input.length) {
    const char = input[idx];

    // Whitespace
    if (/\s/.test(char)) {
      resetValue();
      idx++;
      continue;
    }

    if (isLetter(char)) {
      value += char;
      idx++;
      continue;
    }

    if (isDigit(char)) {
      value += char;
      idx++;
      continue;
    }

    // Operators
    if (
      char === '+' ||
      char === '-' ||
      char === '*' ||
      char === '/' ||
      char === '='
    ) {
      tokens.push({ type: 'operator', value: char });
      idx++;
      continue;
    }

    // Punctuation
    if (char === ';') {
      resetValue();

      tokens.push({ type: 'punctuation', value: ';' });
      idx++;
      continue;
    }

    throw new Error(`Unexpected character: ${char}`);
  }

  return tokens;
}

/* ———————————————————— Parse ———————————————————— */

type ASTNode =
  | {
      type: 'Program';
      body: ASTNode[];
    }
  | {
      type: 'VariableDeclaration';
      kind: 'let' | 'const';
      id: { type: 'Identifier'; name: string };
      init: ASTNode;
    }
  | {
      type: 'BinaryExpression';
      operator: '+' | '-' | '*' | '/' | '=';
      left: ASTNode;
      right: ASTNode;
    }
  | {
      type: 'Identifier';
      name: string;
    }
  | {
      type: 'Literal';
      value: number;
    };

function parse(tokens: Token[]): ASTNode {
  let idx = 0;

  function peek(): Token | undefined {
    return tokens[idx];
  }

  function consume(): Token {
    const token = tokens[idx];
    idx++;
    return token;
  }

  function parseProgram(): ASTNode {
    const body: ASTNode[] = [];
    while (idx < tokens.length) {
      body.push(parseStatement());
    }
    return { type: 'Program', body };
  }

  function parseStatement(): ASTNode {
    const token = peek();

    if (
      token?.type === 'keyword' &&
      (token.value === 'let' || token.value === 'const')
    ) {
      return parseVariableDeclaration();
    }

    throw new SyntaxError(`Unexpected token: ${JSON.stringify(token)}`);
  }

  function parseVariableDeclaration(): ASTNode {
    const kindToken = consume(); // let or const
    const kind = kindToken.value as 'let' | 'const';

    const idToken = consume();
    if (!idToken || idToken.type !== 'identifier') {
      throw new SyntaxError(`Expected identifier after ${kind}`);
    }
    const id = { type: 'Identifier' as const, name: idToken.value };

    const eqToken = consume();
    if (!eqToken || eqToken.type !== 'operator' || eqToken.value !== '=') {
      throw new SyntaxError(`Expected '=' after identifier ${id.name}`);
    }

    const init = parseExpression();

    const semiToken = consume();
    if (
      !semiToken ||
      semiToken.type !== 'punctuation' ||
      semiToken.value !== ';'
    ) {
      throw new SyntaxError(`Expected ';' after variable declaration`);
    }

    return {
      type: 'VariableDeclaration',
      kind,
      id,
      init,
    };
  }

  function parseExpression(): ASTNode {
    // Only handle single binary expressions: a + b, x * y, number literals
    const left = parsePrimary();

    const opToken = peek();
    if (opToken?.type === 'operator' && '+-*/'.includes(opToken.value)) {
      const operator = consume().value as '+' | '-' | '*' | '/';
      const right = parsePrimary();
      return {
        type: 'BinaryExpression',
        operator,
        left,
        right,
      };
    }

    return left;
  }

  function parsePrimary(): ASTNode {
    const token = consume();
    if (!token) throw new SyntaxError('Unexpected end of input');

    if (token.type === 'identifier') {
      return { type: 'Identifier', name: token.value };
    }

    if (token.type === 'number') {
      return { type: 'Literal', value: Number(token.value) };
    }

    throw new SyntaxError(
      `Unexpected token in expression: ${JSON.stringify(token)}`,
    );
  }

  return parseProgram();
}

console.log(
  JSON.stringify(parse(tokenize('let x = 5 + 3; const y = x * 2;')), null, 2),
);
