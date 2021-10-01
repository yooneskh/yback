import { UserMaker } from './users-resource.ts';


UserMaker.setProperties({
  name: {
    type: 'string',
    required: true,
    title: 'نام',
    titleble: true
  },
  phoneNumber: {
    type: 'string',
    required: true,
    title: 'شماره تلفن'
  }
});
