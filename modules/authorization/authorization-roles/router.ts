import { AuthorizationRoleMaker } from './resource.ts';
import './controller.ts';


AuthorizationRoleMaker.addActions({
  'list': {
    template: 'list',
    permission: 'admin.authorization-role.list'
  },
  'count': {
    template: 'count',
    permission: 'admin.authorization-role.count'
  },
  'retrieve': {
    template: 'retrieve',
    permission: 'admin.authorization-role.retrieve'
  },
  'create': {
    template: 'create',
    permission: 'admin.authorization-role.create'
  },
  'update': {
    template: 'update',
    permission: 'admin.authorization-role.update'
  },
  'delete': {
    template: 'delete',
    permission: 'admin.authorization-role.delete'
  }
});


export const AuthorizationRoleRouter = AuthorizationRoleMaker.getRouter();
