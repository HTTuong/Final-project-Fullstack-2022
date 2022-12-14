import React from 'react';
import useFetch from '~/hooks/core/useFetch';
// import { BASE_API_URL } from '~/constants.d'

const BASE_API_URL = 'http://localhost:8080/api/'

export default function signUp() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { error, isLoading, data, execute } = useFetch(BASE_API_URL);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const run = React.useCallback((params) => {
        execute({ method: 'POST', path: 'auth/signup', ...params })
    }, [execute])

    return { reponseValue: { error, isLoading, data }, run }
}