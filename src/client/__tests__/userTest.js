import jwt from 'jsonwebtoken';

import {
    setKeys,
    logout,
    isLoggedIn,
    USER_ID_KEY,
    USER_TOKEN_KEY
} from '../user';

describe('User', () => {
    beforeEach(() => {
        setKeys('1234', '12345');
    });

    test('should call setKeys correctly', () => {
        expect(localStorage.getItem(USER_ID_KEY)).toEqual('1234');
        expect(localStorage.getItem(USER_TOKEN_KEY)).toEqual('12345');
    });

    test('should remove localStorage items on logout', () => {
        logout();
        expect(localStorage.getItem(USER_ID_KEY)).toBeFalsy();
        expect(localStorage.getItem(USER_TOKEN_KEY)).toBeFalsy();
    });

    test('should not be logged in', () => {
        expect(isLoggedIn()).toBeFalsy();
    });

    describe('Expiration Dates', () => {
        const validToken = jwt.sign(
            { exp: Math.floor(Date.now() / 1000) + 60 * 60 },
            'shhhhh'
        );

        const expiredToken = jwt.sign(
            { exp: Math.floor(Date.now() / 1000) - 30 },
            'shhhhh'
        );

        const tokenWithoutExp = jwt.sign(
            { iat: Math.floor(Date.now() / 1000) - 30 },
            'shhhhh'
        );

        test('should be loggedIn with future token', () => {
            setKeys('1234', validToken);
            expect(isLoggedIn()).toBeTruthy();
        });

        test('should not be loggedIn with expired token', () => {
            setKeys('1234', expiredToken);
            expect(isLoggedIn()).toBeFalsy();
        });

        test('should not be loggedIn with invalid token', () => {
            setKeys('1234', 'lol');
            expect(isLoggedIn()).toBeFalsy();
        });

        test('should not be loggedIn with exp date of null', () => {
            setKeys('1234', tokenWithoutExp);
            expect(isLoggedIn()).toBeFalsy();
        });
    });
});
