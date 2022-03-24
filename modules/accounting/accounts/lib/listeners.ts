import { EventEmitter } from '../../../../services/event-emitter.ts';
import { IUser } from '../../../users/interfaces.d.ts';
import { AccountController } from "../controller.ts";


EventEmitter.on('Resource.User.Created', async (_event: string, userId: string, _user: IUser) => {
  await AccountController.create({
    document: {
      user: userId,
      balance: 0,
      acceptsInput: true,
      acceptsOutput: true,
      allowNegativeBalance: false
    }
  });
});
