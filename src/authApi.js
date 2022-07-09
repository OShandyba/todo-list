import { useFetch } from './useFetch'

export const useLogin = () => (
    useFetch({
        method: 'POST',
        url: '/login'
    })
);
export const useRegistration = () => (
    useFetch({
        method: 'POST',
        url: '/registration'
    })
);
export const useLogout = () => (
    useFetch({
        method: 'POST',
        url: '/logout'
    })

);