import { ApplicationSettingMaker } from './application-settings-resource.ts';


ApplicationSettingMaker.setProperties({
  name: {
    type: 'string',
    required: true,
    title: 'نام',
    titleable: true
  }
});


ApplicationSettingMaker.makeModel();
