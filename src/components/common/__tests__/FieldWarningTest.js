import React from 'react';
import renderer from 'react-test-renderer';

import FieldWarning from '../FieldWarning';

describe('Field Warning', () => {
  const defaultProps = {
    field: 'name',
    errors: {},
    touched: {}
  };

  const defaultPropsWithError = {
    ...defaultProps,
    errors: { name: 'Name is Required' },
    touched: { name: true }
  };

  test('should not render without error and touched', () => {
    const tree = renderer.create(<FieldWarning {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should not render with error and touched', () => {
    const tree = renderer
      .create(<FieldWarning {...defaultPropsWithError} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
