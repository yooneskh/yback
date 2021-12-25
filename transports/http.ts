import { NHttp } from '../deps.ts';

const app = new NHttp();


/* global plugins */

app.get('/ping', () => 'pong');

app.use((revt, next) => {

  revt.response.header('Access-Control-Allow-Origin', '*');
  revt.response.header('Access-Control-Allow-Headers', '*');
  revt.response.header('Access-Control-Allow-Methods', '*');

  if (revt.request.method === 'OPTIONS') {
    return revt.response.status(200).send('OK');
  }
  else {
    return next();
  }

});


import '../plugins/provider-router-addon/provider-router-addon.ts';
import '../plugins/rest-templates-router-addon/rest-templates-router-addon.ts';
import '../plugins/validators-router-addon/validators-router-addon.ts';


import { setGlobalRateLimit } from '../plugins/rate-limiter/rate-limiter-router-addon.ts';

setGlobalRateLimit({
  points: 30,
  windowDuration: 1,
  blockDuration: 10
});


import { CaptchaTokenRouter } from '../plugins/svg-captcha/captcha-tokens/captcha-tokens-router.ts';
app.use('/api/captcha-tokens', CaptchaTokenRouter);

import '../plugins/svg-captcha/captcha-router-addon.ts';


/* global modules */

import '../modules/authentication/lib/authentication-router-addon.ts';
import '../modules/authorization/lib/authorization-router-addon.ts';


import { UserRouter } from '../modules/users/users-router.ts';
app.use('/api/users', UserRouter);


import { AuthenticationRouter } from '../modules/authentication/authentication-router/authentication-router.ts';
import { AuthenticationTokenRouter } from '../modules/authentication/authentication-tokens/authentication-tokens-router.ts';
import { RegisterTokenRouter } from '../modules/authentication/register-tokens/register-tokens-router.ts';
import { VerificationTokenRouter } from '../modules/authentication/verification-tokens/verification-tokens-router.ts';
app.use('/api/authentication', AuthenticationRouter);
app.use('/api/authentication-tokens', AuthenticationTokenRouter);
app.use('/api/register-tokens', RegisterTokenRouter);
app.use('/api/verification-tokens', VerificationTokenRouter);

import '../modules/authentication/providers/authentication-provider-email.ts'
import '../modules/authentication/providers/authentication-provider-phone.ts';

import '../modules/authentication/lib/authentication-listeners.ts';


import { AuthorizationTokenRouter } from '../modules/authorization/authorization-tokens/authorization-tokens-router.ts';
import { AuthorizationRoleRouter } from '../modules/authorization/authorization-roles/authorization-roles-router.ts';
app.use('/api/authorization-tokens', AuthorizationTokenRouter);
app.use('/api/authorization-roles', AuthorizationRoleRouter);


import { MediaRouter } from '../modules/media/media-router.ts';
app.use('/api/media', MediaRouter);

import '../modules/media/media-listeners.ts';


import { FactorRouter } from '../modules/payment/factors/factors-router.ts';
import { PayticketRouter } from '../modules/payment/paytickets/paytickets-router.ts';
app.use('/api/factors', FactorRouter);
app.use('/api/paytickets', PayticketRouter);

import '../modules/payment/paytickets/paytickets-gateway-zarinpal.ts';


import { ApplicationSettingRouter } from '../modules/application-settings/application-settings-router.ts';
app.use('/api/application-settings', ApplicationSettingRouter);


import '../modules/notifications/sms-notification-manager.ts';


/* extra */

import { handleNHttpError } from '../plugins/error/handleable-error.ts';
app.onError(handleNHttpError);
app.on404(rev => rev.response.status(404).send(`${rev.request.url} was not found.`));


export function setupHttpTransport(port: number, afterListenCallback: () => void) {
  app.listen(port, afterListenCallback);
}
