import { setItem, removeItem, fetchItem } from '../utils';

export const USER_ID_KEY = 'user_id';
export const USER_TOKEN_KEY = 'user_token';

export function setKeys(id, token) {
    setItem(USER_ID_KEY, id);
    setItem(USER_TOKEN_KEY, token);
}

export function isLoggedIn() {
    const token = fetchItem(USER_TOKEN_KEY);
    return token ? true : false;
}

export function logout() {
    removeItem(USER_ID_KEY);
    removeItem(USER_TOKEN_KEY);
}
