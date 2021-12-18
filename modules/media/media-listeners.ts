import { EventEmitter } from '../../services/event-emitter.ts';
import { IMedia } from './media-interfaces.d.ts';
import { transformMedia } from './media-transformer-agent.ts';
import { MediaController } from './media-controller.ts';
import { Config } from '../../config.ts';


EventEmitter.on('Resource.Media.Uploaded', async (_event: string, _mediaId: string, media: IMedia) => {

  await transformMedia(
    media,
    `${media.relativePath}.webp`,
    [
      {
        method: 'resize',
        payload: {
          width: 1680,
          withoutEnlargement: true
        }
      },
      {
        method: 'webp',
        payload: {
          quality: 85
        }
      }
    ]
  );

  await MediaController.update({
    resourceId: media._id,
    payload: {
      variants: {
        ...(media.variants || {}),
        'large': `${Config.media.baseUrl}/${media.relativePath}.webp`
      }
    }
  });

});
