import { api } from 'config/axios'

export const post = (url, body) => {
    return api.post(url, body)
}

export const get = (url) => {
    return api.get(url)
}

export const put = (url, body = {}) => {
    return api.put(url, body)
}

export const dellete = (url) => {
    return api.delete(url)
}