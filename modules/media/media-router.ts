import { MediaMaker } from './media-resource.ts';
import { copy, ensureFile, readerFromStreamReader } from '../../deps.ts';
import { Config } from '../../config.ts';
import './media-controller.ts';


MediaMaker.addActions({
  'list': {
    template: 'list'
  },
  'count': {
    template: 'count'
  },
  'retrieve': {
    template: 'retrieve'
  },
  'create': {
    template: 'create'
  },
  'update': {
    template: 'update'
  },
  'delete': {
    template: 'delete'
  },
  'upload': {
    method: 'post',
    path: '/upload',
    signal: 'Route.Media.Upload',
    provider: async ({ requestEvent, controller, user }) => {

      const file = requestEvent.body.file as File;
      if (!file) throw new Error('file not provided');
      if (!( file.size > 0 )) throw new Error('file is invalid');

      const name = file.name.slice(0, file.name.lastIndexOf('.'));
      const extension = file.name.slice(file.name.lastIndexOf('.') + 1);
      const size = file.size;
      const type = file.type;

      if (!name) throw new Error('invalid file name');
      if (!extension) throw new Error('invalid file extension');
      if (!type) throw new Error('invalid file type');

      const mediaBase = await controller.create({
        document: {
          owner: String(user?._id),
          name,
          extension,
          size,
          type,
          relativePath: '',
          path: ''
        }
      });

      try {

        const relativeFilePath = `${Config.media.directory}/${mediaBase._id}.${extension}`;
        await ensureFile(`./${relativeFilePath}`);

        const stream = await file.stream();
        const reader = readerFromStreamReader(stream.getReader());
        const output = await Deno.open(`./${relativeFilePath}`, { write: true, create: true, truncate: true });

        await copy(reader, output);

        const fullPath = `${Config.media.baseUrl}/${relativeFilePath}`;

        return await controller.update({
          resourceId: mediaBase._id,
          payload: {
            relativePath: relativeFilePath,
            path: fullPath
          }
        });

      }
      catch (error: unknown) {
        await controller.delete({ resourceId: mediaBase._id });
        throw error;
      }

    }
  }
});


export const MediaRouter = MediaMaker.getRouter();
