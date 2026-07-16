import fs from 'fs-extra';
import path from 'path';

const DUMP_PATH = path.join(__dirname, '../dumper/dump');
const SKILL_PATH = path.join(__dirname, '../skills/SKILL.md');

export function getClientVersion(): string {
  const dump = fs.readFileSync(DUMP_PATH, 'utf8');
  const match = dump.match(/^ClientVersion=(\d+)$/m);
  if (!match) {
    throw new Error('Could not find ClientVersion in dump file');
  }
  return match[1];
}

export function updateSkillVersion(version: string): void {
  let content = fs.readFileSync(SKILL_PATH, 'utf8');

  const lineEnding = content.includes('\r\n') ? '\r\n' : '\n';
  const frontmatterMatch = content.match(
    new RegExp(`^---${lineEnding}([\\s\\S]*?)${lineEnding}---`),
  );
  if (!frontmatterMatch) {
    throw new Error('Could not find frontmatter in SKILL.md');
  }

  const frontmatter = frontmatterMatch[1];
  let newFrontmatter: string;

  if (frontmatter.match(/^version:/m)) {
    newFrontmatter = frontmatter.replace(/^version:.*$/m, `version: ${version}`);
  } else {
    newFrontmatter = frontmatter.replace(/^(name:.*)$/m, `$1${lineEnding}version: ${version}`);
  }

  content = content.replace(
    new RegExp(`^---${lineEnding}[\\s\\S]*?${lineEnding}---`),
    `---${lineEnding}${newFrontmatter}${lineEnding}---`,
  );
  fs.writeFileSync(SKILL_PATH, content);
  console.log(`Updated SKILL.md version to ${version}`);
}
