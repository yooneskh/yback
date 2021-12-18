import { EventEmitter } from '../../services/event-emitter.ts';
import { IMedia } from './media-interfaces.d.ts';
import { generateMediaVariants } from './lib/media-variant-generator.ts';


EventEmitter.on('Resource.Media.Uploaded', async (_event: string, _mediaId: string, media: IMedia) => {
  await generateMediaVariants(media);
});
