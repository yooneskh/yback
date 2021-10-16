import { ResourceMaker } from '../../../plugins/resource-maker/resource-maker.ts';
import type { IVerificationTokenBase, IVerificationToken } from './verification-tokens-interfaces.d.ts';


export const VerificationTokenMaker = new ResourceMaker<IVerificationTokenBase, IVerificationToken>('VerificationToken');
