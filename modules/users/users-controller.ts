import { UserMaker } from './users-resource.ts';
import './users-model.ts';
import { isPhoneNumber } from '../../tools/validation.ts';


export const UserController = UserMaker.getController();


UserMaker.addValidations({
  phoneNumber: [
    it => !it.phoneNumber || isPhoneNumber(it.phoneNumber) || 'phone number must be like +98xxxxxxxxxx'
  ]
});
