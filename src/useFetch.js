import { useState } from 'react'

export const API_URL = 'http://localhost:3001'

const defaultFetchParams = {
    headers: {
        'Content-Type': 'application/json',
    },
    method: 'GET',
    credentials: 'include',
}

export function fetcher(options = {}) {
    const { url = '/', ...restOptions } = { ...defaultFetchParams, ...options }

    return fetch(API_URL + url, restOptions)
        .then(res => res.json())
}

export function useFetch(defaultOptions = {}) {
    const [data, setData] = useState(null)

    const fetchData = (options = {}) => {
        fetcher({ ...defaultOptions, ...options })
            .then(data => setData(data))
    }

    return [data, fetchData]
}

