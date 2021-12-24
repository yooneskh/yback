import { augmentConfiguration } from './deps.ts';

export const Config = {
  database: {
    enabled: true,
    host: '127.0.0.1',
    port: 27017,
    name: 'yback',
    connectionString: ''
  },
  http: {
    enabled: true,
    port: 48500
  },
  media: {
    cwd: '/home/yooneskh/yback-server',
    directory: 'media',
    baseUrl: 'http://localhost:48500'
  },
  captcha: {
    lifetime: 1000 * 60 * 3
  },
  authentication: {
    staticVerificationCode: '111111',
    randomDigitsCount: 6,
    tokenLifetime: 1000 * 60 * 60 * 24 * 30
  },
  authorization: {
    defaultPermissions: ['user.**']
  },
  payment: {
    core: {
      verificationCallback: 'https://api.aboutshiraz.khoshghadam.com/api/paytickets',
    },
    zarinpal: {
      merchantId: '',
      sandbox: true
    },
    default: {
      locale: 'en' as 'en' | 'fa',
      favicon: '{{website-base}}/favicon.ico',
      font: 'https://cdn.khoshghadam.com/font/roboto/roboto.css',
      title: 'Application | Payment Result',
      callback: '{{website-base}}',
      supportCallback: '{{website-base}}'
    },
    en: {
      locale: 'en' as 'en' | 'fa',
      favicon: '{{website-base}}/favicon.ico',
      font: 'https://cdn.khoshghadam.com/font/roboto/roboto.css',
      title: 'Application | Payment Result',
      callback: '{{website-base}}',
      supportCallback: '{{website-base}}'
    },
    fa: {
      locale: 'en' as 'en' | 'fa',
      favicon: '{{website-base}}/favicon.ico',
      font: 'https://cdn.khoshghadam.com/font/iryekan/iryekan.css',
      title: 'اپلیکیشن | نتیجه پرداخت',
      callback: '{{website-base}}',
      supportCallback: '{{website-base}}'
    }
  },
  notifications: {
    kavenegar: {
      apiKey: ''
    }
  }
};

augmentConfiguration(Config);
