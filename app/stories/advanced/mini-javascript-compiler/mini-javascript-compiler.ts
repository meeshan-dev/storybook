type Token =
  | { type: 'keyword'; value: 'let' | 'const' }
  | { type: 'identifier'; value: string }
  | { type: 'number'; value: number }
  | { type: 'operator'; value: '+' | '-' | '*' | '/' | '=' }
  | { type: 'punctuation'; value: ';' };

const isLetter = (char: string) => /[a-zA-Z_]/.test(char);
const isDigit = (char: string) => /[0-9]/.test(char);

export function tokenize(input: string): Token[] {
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

  resetValue();

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
      expression: ASTNode;
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

export function parse(tokens: Token[]): ASTNode {
  let idx = 0;

  const parsed: ASTNode[] = [];

  while (idx < tokens.length) {
    const kind = tokens[idx];
    idx++;

    if (
      kind.type === 'keyword' &&
      (kind.value === 'const' || kind.value === 'let')
    ) {
      const identifier = tokens[idx];
      idx++;

      if (!identifier || identifier.type !== 'identifier') {
        throw new SyntaxError(`Expected identifier after ${kind.value}`);
      }

      const equal = tokens[idx];
      idx++;

      if (!equal || equal.type !== 'operator' || equal.value !== '=') {
        throw new SyntaxError(
          `Expected '=' after identifier ${identifier.value}`,
        );
      }

      // Only handle single binary expressions: a + b, x * y, number literals

      let expression: ASTNode;

      const left = tokens[idx];
      idx++;

      let leftNode: ASTNode;

      if (left.type === 'identifier') {
        leftNode = { type: 'Identifier', name: left.value };
      } else if (left.type === 'number') {
        leftNode = { type: 'Literal', value: left.value };
      } else {
        throw new SyntaxError(
          'Expected identifier or number as left-hand side of expression',
        );
      }

      const operator = tokens[idx];

      if (
        operator?.type === 'operator' &&
        (operator.value === '+' ||
          operator.value === '-' ||
          operator.value === '*' ||
          operator.value === '/')
      ) {
        // increment idx here because if it's an operator, we need to consume it before looking for the right side of the expression
        idx++;

        const right = tokens[idx];
        idx++;

        let rightNode: ASTNode;

        if (!right) {
          throw new SyntaxError(
            `Unexpected end of input, expected right-hand side of expression`,
          );
        }

        if (right.type === 'identifier') {
          rightNode = { type: 'Identifier', name: right.value };
        } else if (right.type === 'number') {
          rightNode = { type: 'Literal', value: right.value };
        } else {
          throw new SyntaxError(
            `Unexpected token in expression: ${JSON.stringify(right)}`,
          );
        }

        expression = {
          type: 'BinaryExpression',
          operator: operator.value,
          left: leftNode,
          right: rightNode,
        };
      } else {
        expression = leftNode;
      }

      const declarationEnd = tokens[idx];
      idx++;

      if (
        declarationEnd?.type === 'identifier' ||
        declarationEnd?.type === 'number'
      ) {
        throw new SyntaxError(
          'Expected operator between expressions, e.g. x = y + 2;',
        );
      }

      if (
        !declarationEnd ||
        declarationEnd.type !== 'punctuation' ||
        declarationEnd.value !== ';'
      ) {
        throw new SyntaxError(
          `Expected ';' after "${generate(expression)}" declaration`,
        );
      }

      parsed.push({
        type: 'VariableDeclaration',
        kind: kind.value,
        id: { type: 'Identifier', name: identifier.value },
        expression,
      });
    } else {
      throw new SyntaxError(`Unexpected token: ${JSON.stringify(kind)}`);
    }
  }

  return {
    type: 'Program',
    body: parsed,
  };
}

/* ———————————————————— Generate ———————————————————— */

export function generate(node: ASTNode): string {
  switch (node.type) {
    case 'Program':
      return node.body.map(generate).join('\n');

    case 'VariableDeclaration':
      return `${node.kind} ${generate(node.id)} = ${generate(node.expression)};`;

    case 'Identifier':
      return node.name;

    case 'Literal':
      return String(node.value);

    case 'BinaryExpression':
      return `${generate(node.left)} ${node.operator} ${generate(node.right)}`;

    default:
      throw new Error('Unknown node type');
  }
}
