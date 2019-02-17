import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { render } from 'react-testing-library';
import { Theme } from '@sfitzpatrick/fitzy';
import { ThemeProvider } from 'styled-components';

export const renderWithApollo = (
  node,
  { addTypename = false, mocks = [], ...options }
) => {
  const utils = render(
    <MockedProvider addTypename={addTypename} mocks={mocks} {...options}>
      <ThemeProvider theme={Theme}>{node}</ThemeProvider>
    </MockedProvider>
  );
  return { ...utils };
};
