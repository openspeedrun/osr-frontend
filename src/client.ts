import Axios, * as axios from 'axios';
import store from '@/store';

export const APIEndpoint: string = "http://localhost:8080/api/v1";

export const client = Axios.create({
    headers: {'Authorization': getAuthHeader()},
    validateStatus: ((status) => {
        handleTampering(status);
        return true;
    }),
    baseURL: APIEndpoint,
})

function getAuthHeader(): string | null {
    if (store.state.srstate.token == null) return "";
    return "Bearer " + store.state.srstate.token;
}

function handleTampering(statusCode: number) {
    if (statusCode == 403) {
        store.commit('setToken', null);
        store.commit('setUsername', null);
        alert("The authentication token has been tampered with, and thereby has been invalidated.");
    }
}