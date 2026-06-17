import { readDump } from '../../util';
import { getEnumDescription } from '../../vscripts/api/data/modifier-properties';
import { Enum, EnumMember } from './types';

function parseEnumBlock(name: string, content: string): Enum {
  const members: EnumMember[] = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '|-') {
      const nameLine = lines[i + 1]?.trim();
      const valueLine = lines[i + 2]?.trim();
      const descLine = lines[i + 3]?.trim();

      if (nameLine?.startsWith('|') && valueLine?.startsWith('|')) {
        const fullName = nameLine.replace(/^\|\s*/, '');
        const memberName = fullName.replace(/^[\w.]+\./, '');
        const value = parseInt(valueLine.replace(/^\|\s*/, ''), 10);
        const description = descLine?.replace(/^\|\s*/, '').trim() || undefined;

        if (!isNaN(value) && memberName) {
          members.push({ name: memberName, value, description });
        }
        i += 3;
      }
    }
  }

  return { name, members };
}

export const enums = (() => {
  const dumpContent = readDump('cl_panorama_script_help_2');
  const result: Enum[] = [];

  const blocks = dumpContent.split(/=== (\w+) ===/);
  for (let i = 1; i < blocks.length; i += 2) {
    const name = blocks[i];
    const content = blocks[i + 1];

    if (content.includes('! Enumerator')) {
      result.push(parseEnumBlock(name, content));
    }
  }

  const modifierFunction = result.find((x) => x.name === 'modifierfunction');
  if (modifierFunction) {
    for (const member of modifierFunction.members) {
      member.description = getEnumDescription(member.description);
    }
  }

  return result;
})();
