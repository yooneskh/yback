import { PayticketMaker } from './paytickets-resource.ts';
import { IPayticket } from './paytickets-interfaces.d.ts';
import './paytickets-model.ts';
import { FactorController } from '../factors/factors-controller.ts';
import { getGatewayHandler } from './paytickets-gateways.ts';


export const PayticketController = PayticketMaker.getController();


PayticketMaker.addValidations({ });


export async function createPayticket(factorId: string, gateway: string, returnUrl?: string): Promise<IPayticket> {

  const factor = await FactorController.retrieve({ resourceId: factorId });
  if (factor.payed) throw new Error('factor is already payed');

  const handler = getGatewayHandler(gateway);
  if (!handler) throw new Error(`gateway not found for ${gateway}`);

  const payticket = await PayticketController.create({
    document: {
      factor: factorId,
      gateway,
      amount: factor.amount,
      returnUrl,
      meta: {}
    }
  });

  return handler.initialize(payticket);

}
