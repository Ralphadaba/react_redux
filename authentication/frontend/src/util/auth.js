import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();   // 398
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        return null
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return token;
}

export function tokenLoader() {
    return getAuthToken();   //we get the current token here. 
}

export function checkAuthLoader() {  //users can get access to unauthorized features like the edit and delete buttons through the route so we want to block it from here until the authorized user logs in and gets a token. 
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }

    return null;
}


/**
 * You should make sure that you do add an extra return null statement in all if statement branches where nothing would be returned otherwise to avoid errors.
 * 
 */