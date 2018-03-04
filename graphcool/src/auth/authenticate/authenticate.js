import { fromEvent } from 'graphcool-lib';
import * as bcrypt from 'bcryptjs';

import createErrorResponse from '../../../utils/errorLogging';

export default async event => {
    try {
        const graphcool = fromEvent(event);
        const api = graphcool.api('simple/v1');

        const { email, password } = event.data;

        // get user by email
        const user = await getUserByEmail(api, email).then(r => r.User);

        // no user with this email
        if (!user) {
            return createErrorResponse({
                code: 401,
                subCode: 401001,
                field: 'username'
            });
        }

        // check password
        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if (!passwordIsCorrect) {
            return createErrorResponse({
                code: 401,
                subCode: 401002,
                field: 'password'
            });
        }

        // generate node token for existing User node
        const token = await graphcool.generateNodeToken(user.id, 'User');

        return { data: { id: user.id, token } };
    } catch (e) {
        return createErrorResponse({ code: 500, subCode: 500001 });
    }
};

async function getUserByEmail(api, email) {
    const query = `
    query getUserByEmail($email: String!) {
      User(email: $email) {
        id
        password
      }
    }
  `;

    const variables = {
        email
    };

    return api.request(query, variables);
}
