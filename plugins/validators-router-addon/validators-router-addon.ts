import { ResourceMaker } from '../../plugins/resource-maker/resource-maker.ts';
import type { IResourceActionMultiFunction } from '../../plugins/resource-maker/resource-router.d.ts';
import { executeActionMultiFunction } from "../resource-maker/resource-util.ts";


declare module '../../plugins/resource-maker/resource-router.d.ts' {
  interface IResourceAction<T, TF> {
    stateValidators?: IResourceActionMultiFunction<T, TF>;
    payloadValidators?: IResourceActionMultiFunction<T, TF>;
  }
}

ResourceMaker.addGlobalActionAugmentor(action => {
  if (!action.stateValidators) {
    return {
      stateValidators: [],
      payloadValidators: []
    };
  }
});

ResourceMaker.addGlobalPreware(async context => {

  if (context.action.payloadValidators) {
    await executeActionMultiFunction(context.action.payloadValidators, context);
  }

  if (context.action.stateValidators) {
    await executeActionMultiFunction(context.action.stateValidators, context);
  }

});
