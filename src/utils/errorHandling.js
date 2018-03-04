/**
 * Return easier to handle error object from Graphcool
 * @param {object} Return object of Graphcool Errors
 */
export const handleGraphQLError = (errors = {}) => {
    const { graphQLErrors } = errors;
    let [{ functionError: { field, message, title } }] = graphQLErrors;

    return {
        field,
        message,
        title
    };
};
