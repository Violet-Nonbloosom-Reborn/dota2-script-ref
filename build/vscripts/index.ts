import { outputJson } from '../util';
import { apiDeclarations } from './api';
import { apiTypesDeclarations } from './api-types';
import { generateEnumDeclarations } from './enums';

export async function generateVScripts() {
  outputJson('vscripts/api', apiDeclarations());
  outputJson('vscripts/api-types', apiTypesDeclarations);
  const enumDeclarations = generateEnumDeclarations();
  outputJson('vscripts/enums', enumDeclarations.enumDeclarations);

  return {
    enumDeclarations,
  };
}
