import PropTypes from 'prop-types';
import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { Theme } from '@sfitzpatrick/fitzy';
import { ThemeProvider } from 'styled-components';
/**
 * Helper to wrap ThemeProvider for shallow / mount for enzyme
 */
export function _wrapWithTheme(fn, children) {
  const context = shallow(<ThemeProvider theme={Theme} />)
    .instance()
    .getChildContext();

  return fn(children, {
    context: {
      ...context,
      router: {
        history: {
          push: () => {},
          replace: () => {},
          createHref: () => {}
        }
      }
    },
    childContextTypes: {
      router: PropTypes.object.isRequired,
      ...ThemeProvider.childContextTypes
    }
  });
}

/**
 * Helper for React Create Renderer with theme
 */
export function renderWithTheme(component) {
  return renderer.create(
    <ThemeProvider theme={Theme}>{component}</ThemeProvider>
  );
}

/**
 * Helper for shallow mount with theme
 */
export function shallowWithTheme() {
  return _wrapWithTheme(shallow, ...arguments);
}

/**
 * Helper for full mount with theme
 */
export function mountWithTheme() {
  const wrapper = _wrapWithTheme(mount, ...arguments);
  return wrapper;
}
