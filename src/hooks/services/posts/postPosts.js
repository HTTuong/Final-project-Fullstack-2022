import React from 'react';
import useFetch from '~/hooks/core/useFetch';
import { BASE_API_URL } from '~/constants.d'

export default function postPosts() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { error, isLoading, data, execute } = useFetch(BASE_API_URL);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const run = React.useCallback((params) => {
        execute({ method: 'POST', path: 'images', ...params })
    }, [execute])

    return { reponseValue: { error, isLoading, data }, run }
}