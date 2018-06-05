import { handleGraphQLError } from '../';

describe('Error Handling', () => {
  const generic = {
    graphQLErrors: []
  };

  const error = {
    graphQLErrors: [
      {
        functionError: {
          field: 'name',
          message: 'not found',
          title: 'this is an error'
        }
      }
    ]
  };

  test('should handle empty error', () => {
    expect(handleGraphQLError(null)).toMatchSnapshot();
  });

  test('should handle generic error', () => {
    expect(handleGraphQLError(generic)).toMatchSnapshot();
  });

  test('should handle full error', () => {
    const errorDetail = handleGraphQLError(error);
    expect(errorDetail).toMatchSnapshot({
      title: expect.any(String)
    });
    expect(errorDetail).toEqual(expect.any(Object));
    expect(errorDetail).toEqual({
      title: expect.any(String),
      message: expect.any(String),
      field: expect.any(String)
    });
  });

  const cases = [
    [
      {
        graphQLErrors: [
          {
            functionError: {
              field: 'name',
              message: 'not found',
              title: 'this is an error'
            }
          }
        ]
      },
      {
        field: 'name',
        message: 'not found',
        title: 'this is an error'
      }
    ]
  ];

  test.each(cases)('should do something', (input, expected) => {
    expect(handleGraphQLError(input)).toEqual(expected);
  });
});
