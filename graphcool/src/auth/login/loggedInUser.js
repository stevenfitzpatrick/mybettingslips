import { fromEvent } from 'graphcool-lib';

export default async event => {
  try {
    // no logged in user
    if (!event.context.auth || !event.context.auth.nodeId) {
      return { data: null };
    }

    const userId = event.context.auth.nodeId;
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    // get user by id
    const user = await getUser(api, userId).then(r => r.User);

    // no logged in user
    if (!user || !user.id) {
      return { data: null };
    }

    return { data: { id: user.id, email: user.email } };
  } catch (e) {
    return { error: 'An unexpected error occured during authentication.' };
  }
};

async function getUser(api, id) {
  const query = `
    query getUser($id: ID!) {
      User(id: $id) {
        id,
        email
      }
    }
  `;

  const variables = {
    id
  };

  return api.request(query, variables);
}
