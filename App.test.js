/* global describe, it, expect, jest */
import React from 'react';
import { LegacyWallet, SegwitP2SHWallet, AppStorage } from './class';
import renderer from 'react-test-renderer';
import App from './App';
import Settings from './screen/settings';
import Selftest from './screen/selftest';
import { BlueHeader } from './BlueComponents';
import MockStorage from './MockStorage';
let assert = require('assert');
jest.mock('react-native-qrcode', () => 'Video');
const AsyncStorage = new MockStorage();
jest.setMock('AsyncStorage', AsyncStorage);

describe('unit - LegacyWallet', function() {
  it('serialize and unserialize work correctly', () => {
    let a = new LegacyWallet();
    a.setLabel('my1');
    let key = JSON.stringify(a);

    let b = LegacyWallet.fromJson(key);
    assert(key === JSON.stringify(b));

    assert.equal(key, JSON.stringify(b));
  });
});

it('App does not crash', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('BlueHeader works', () => {
  const rendered = renderer.create(<BlueHeader />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Settings work', () => {
  const rendered = renderer.create(<Settings />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Selftest work', () => {
  const component = renderer.create(<Selftest />);
  const root = component.root;
  const rendered = component.toJSON();
  expect(rendered).toBeTruthy();
  // console.log((root.findAllByType('Text')[0].props));

  let okFound = false;
  let allTests = [];
  for (var v of root.findAllByType('Text')) {
    let text = v.props.children;
    if (text.join) {
      text = text.join('');
    }
    if (text === 'OK') {
      okFound = true;
    }
    allTests.push(text);
    // console.log(text);
  }

  assert.ok(okFound, 'OK not found. Got: ' + allTests.join('; '));
});

it('Appstorage works', async () => {
  /** @type {AppStorage} */
  let Storage = new AppStorage();
  let w = new SegwitP2SHWallet();
  w.setLabel('testlabel');
  w.generate();
  Storage.wallets.push(w);
  Storage.saveToDisk();

  let Storage2 = new AppStorage();
  await Storage2.loadFromDisk();
  let isEncrypted = await Storage2.storageIsEncrypted();
  assert.ok(!isEncrypted);

  assert.equal(Storage2.wallets.length, 1);
  assert.equal(Storage2.wallets[0].getLabel(), 'testlabel');

  // emulating encrypted storage

  AsyncStorage.storageCache.data = false;
  AsyncStorage.storageCache.data_encrypted = 'encrypteddata';
  let Storage3 = new AppStorage();
  isEncrypted = await Storage3.storageIsEncrypted();
  assert.ok(isEncrypted);
});
