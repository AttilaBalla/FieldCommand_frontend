import {ACCESS_TOKEN, FETCH_TIMEOUT, API_BASE_URL} from "./Constants";


const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return Promise.race([

        fetch(options.url, options) // element1
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        ),

        new Promise((_, reject) => // element2
            setTimeout(() => reject(new Error("Timeout")), FETCH_TIMEOUT))
        ]);
};


export function login(loginRequest) {

    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}


export function retrieveSwrStatus() {

    return request({
        url: API_BASE_URL + "/swrStatus",
        method: 'GET'
    });
}


export function getCurrentUser() {

    return request({
        url: API_BASE_URL + "/user/currentUser",
        method: 'GET'
    });
}

export function sendEmailInvite(inviteData) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {

        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/invite",
        method: 'POST',
        body: JSON.stringify(inviteData)
    });
}

export function getAllUsers() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {

        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/users",
        method: 'GET',
    });
}

export function updateUser(updateData) {

    return request({
        url: API_BASE_URL + "/admin/updateUser",
        method: 'POST',
        body: JSON.stringify(updateData)
    });
}

export function activateUser(activateData) {

    return request({
        url: API_BASE_URL + "/auth/activate",
        method: 'POST',
        body: JSON.stringify(activateData)
    });
}
