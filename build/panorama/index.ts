import { outputJson } from '../util';
import { generatePanoramaApi } from './api';
import { generateCss } from './css';
import { enums } from './enums';
import { generatePanoramaEvents } from './events';

export function generatePanorama() {
  outputJson('panorama/api', generatePanoramaApi());
  outputJson('panorama/css', generateCss());
  outputJson('panorama/enums', enums);
  outputJson('panorama/events', generatePanoramaEvents());
}
