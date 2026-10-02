const environments = require('../config/env-config.json');

function getConfig(env = process.env) {
  const name = env.ELECTRON_LAB_ENV || 'development';
  const settings = environments[name];
  if (!settings) throw new Error(`Unknown environment: ${name}`);
  const url = new URL(env.ELECTRON_LAB_URL || settings.url);
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (url.username || url.password || !(url.protocol === 'https:' || (url.protocol === 'http:' && loopback))) {
    throw new Error('Use HTTPS for hosted apps or HTTP for a loopback development server.');
  }
  return { ...settings, url: url.href, origin: url.origin, environment: name };
}
module.exports = { getConfig };
