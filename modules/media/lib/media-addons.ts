import { registerMediaAddon } from '../media-globals.ts';
import { generateMediaVariants } from './media-variant-generator.ts';


registerMediaAddon(async media => {
  await generateMediaVariants(media);
});
