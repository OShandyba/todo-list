import { useState } from 'react'

export const API_URL = 'http://localhost:3001'

const defaultFetchParams = {
    headers: {
        'Content-Type': 'application/json',
    },
    method: 'GET',
    credentials: 'include',
}

export function useFetch(defaultOptions = {}) {
    const [data, setData] = useState(null)

    const fetchData = (options = {}) => {
        const { url = '/', ...restOptions } = { ...defaultFetchParams, ...defaultOptions, ...options }
        fetch(API_URL + url, restOptions)
            .then(res => res.json())
            .then(data => setData(data))
    }

    return [data, fetchData]
}

