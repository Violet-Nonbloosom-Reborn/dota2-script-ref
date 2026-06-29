import { generatePanorama } from './panorama';
import { generateVScripts } from './vscripts';
import { getClientVersion, updateSkillVersion } from './generate-skill-version';

import { validateApi } from './vscripts/api';
import { validateApiTypes } from './vscripts/api-types';
import {
  modifierFunctionMethods,
  validateModifierMethod,
} from './vscripts/api/data/modifier-properties';
import { validateEnums } from './vscripts/enums';

(async () => {
  console.log('Generating VScript types...');

  const vscriptsResult = await generateVScripts();

  console.log('Generating Panorama types...');

  await generatePanorama();

  console.log('\nDone!\n');

  console.log('Validating results:\n');

  validateApi();
  validateApiTypes();
  modifierFunctionMethods().forEach(validateModifierMethod);

  validateEnums(vscriptsResult.enumDeclarations);

  console.log('\nUpdating skill version...');
  const version = getClientVersion();
  updateSkillVersion(version);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
