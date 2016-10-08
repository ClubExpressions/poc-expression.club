import jq from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import createHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../src/js/reducers';
import rawProxyquire from 'proxyquire';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

// Global prerequisites to make it work in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};
const $ = jq(window);

const strictProxyquire = rawProxyquire.noCallThru();

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const store = createStore(reducers, state);
  props.store = store;
  const componentInstance = ReactTestUtils.renderIntoDocument(
    <Provider store={store}>
      <ComponentClass {...props} />
    </Provider>
  );

  // Produces HTML
  return $(ReactDOM.findDOMNode(componentInstance));
}

function renderRawShallowComponent(ComponentClass, props = {}) {
  return shallow(<ComponentClass {...props} />);
}

function mockHistory(component) {
  component.childContextTypes = { history: React.PropTypes.object };
  component.prototype.getChildContext = () => ({ history: createHistory() });
}

function horizonStub() {
  return {
    '@global': true
  };
}

function requireWithMock(path, prop) {
  let horizon = horizonStub();
  let stubs = {
    '../../../utils/horizon': horizon,
    '../../utils/horizon': horizon,
    '../utils/horizon': horizon,
    '../horizon': horizon,
    './horizon': horizon
  };
  let module = strictProxyquire(path.substring(3), stubs);
  if (prop) {
    return module[prop];
  } else {
    return module.default;
  }
}

// Helper for simulating events
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  ReactTestUtils.Simulate[eventName](this[0]);
};

export { renderComponent, mockHistory, expect, requireWithMock, renderRawShallowComponent, sinon };
