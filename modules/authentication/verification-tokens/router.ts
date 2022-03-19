import { VerificationTokenMaker } from './resource.ts';
import './controller.ts';


VerificationTokenMaker.addActions({
  'list': {
    template: 'list',
    permission: 'admin.verification-token.list'
  },
  'count': {
    template: 'count',
    permission: 'admin.verification-token.count'
  },
  'retrieve': {
    template: 'retrieve',
    permission: 'admin.verification-token.retrieve'
  },
  'create': {
    template: 'create',
    permission: 'admin.verification-token.create'
  },
  'update': {
    template: 'update',
    permission: 'admin.verification-token.update'
  },
  'delete': {
    template: 'delete',
    permission: 'admin.verification-token.delete'
  }
});


export const VerificationTokenRouter = VerificationTokenMaker.getRouter();
