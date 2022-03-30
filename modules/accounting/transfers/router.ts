import { TransferMaker } from './resource.ts';
import './controller.ts';
import { createTransfer } from './controller.ts';


TransferMaker.addActions({
  'list': {
    template: 'list',
    permission: 'admin.transfer.list'
  },
  'count': {
    template: 'count',
    permission: 'admin.transfer.count'
  },
  'retrieve': {
    template: 'retrieve',
    permission: 'admin.transfer.retrieve'
  },
  'create': {
    template: 'create',
    permission: 'admin.transfer.create',
    provider: ({ payload }) => {
      return createTransfer(
        payload.fromAccount,
        payload.toAccount,
        payload.amount,
        payload.description
      )
    }
  },
  'update': {
    template: 'update',
    permission: 'special.transfer.update'
  },
  'delete': {
    template: 'delete',
    permission: 'special.transfer.delete'
  }
});


export const TransferRouter = TransferMaker.getRouter();
