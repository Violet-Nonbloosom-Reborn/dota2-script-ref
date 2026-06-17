import fs from 'fs-extra';
import path from 'path';

export * from './normalization';

const dump = fs.readFileSync(path.join(__dirname, '../../dumper/dump'), 'utf8');
export function readDump(name: string) {
  const [, ...groups] = dump.split(/\$> (.+)/g);
  let value = groups[groups.indexOf(name) + 1];
  if (value.trim().startsWith('Initializing')) {
    value = value.slice(value.indexOf('['));
  }

  if (value == null) throw new Error(`Couldn't find dump "${name}"`);
  return value.trim();
}

const FILES = path.join(__dirname, '../../skills/reference');
export const outputJson = (name: string, data: any) =>
  fs.outputJsonSync(path.join(FILES, `${name}.json`), data, { spaces: 2 });
