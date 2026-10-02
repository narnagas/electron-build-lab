const { test } = require('node:test');
const assert = require('node:assert/strict');
const { getConfig } = require('./config');
test('defaults to Angular development server', () => {
  assert.equal(getConfig({}).url, 'http://localhost:4200/');
});
test('accepts hosted HTTPS and local React development URLs', () => {
  assert.equal(getConfig({ ELECTRON_LAB_URL: 'https://example.com/reports' }).origin, 'https://example.com');
  assert.equal(getConfig({ ELECTRON_LAB_URL: 'http://localhost:5173' }).origin, 'http://localhost:5173');
});
test('rejects unknown environments and unsafe URLs', () => {
  assert.throws(() => getConfig({ ELECTRON_LAB_ENV: 'missing' }));
  for (const url of ['http://example.com', 'file:///tmp/index.html', 'javascript:alert(1)', 'https://user:pass@example.com']) {
    assert.throws(() => getConfig({ ELECTRON_LAB_URL: url }));
  }
});
