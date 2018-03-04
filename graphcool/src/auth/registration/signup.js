import { fromEvent } from 'graphcool-lib';
import * as bcrypt from 'bcryptjs';
import * as validator from 'validator';

const SALT_ROUNDS = 10;

export default async event => {
    try {
        const graphcool = fromEvent(event);
        const api = graphcool.api('simple/v1');

        const { email, password } = event.data;

        if (!validator.isEmail(email)) {
            return { error: 'Not a valid email' };
        }

        // check if user exists already
        const userExists = await getUser(api, email).then(r => r.User !== null);

        if (userExists) {
            return { error: 'Email already in use' };
        }

        // create password hash
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);

        // create new user
        const userId = await createGraphcoolUser(api, email, hash);

        // generate node token for new User node
        const token = await graphcool.generateNodeToken(userId, 'User');

        return { data: { id: userId, token } };
    } catch (e) {
        return { error: 'An unexpected error occured during signup.' };
    }
};

async function getUser(api, email) {
    const query = `
    query getUser($email: String!) {
      User(email: $email) {
        id
      }
    }
  `;

    const variables = {
        email
    };

    return api.request(query, variables);
}

async function createGraphcoolUser(api, email, password) {
    const mutation = `
    mutation createGraphcoolUser($email: String!, $password: String!) {
      createUser(
        email: $email,
        password: $password
      ) {
        id
      }
    }
  `;

    const variables = {
        email,
        password: password
    };

    return api.request(mutation, variables).then(r => r.createUser.id);
}
