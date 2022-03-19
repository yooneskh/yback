import { AuthenticationTokenMaker } from './resource.ts';
import './controller.ts';


AuthenticationTokenMaker.addActions({
  'list': {
    template: 'list',
    permission: 'admin.authentication-token.list'
  },
  'count': {
    template: 'count',
    permission: 'admin.authentication-token.count'
  },
  'retrieve': {
    template: 'retrieve',
    permission: 'admin.authentication-token.retrieve'
  },
  'create': {
    template: 'create',
    permission: 'admin.authentication-token.create'
  },
  'update': {
    template: 'update',
    permission: 'admin.authentication-token.update'
  },
  'delete': {
    template: 'delete',
    permission: 'admin.authentication-token.delete'
  }
});


export const AuthenticationTokenRouter = AuthenticationTokenMaker.getRouter();
