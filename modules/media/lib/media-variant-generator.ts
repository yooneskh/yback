import { Config } from "../../../config.ts";
import { MediaController } from "../media-controller.ts";
import { IMedia } from '../media-interfaces.d.ts';
import { transformMedia } from '../media-transformer-agent.ts';


const IMAGES_MIME_TYPES = [
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/tiff',
];

const MEDIA_VARIANTS = [
  ['large', '.webp', 1680, 85],
  ['medium', '-medium.webp', 1024, 60],
  ['small', '-small.webp', 512, 50]
];


export async function generateMediaVariants(media: IMedia) {

  if (!media.type || !IMAGES_MIME_TYPES.includes(media.type)) {
    return;
  }


  let currentMedia = media;


  for (const variant of MEDIA_VARIANTS) {
    try {

      const newRelativePath = `${currentMedia.relativePath.slice(0, currentMedia.relativePath.lastIndexOf('.'))}${variant[1]}`;

      await transformMedia(
        currentMedia,
        newRelativePath,
        [
          {
            method: 'resize',
            payload: {
              width: variant[2],
              withoutEnlargement: true
            }
          },
          {
            method: 'webp',
            payload: {
              quality: variant[3]
            }
          }
        ]
      );

     currentMedia = await MediaController.update({
        resourceId: currentMedia._id,
        payload: {
          variantRelatives: {
            ...(currentMedia.variantRelatives || {}),
            [variant[0]]: newRelativePath
          },
          variants: {
            ...(currentMedia.variants || {}),
            [variant[0]]: `${Config.media.baseUrl}/${newRelativePath}`
          }
        }
      });

    }
    // deno-lint-ignore no-explicit-any
    catch (error: any) {
      console.error(`error while making media variant`, variant[0], error?.message, media);
    }
  }

}