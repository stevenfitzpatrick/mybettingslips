const HTTP_ERROR_TITLE = {
    200: 'Succes',
    400: 'Bad Request',
    401: 'Authentication Issue',
    403: 'Unauthorized',
    500: 'Server Error'
};

const HTTP_ERROR_MESSAGES = {
    401001: 'Sorry, we couldn\'t find an account with those credentials. Please try again.',
    401002: 'Sorry, looks like the password does not match.',
    500001: 'Sorry, an issue has occured. Our busy elves will look into it !'
};

/**
 * Return more usable error object from GraphQL Function Errors
 * @param {object} GraphQL Error
 */
const createErrorResponse = ({ code = 500, subCode = 500001, field = '' }) => ({
    error: {
        code,
        field,
        title: HTTP_ERROR_TITLE[code],
        message: HTTP_ERROR_MESSAGES[subCode]
    }
});

export default createErrorResponse;
