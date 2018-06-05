/**
 * Return easier to handle error object from Graphcool
 * @param {object} Return object of Graphcool Errors
 */
export const handleGraphQLError = (errors = {}) => {
  if (!errors) return;
  const { graphQLErrors } = errors;

  const [error] = graphQLErrors;
  const graphQLError = error?.functionError;

  // Check if back end error otherwise pass generic error
  if (!graphQLError)
    return {
      message: 'Generic Error has occured',
      title: 'Whhoooppss'
    };

  let { field, message, title } = graphQLError;

  return {
    field,
    message,
    title
  };
};
