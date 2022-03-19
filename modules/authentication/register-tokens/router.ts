import { RegisterTokenMaker } from './resource.ts';
import './controller.ts';


RegisterTokenMaker.addActions({
  'list': {
    template: 'list',
    permission: 'admin.register-token.list'
  },
  'count': {
    template: 'count',
    permission: 'admin.register-token.count'
  },
  'retrieve': {
    template: 'retrieve',
    permission: 'admin.register-token.retrieve'
  },
  'create': {
    template: 'create',
    permission: 'admin.register-token.create'
  },
  'update': {
    template: 'update',
    permission: 'admin.register-token.update'
  },
  'delete': {
    template: 'delete',
    permission: 'admin.register-token.delete'
  }
});


export const RegisterTokenRouter = RegisterTokenMaker.getRouter();
