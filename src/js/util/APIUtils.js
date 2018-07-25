import {ACCESS_TOKEN, API_BASE_URL, FETCH_TIMEOUT} from "./Constants";


const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    // ------------------------------------------------

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
        method: 'PUT',
        body: JSON.stringify(updateData)
    });
}

export function validateActivationKey(key) {

    return request({
        url: API_BASE_URL + "/auth/validateKey",
        method: 'POST',
        body: JSON.stringify(key)
    });
}

export function activateUser(activateData) {

    return request({
        url: API_BASE_URL + "/auth/activate",
        method: 'POST',
        body: JSON.stringify(activateData)
    });
}

export function sendNewsPost(newsPostData) {

    return request({
        url: API_BASE_URL + "/dev/addNewsPost",
        method: 'POST',
        body: JSON.stringify(newsPostData)
    });
}

export function getAllNewsPosts() {

    return request({
        url: API_BASE_URL + "/getNewsPosts",
        method: 'GET',
    });
}

export function getSingleNewsPost(id) {

    return request({
        url: API_BASE_URL + "/getNewsPosts/" + id,
        method: 'GET',
    });
}

export function updateNewsPost(newsPostData) {

    return request({
        url: API_BASE_URL + "/dev/updateNewsPost",
        method: 'PUT',
        body: JSON.stringify(newsPostData)
    });
}

export function deleteNewsPost(id) {

    return request({
        url: API_BASE_URL + "/dev/deleteNewsPost/" + id,
        method: 'DELETE'
    });
}

export function sendInternalRequest(internalRequest) {

    return request({
        url: API_BASE_URL + "/user/ir/create",
        method: "POST",
        body: JSON.stringify(internalRequest)
    });
}

export function getInternalRequests() {

    return request({
        url: API_BASE_URL + "/user/ir/get",
        method: "GET",
    });
}

export function deleteInternalRequest(id) {

    return request({
        url: API_BASE_URL + "/user/ir/delete/" + id,
        method: 'DELETE'
    });
}

export function getSingleInternalRequest(id) {

    return request({
        url: API_BASE_URL + "/user/ir/get/" + id,
        method: 'GET',
    });
}

export function updateInternalRequest(internalRequest) {

    return request({
        url: API_BASE_URL + "/user/ir/update",
        method: 'PUT',
        body: JSON.stringify(internalRequest)
    });
}

export function alterIntRequestSupport(supportData) {

    return request({
        url: API_BASE_URL + "/user/ir/support",
        method: 'POST',
        body: JSON.stringify(supportData)
    });
}

export function alterIntRequestStatus(StatusData) {

    return request({
        url: API_BASE_URL + "/dev/ir/updateStatus",
        method: 'PUT',
        body: JSON.stringify(StatusData)
    });
}
