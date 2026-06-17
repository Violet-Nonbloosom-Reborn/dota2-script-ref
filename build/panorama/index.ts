import { outputJson } from '../util';
import { generateCss } from './css';
import { enums } from './enums';
import { generatePanoramaEvents } from './events';

export function generatePanorama() {
  outputJson('panorama/css', generateCss());
  outputJson('panorama/enums', enums);
  outputJson('panorama/events', generatePanoramaEvents());
}
