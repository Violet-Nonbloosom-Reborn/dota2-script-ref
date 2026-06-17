import { readDump } from '../../util';
import { PanoramaClass, PanoramaMethod, PanoramaArg } from './types';

const API_CLASS_PREFIXES = [
  'CPanoramaScript_',
  'CScriptBindingPR_',
  'CDOTA_PanoramaScript_',
];

const UI_CLASS_NAMES = [
  'DOTAHeroModelOverlay',
  'DOTAPlay',
  'Panel',
  'Label',
  'ToggleButton',
  'TabButton',
  'DOTAAvatarImage',
  'CustomUIElement',
];

const ALL_API_CLASSES = [...API_CLASS_PREFIXES, ...UI_CLASS_NAMES];

function isApiClass(name: string): boolean {
  return ALL_API_CLASSES.some((prefix) => name.startsWith(prefix));
}

function extractNamespace(className: string): string {
  for (const prefix of API_CLASS_PREFIXES) {
    if (className.startsWith(prefix)) {
      return className.slice(prefix.length);
    }
  }
  return className;
}

const TYPE_MAP: Record<string, string> = {
  cstring: 'string',
  integer: 'number',
  float: 'number',
  boolean: 'boolean',
  js_value: 'any',
  js_object: 'object',
  js_raw_args: 'any[]',
  panelhandle: 'Panel',
};

function mapType(type: string): string {
  return TYPE_MAP[type] ?? type;
}

function parseSignature(signature: string): PanoramaArg[] {
  const match = signature.match(/\(([^)]*)\)/);
  const argsStr = match?.[1] ?? '';
  const args: PanoramaArg[] = [];

  if (argsStr.trim()) {
    const argParts = argsStr.split(',').map((s) => s.trim());
    for (const part of argParts) {
      const argMatch = part.match(/^(\w+)\s+(\w+)$/);
      if (argMatch) {
        args.push({
          name: argMatch[2],
          type: mapType(argMatch[1]),
        });
      }
    }
  }

  return args;
}

function parseClassBlock(name: string, content: string): PanoramaClass {
  const methods: PanoramaMethod[] = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '|-') {
      const nameLine = lines[i + 1]?.trim();
      const sigLine = lines[i + 2]?.trim();
      const descLine = lines[i + 3]?.trim();

      if (nameLine?.startsWith('|') && sigLine?.startsWith('|')) {
        const methodName = nameLine.replace(/^\|\s*/, '');
        const codeMatch = sigLine.match(/<code>(.+)<\/code>/);
        const signature = codeMatch?.[1] ?? '';
        const description = descLine?.replace(/^\|\s*/, '').trim() || undefined;

        if (methodName && signature) {
          const args = parseSignature(signature);
          methods.push({ name: methodName, args, returns: 'any', description });
        }
        i += 3;
      }
    }
  }

  return {
    name,
    namespace: extractNamespace(name),
    methods,
  };
}

function parseTypescriptDeclarations(): Map<string, Map<string, string>> {
  const result = new Map<string, Map<string, string>>();
  const dumpContent = readDump('cl_panorama_typescript_declarations');

  const interfaceRegex = /interface\s+(\w+)\s*\{([^}]+)\}/g;
  let interfaceMatch;

  while ((interfaceMatch = interfaceRegex.exec(dumpContent)) !== null) {
    const className = interfaceMatch[1];
    const body = interfaceMatch[2];
    const methods = new Map<string, string>();

    const methodRegex = /(\w+)\s*\([^)]*\)\s*:\s*(\w+);/g;
    let methodMatch;

    while ((methodMatch = methodRegex.exec(body)) !== null) {
      const methodName = methodMatch[1];
      const returnType = methodMatch[2];
      methods.set(methodName, returnType);
    }

    result.set(className, methods);
  }

  return result;
}

export function generatePanoramaApi(): PanoramaClass[] {
  const dumpContent = readDump('cl_panorama_script_help_2');
  const result: PanoramaClass[] = [];
  const returnTypes = parseTypescriptDeclarations();

  const blocks = dumpContent.split(/=== (\w+) ===/);
  for (let i = 1; i < blocks.length; i += 2) {
    const name = blocks[i];
    const content = blocks[i + 1];

    if (isApiClass(name) && content.includes('! Function') && content.includes('! Signature')) {
      const cls = parseClassBlock(name, content);

      const classReturnTypes = returnTypes.get(name);
      if (classReturnTypes) {
        for (const method of cls.methods) {
          const returnType = classReturnTypes.get(method.name);
          if (returnType) {
            method.returns = returnType === 'void' ? 'void' : returnType;
          }
        }
      }

      result.push(cls);
    }
  }

  return result;
}
