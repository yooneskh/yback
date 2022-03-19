import { FactorMaker } from './resource.ts';
import './controller.ts';


FactorMaker.addActions({
  'list': {
    template: 'list',
    permission: 'admin.factor.list'
  },
  'count': {
    template: 'count',
    permission: 'admin.factor.count'
  },
  'retrieve': {
    template: 'retrieve',
    permission: 'admin.factor.retrieve'
  },
  'create': {
    template: 'create',
    permission: 'admin.factor.create'
  },
  'update': {
    template: 'update',
    permission: 'admin.factor.update',
    stateValidators: [
      async ({ resourceId, controller }) => {
        const factor = await controller.retrieve({ resourceId });
        if (factor.payed) throw new Error(`factor ${factor.name} is payed`);
      }
    ]
  },
  'delete': {
    template: 'delete',
    permission: 'admin.factor.delete',
    stateValidators: [
      async ({ resourceId, controller }) => {
        const factor = await controller.retrieve({ resourceId });
        if (factor.payed) throw new Error(`factor ${factor.name} is payed`);
      }
    ]
  }
});


export const FactorRouter = FactorMaker.getRouter();
