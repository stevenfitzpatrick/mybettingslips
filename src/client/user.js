import decode from 'jwt-decode';

import { setItem, removeItem, fetchItem } from '../utils';

export const USER_ID_KEY = 'user_id';
export const USER_TOKEN_KEY = 'user_token';

export function setKeys(id, token) {
    setItem(USER_ID_KEY, id);
    setItem(USER_TOKEN_KEY, token);
}

export function logout() {
    removeItem(USER_ID_KEY);
    removeItem(USER_TOKEN_KEY);
}

export function isLoggedIn() {
    const token = fetchItem(USER_TOKEN_KEY);
    return token && !isTokenExpired(token);
}

export function getTokenExpirationDate(encodedToken) {
    try {
        const token = decode(encodedToken);
        if (!token.exp) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(token.exp);
        return date;
    } catch (e) {
        return null;
    }
}

export function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}
