import { AuthorizationTokenMaker } from './resource.ts';
import './controller.ts';


AuthorizationTokenMaker.addActions({
  'list': {
    template: 'list',
    permission: 'admin.authorization-token.list'
  },
  'count': {
    template: 'count',
    permission: 'admin.authorization-token.count'
  },
  'retrieve': {
    template: 'retrieve',
    permission: 'admin.authorization-token.retrieve'
  },
  'create': {
    template: 'create',
    permission: 'admin.authorization-token.create'
  },
  'update': {
    template: 'update',
    permission: 'admin.authorization-token.update'
  },
  'delete': {
    template: 'delete',
    permission: 'admin.authorization-token.delete'
  }
});


export const AuthorizationTokenRouter = AuthorizationTokenMaker.getRouter();
