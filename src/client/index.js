import { setItem, removeItem, fetchItem } from '../utils';

const USER_ID_KEY = 'user_id';
const USER_TOKEN_KEY = 'user_token';

export async function login() {
    setItem(USER_ID_KEY, 'lol');
    setItem(USER_TOKEN_KEY, 'lol');
}

export function isLoggedIn() {
  debugger; //eslint-disable-line

    const token = fetchItem(USER_TOKEN_KEY);
  debugger; //eslint-disable-line
    return token ? true : false;
}

export function logout() {
    removeItem(USER_ID_KEY);
    removeItem(USER_TOKEN_KEY);
}
