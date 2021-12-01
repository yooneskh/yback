import { UserMaker } from './users-resource.ts';


UserMaker.setProperties({
  name: {
    type: 'string',
    required: true,
    title: 'نام',
    titleable: true
  },
  phoneNumber: {
    type: 'string',
    required: true,
    title: 'شماره تلفن'
  },
  profile: {
    type: 'string',
    ref: 'Media',
    title: 'تصویر پروفایل'
  },
  email: {
    type: 'string',
    title: 'Email'
  }
});


UserMaker.makeModel();
