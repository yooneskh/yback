import { ObjectId } from '../../deps.ts';
import { ResourceController } from '../resource-maker/resource-controller.ts';
import { IResourceBase } from '../resource-maker/resource-model.d.ts';
import { IResourceSettingsControllerContext } from './setting-resource-controller.d.ts';


export class SettingResourceController<T, TF extends IResourceBase> {

  constructor(private controller: ResourceController<T, TF>) {

  }


  private settingId?: typeof ObjectId;


  public async retrieve(context: IResourceSettingsControllerContext<T, TF>): Promise<TF> {

    if (this.settingId) {
      return this.controller.retrieve({
        resourceId: this.settingId,
        selects: context.selects,
        populates: context.populates
      });
    }


    const item = await this.controller.create({
      document: {} as unknown as T
    });

    this.settingId = item._id;
    return item;

  }

  public async update(context: IResourceSettingsControllerContext<T, TF>): Promise<TF> {

    if (this.settingId) {
      return this.controller.update({
        resourceId: this.settingId,
        payload: context.payload
      });
    }


    const item = await this.controller.findBy({});

    if (!item) {

      const newItem = await this.controller.create({
        document: context.payload as T
      });

      this.settingId = newItem._id;
      return newItem;

    }
    else {

      this.settingId = item._id;

      return this.controller.update({
        resourceId: this.settingId,
        payload: context.payload
      });

    }

  }

}
