import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { Theme } from '@sfitzpatrick/fitzy';
import { ThemeProvider } from 'styled-components';

import SportCard from '../SportCard';
import { DeleteSport } from '../sports.mutations.graphql';
import { GetSports } from '../sports.queries.graphql';

describe('Sports Card', () => {
  const onToggle = jest.fn();

  const defaultProps = {
    item: {
      id: '1',
      name: 'Football',
      icon: 'soccer'
    },
    onToggle
  };

  const deleteSport = {
    id: '1'
  };

  const allSports = [
    { id: '1', name: 'Football', icon: 'soccer' },
    { id: '2', name: 'American Football', icon: 'football' }
  ];

  const mocks = [
    {
      request: {
        query: GetSports,
        variables: {}
      },
      result: {
        data: {
          allSports
        }
      }
    },
    {
      request: {
        query: DeleteSport,
        variables: { id: '1' }
      },
      result: { data: { deleteSport } }
    }
  ];

  test('should handle edit', () => {
    const { getByText, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <ThemeProvider theme={Theme}>
          <SportCard {...defaultProps} />
        </ThemeProvider>
      </MockedProvider>
    );

    expect(getByText('Football')).toBeTruthy();
    const dropdown = getByTestId('sport-dropdown');
    fireEvent.click(dropdown);

    const edit = getByText(/edit/i);
    expect(edit).toBeTruthy();
    fireEvent.click(edit);
    expect(onToggle).toHaveBeenCalled();
  });

  test('should handle delete', () => {
    const { getByText, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <ThemeProvider theme={Theme}>
          <SportCard {...defaultProps} />
        </ThemeProvider>
      </MockedProvider>
    );

    expect(getByText('Football')).toBeTruthy();
    const dropdown = getByTestId('sport-dropdown');
    fireEvent.click(dropdown);

    const deleteButton = getByText(/delete/i);
    expect(deleteButton).toBeTruthy();
  });
});
